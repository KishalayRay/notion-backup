const cryptoJS = require("crypto-js");
const NotionApiKey = require("../../models/NotionKey");
const { validationResult } = require("express-validator");
const { createError } = require("../../utils/error");
const Api = require("../../models/ApiList");

const { Client } = require("@notionhq/client");
const Omdb = require("../../models/Omdb");
const NotionOmdbPage = require("../../models/NotionOmdbPage");
const NotionCalendarificPage = require("../../models/NotionCalendarificPage");
const Calendarific = require("../../models/Calendarific");
const StockData = require("../../models/StockData");
const NotionStockDataPage = require("../../models/NotionStockDataPage");
const TheNewsApi = require("../../models/TheNewsApi");
const NotionTheNewsApiPage = require("../../models/NotionTheNewsApiPage");
exports.createNotionConfig = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return next(createError(401, "Please Enter Valid Credentials"));
    }

    const credentialsBody = {
      apiSlug: req.body.apiSlug,
      databaseId: req.body.databaseId,
      apiKey: req.body.apiKey,
    };

    const apiAuth = await NotionApiKey.findOne({
      $and: [
        { "credentials.apiSlug": req.body.apiSlug },
        { user: req.user.id },
      ],
    });
    console.log(apiAuth, "apiauth");
    if (apiAuth) {
      return next(createError(400, "Data already Inserted"));
    }
    const notion = new Client({ auth: req.body.apiKey });
    const databaseId = req.body.databaseId;
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    console.log(response.message, "response");
    if (response === null) {
      return;
    }
    const update = {
      $set: { user: req.user.id },
      $push: { credentials: credentialsBody },
    };
    const apiKey = await NotionApiKey.updateOne({ user: req.user.id }, update, {
      upsert: true,
    });
    await Api.updateOne(
      { apiSlug: credentialsBody.apiSlug },
      { $push: { users: req.user.id } }
    );
    res.status(200).json({
      data: {
        NotionApi: apiKey,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getNotionConfig = async (req, res, next) => {
  try {
    const api = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { "credentials.apiSlug": req.body.apiSlug },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: req.body.apiSlug } } }
    );

    res.status(200).json({
      data: {
        NotionApi: api,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getAllNotionConfig = async (req, res, next) => {
  try {
    const allApis = await NotionApiKey.find(
      { user: req.user.id },
      { "credentials.apiSlug": 1, _id: 0 }
    );

    res.status(200).json({
      data: {
        NotionApi: allApis,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteNotionConfig = async (req, res, next) => {
  try {
    const apiKeyBody = {
      apiSlug: req.body.apiSlug,
    };
    update = {
      $pull: { credentials: apiKeyBody },
    };
    await NotionApiKey.updateOne({ user: req.user.id }, update);
    // const newApiKey = new Apikey({...apiKeyBody,user:req.user._id});
    // await newApiKey.save();
    await Api.updateOne(
      { apiSlug: req.body.apiSlug },
      { $pull: { users: req.user.id } }
    );
    if (req.body.apiSlug === "Omdb") {
      await Omdb.updateMany(
        { users: req.user.id },
        { $pull: { users: req.user.id } }
      );
      await NotionOmdbPage.deleteOne({ user: req.user.id });
    } else if (req.body.apiSlug === "Alphavantage") {
      await StockData.updateMany(
        { users: req.user.id },
        { $pull: { users: req.user.id } }
      );
      await NotionStockDataPage.deleteOne({ user: req.user.id });
    } else if (req.body.apiSlug === "Calendarific") {
      await Calendarific.updateMany(
        { users: req.user.id },
        { $pull: { users: req.user.id } }
      );
      await NotionCalendarificPage.deleteOne({ user: req.user.id });
    } else if (req.body.apiSlug === "Thenewsapi") {
      await TheNewsApi.updateMany(
        { users: req.user.id },
        { $pull: { users: req.user.id } }
      );
      await NotionTheNewsApiPage.deleteOne({ user: req.user.id });
    }
    res.status(200).json({
      data: {
        message: "Notion Credentials deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
