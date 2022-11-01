const Calendarific = require("../../models/Calendarific");
const CalendarificList = require("../../models/CalendarificList");
const cryptoJS = require("crypto-js");
const NotionApiKey = require("../../models/NotionKey");
const Apikey = require("../../models/ApiKey");
const axios = require("axios");
const NotionCalendarificPage = require("../../models/NotionCalendarificPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");

exports.createCountry = async (req, res, next) => {
  try {
    const existCalendar = await Calendarific.findOne({
      $and: [{ country: req.body.country }, { users: req.user.id }],
    });
    if (existCalendar) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        country: req.body.country,
      },
      $push: { users: req.user.id },
    };

    await Calendarific.updateOne({ country: req.body.country }, update, {
      upsert: true,
    });
    await CalendarificList.updateOne(
      { country: req.body.country },
      {
        $set: { holidays: [] },
      }
    );
    res.status(200).json({
      data: {
        message: "Data Inserted to mongodb",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.createHoliday = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://calendarific.com/api/v2/holidays?country=${req.body.country}&year=${req.body.year}&api_key=${req.body.apiKey}&month=${req.body.month}`
    );
    const holidays = response.data.response.holidays;
    console.log(holidays);
    holidays.map(async (holiday) => {
      const holidayBody = {
        name: holiday.name,
        description: holiday.description,
        date: holiday.date.iso.substring(0, 10),
      };
      const update = {
        $set: {
          country: req.body.country,
          month: req.body.month,
          year: req.body.year,
        },
        $push: { holidays: holidayBody },
      };
      await CalendarificList.updateOne({ country: req.body.country }, update, {
        upsert: true,
      });
      const notion = new Client({
        auth: req.notionKey,
      });
      const response = await notion.pages.create({
        parent: {
          database_id: req.dataBaseId,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: holiday.name,
                },
              },
            ],
          },

          Description: {
            rich_text: [
              {
                text: {
                  content: holiday.description,
                },
              },
            ],
          },
          Date: {
            date: {
              start: holiday.date.iso.substring(0, 10),
            },
          },
        },
      });

      const body = {
        name: holiday.name,
        pageId: response.id,
      };
      const updatePage = {
        $set: { user: req.user.id },
        $push: { associateIds: body },
      };
      const createPage = await NotionCalendarificPage.updateOne(
        { user: req.user.id },
        updatePage,
        {
          upsert: true,
        }
      );
      console.log(createPage);
    });

    res.status(200).json({
      data: {
        message: "Data Inserted to mongodb",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getHoliday = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const calendar = await Calendarific.findOne({ users: userId });
    console.log(calendar);
    if (calendar === null) {
      return res.status(200).json({
        data: {
          holidays: [],
        },
      });
    } else {
      const holiday = await CalendarificList.findOne({
        country: calendar.country,
      });
      res.status(200).json({
        data: {
          holidays: holiday.holidays,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.updateHoliday = async () => {
  const holidayData = await CalendarificList.find({});
  const numHolidays = await CalendarificList.countDocuments();
  for (let i = 0; i < numHolidays; i++) {
    const apikey = await Apikey.aggregate([
      { $unwind: "$keys" },
      { $match: { "keys.apiSlug": "Calendarific" } },
      { $sample: { size: 1 } },
    ]);
    console.log(apikey[0].keys.key);

    const originalKey = apikey[0].keys.key;
    console.log(originalKey);

    await CalendarificList.updateOne(
      { country: holidayData[i].country },
      { $set: { holidays: [] } }
    );
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    try {
      const response = await axios.get(
        `https://calendarific.com/api/v2/holidays?country=${holidayData[i].country}&year=${currentYear}&api_key=${originalKey}&month=${currentMonth}`
      );
      const holidaysResponse = response.data.response.holidays;
      console.log(holidaysResponse);
      holidaysResponse.map(async (holiday) => {
        const holidayBody = {
          name: holiday.name,
          description: holiday.description,
          date: holiday.date.iso,
        };
        const update = {
          $set: {
            month: currentMonth,
          },
          $push: { holidays: holidayBody },
        };
        await CalendarificList.updateOne(
          { country: holidayData[i].country },
          update,
          { upsert: true }
        );
      });
    } catch (e) {
      console.log(e);
    }
  }
};
exports.pageDetails = async (req, res) => {
  const individuals = await NotionCalendarificPage.find(
    {},
    { "associateIds.name": 1, "associateIds.pageId": 1, user: 1 }
  );

  for (let i = 0; i < individuals.length; i++) {
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: individuals[i].user },
          { "credentials.apiSlug": "Calendarific" },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Calendarific" } } }
    );
    console.log(notionCredential);
    const notionKey = notionCredential.credentials[0].apiKey;
    const notion = new Client({ auth: notionKey });
    for (let j = 0; j < individuals[i].associateIds.length; j++) {
      const page = individuals[i].associateIds[j].pageId;
      const pageExistance = await notion.pages.retrieve({ page_id: page });
      console.log(pageExistance.id);
      if (pageExistance.archived === true) {
        continue;
      }
      const res = await notion.pages.update({
        page_id: page,
        archived: true,
      });

      console.log(res);
    }

    await NotionCalendarificPage.updateOne(
      { user: individuals[i].user },
      { $set: { associateIds: [] } }
    );
  }
  res.json(individuals);
};
exports.createNextHoliday = async (req, res) => {
  const holidays = await NotionCalendarificPage.find({});
  for (let i = 0; i < holidays.length; i++) {
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: holidays[i].user },
          { "credentials.apiSlug": "Calendarific" },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Calendarific" } } }
    );
    console.log(notionCredential);
    const dataBaseId = notionCredential.credentials[0].databaseId;
    const notionKey = notionCredential.credentials[0].apiKey;
    const notion = new Client({ auth: notionKey });
    const countrycode = await Calendarific.findOne({ users: holidays[i].user });
    const holiday = await CalendarificList.findOne({
      country: countrycode.country,
    });
    const length = holiday.holidays.length;
    console.log(holiday, length);
    const response = await notion.databases.retrieve({
      database_id: dataBaseId,
    });
    if (response === null) {
      continue;
    }
    for (j = 0; j < holiday.holidays.length; j++) {
      console.log(holiday.holidays[j].name);

      const response = await notion.pages.create({
        parent: {
          database_id: dataBaseId,
        },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: holiday.holidays[j].name,
                },
              },
            ],
          },

          Description: {
            rich_text: [
              {
                text: {
                  content: holiday.holidays[j].description,
                },
              },
            ],
          },
          Date: {
            date: {
              start: holiday.holidays[j].date,
            },
          },
        },
      });
      const body = {
        name: holiday.holidays[j].name,
        pageId: response.id,
      };
      const update = {
        $set: { user: holidays[i].user },
        $push: { associateIds: body },
      };
      const createPage = await NotionCalendarificPage.updateOne(
        { user: holidays[i].user },
        update,
        {
          upsert: true,
        }
      );
      console.log(createPage);
    }
  }
};
