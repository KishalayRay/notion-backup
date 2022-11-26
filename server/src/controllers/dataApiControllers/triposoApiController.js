const Triposo = require("../../models/Triposo");
const NotionApiKey = require("../../models/NotionKey");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const Apikey = require("../../models/ApiKey");
const axios = require("axios");
exports.createTriposo = async (req, res, next) => {
  try {
    const currDate = new Date().toISOString();

    const existTrip = await Triposo.findOne({
      $and: [{ city: req.body.city }, { users: req.user.id }],
    });
    if (existTrip) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        city: req.body.domain,
        date: currDate,
      },
      $push: { users: req.user.id },
    };

    await Triposo.updateOne({ city: req.body.city }, update, {
      upsert: true,
    });
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { credentials: { $elemMatch: { apiSlug: "Triposo" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Triposo" } } }
    );
    console.log(notionCredential);
    const dataBaseId = notionCredential.credentials[0].databaseId;

    const notionKey = notionCredential.credentials[0].apiKey;

    console.log(dataBaseId, notionKey);

    const notion = new Client({
      auth: notionKey,
    });
    const retrieveDatabase = async () => {
      const response = await notion.databases.retrieve({
        database_id: dataBaseId,
      });
      if (response === null) {
        return next(createError(400, "Notion Database not found"));
      }
    };
    retrieveDatabase();
    const apikey = await Apikey.findOne(
      {
        $and: [
          { user: req.user.id },
          { keys: { $elemMatch: { apiSlug: "Triposo" } } },
        ],
      },
      { keys: { $elemMatch: { apiSlug: "Triposo" } } }
    );
    console.log(apikey.keys[0].key, "apikey");
    const originalKey = apikey.keys[0].key;
    const response = await axios.get(
      `https://www.triposo.com/api/20221011/poi.json?account=${originalKey.slice(
        0,
        8
      )}&token=${originalKey.slice(8)}&location_id=${
        req.body.city
      }&fields=id,name,score,snippet,location_id,tag_labels&order_by=-score&count=30&tag_labels=sightseeing`
    );
    const tripData = response.data.results;
    tripData.map(async (trip) => {
      await notion.pages.create({
        parent: {
          database_id: dataBaseId,
        },
        properties: {
          Attraction: {
            title: [
              {
                text: {
                  content: trip.name || "",
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: trip.snippet || "",
                },
              },
            ],
          },
          City: {
            rich_text: [
              {
                text: {
                  content: trip.location_id || "",
                },
              },
            ],
          },
          // Tags: {
          //   multi_select: trip.tag_labels.map((tag) => {
          //     return {
          //       name: tag,
          //     };
          //   }),
          // },

          Rating: {
            number: trip.score || 0,
          },
        },
      });
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

exports.getTriposo = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const trip = await Triposo.find({ users: userId });
    console.log(trip);
    if (trip === null) {
      return res.status(200).json({
        data: {
          trips: [],
        },
      });
    } else {
      return res.status(200).json({
        data: {
          trips: trip,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteTriposo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await Triposo.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const emptyDB = await Triposo.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await Triposo.findByIdAndDelete(req.params.id);
    }
    res.status(200).json({
      data: {
        message: "Data Deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
