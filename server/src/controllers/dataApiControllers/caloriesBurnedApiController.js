const Calories = require("../../models/CaloriesBurned");
const NotionApiKey = require("../../models/NotionKey");
const NotionCaloriesPage = require("../../models/NotionCaloriesBurnedPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
exports.createActivity = async (req, res, next) => {
  try {
    const currDate = new Date().toISOString();
    const activityObj = {
      activityId: req.body.activityId,
      name: req.body.name,
      duration: req.body.duration,
      date: currDate,
      cph: req.body.cph,
      burned: req.body.burned,
    };

    const update = {
      $set: {
        user: req.user.id,
      },
      $push: { data: activityObj },
    };

    const newActivity = await Calories.updateOne(
      { user: req.user.id },
      update,
      {
        upsert: true,
        new: true,
      }
    );
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { credentials: { $elemMatch: { apiSlug: "Bigpicture" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Bigpicture" } } }
    );
    console.log(notionCredential);
    const dataBaseId = notionCredential.credentials[0].databaseId;
    const notionKey = notionCredential.credentials[0].apiKey;
    console.log(dataBaseId, notionKey);

    const notion = new Client({
      auth: notionKey,
    });

    const main = async () => {
      try {
        const response = await notion.pages.create({
          parent: {
            database_id: dataBaseId,
          },
          properties: {
            Activity: {
              title: [
                {
                  text: {
                    content: req.body.name,
                  },
                },
              ],
            },

            "Calories Per Hour": {
              number: req.body.cph,
            },
            Duration: {
              number: req.body.duration,
            },
            Burned: {
              number: req.body.burned,
            },
            Date: {
              date: {
                start: currDate,
              },
            },
          },
        });
        const body = {
          name: req.body.activityId,
          pageId: response.id,
        };
        const update = {
          $set: { user: req.user.id },
          $push: { associateIds: body },
        };
        const createPage = await NotionCaloriesPage.updateOne(
          { user: req.user.id },
          update,
          {
            upsert: true,
          }
        );
        console.log(createPage);
      } catch (err) {
        if (err.code === APIErrorCode.ObjectNotFound) {
          return next(createError(400, "Notion Error"));
        } else {
          // Other error handling code
          return next(createError(400, "Notion Error"));
        }
      }
    };

    main();
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
exports.getActivities = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  if (req.query.page) {
    const numActivities = await Calories.countDocuments();
    if (skip > numActivities) {
      return next(
        createError(400, "This page does not existThis page does not exist")
      );
    }
  }
  const userId = req.user.id;
  try {
    const activities = await Calories.find({ user: userId });
    if (!activities[0]) {
      res.status(200).json({
        data: {
          activities: [],
        },
      });
    } else {
      res.status(200).json({
        data: {
          activities: activities[0].data,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteActivity = async (req, res, next) => {
  try {
    const userId = req.user.id;

    console.log(userId, req.params.id, typeof req.params.id);
    const updateBody = {
      activityId: req.params.id,
    };
    const update = {
      $pull: { data: updateBody },
    };

    const updateDoc = await Calories.updateOne({ user: req.user.id }, update, {
      new: true,
    });
    console.log(updateDoc);
    const pageDetail = await NotionCaloriesPage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { name: req.params.id } } },
        ],
      },
      { associateIds: { $elemMatch: { name: req.params.id } } }
    );
    console.log(pageDetail, "pageDetails");
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { credentials: { $elemMatch: { apiSlug: "Caloriesburned" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Caloriesburned" } } }
    );
    console.log(notionCredential);
    const notionKey = notionCredential.credentials[0].apiKey;

    const notion = new Client({ auth: notionKey });
    const deleteNotionPage = async () => {
      const page = pageDetail.associateIds[0].pageId;
      const pageExistance = await notion.pages.retrieve({
        page_id: page,
      });
      console.log(pageExistance.id);
      if (pageExistance.archived === true) {
        return;
      }
      const res = await notion.pages.update({
        page_id: page,
        archived: true,
      });
      console.log(res);
    };
    deleteNotionPage();
    const updatePage = {
      $pull: {
        associateIds: { name: req.params.id },
      },
    };
    const deletePage = await NotionCaloriesPage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await Calories.findOne({
      user: req.user.id,
      data: { $size: 0 },
    });
    if (emptyDB) {
      await Calories.deleteOne({ user: req.user.id });
    }
    res.status(200).json({
      data: {
        message: "Activity deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
