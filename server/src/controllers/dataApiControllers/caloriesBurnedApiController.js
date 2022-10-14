const Calories = require("../../models/CaloriesBurned");
const NotionApiKey = require("../../models/NotionKey");
const NotionCaloriesPage = require("../../models/NotionCaloriesBurnedPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
exports.createActivity = async (req, res, next) => {
  try {
    const activity = await Calories.findOne({
      $and: [{ name: req.body.name }, { users: req.user.id }],
    });
    console.log(activity);
    if (activity) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        name: req.body.name,
        duration: req.body.duration,
        cph: req.body.cph,
        burned: req.body.burned,
      },
      $push: { users: req.user.id },
    };

    const activityUpdate = await Calories.updateOne(
      { name: req.body.name },
      update,
      {
        upsert: true,
      }
    );

    // notion update

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

    const main = async () => {
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
        },
      });
      const body = {
        name: req.body.name,
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
    const activities = await Calories.find({ users: userId });
    res.status(200).json({
      data: {
        count: activities.length,
        activities: activities,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteActivity = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await Calories.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const associateActivity = await Calories.findById({ _id: req.params.id });
    const name = associateActivity.name;

    const pageDetail = await NotionCaloriesPage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { name: name } } },
        ],
      },
      { associateIds: { $elemMatch: { name: name } } }
    );
    console.log(pageDetail.associateIds[0].pageId);
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { "credentials.apiSlug": "Caloriesburned" },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Caloriesburned" } } }
    );
    console.log(notionCredential);
    const notionKey = notionCredential.credentials[0].apiKey;

    const notion = new Client({ auth: notionKey });
    const deleteNotionPage = async () => {
      const page = pageDetail.associateIds[0].pageId;
      const pageExistance = await notion.pages.retrieve({ page_id: page });
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
        associateIds: { name: name },
      },
    };
    const deletePage = await NotionCaloriesPage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await Calories.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await Calories.findByIdAndDelete(req.params.id);
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
