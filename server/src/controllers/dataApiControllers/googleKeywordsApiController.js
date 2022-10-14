const googleKeyword = require("../../models/GoogleKeyword");
const NotionApiKey = require("../../models/NotionKey");
const Apikey = require("../../models/ApiKey");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const SerpApi = require("google-search-results-nodejs");
exports.createKeyword = async (req, res, next) => {
  try {
    const currDate = new Date().toISOString();

    const existKeyword = await googleKeyword.findOne({
      $and: [
        { keyword: req.body.keyword },
        { date: currDate.substring(0, 10) },
        { users: req.user.id },
      ],
    });
    if (existKeyword) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        keyword: req.body.keyword,
        date: currDate.substring(0, 10),
      },
      $push: { users: req.user.id },
    };

    await googleKeyword.updateOne({ keyword: req.body.keyword }, update, {
      upsert: true,
    });
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { credentials: { $elemMatch: { apiSlug: "Googlekeyword" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Googlekeyword" } } }
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
          { keys: { $elemMatch: { apiSlug: "Googlekeyword" } } },
        ],
      },
      { keys: { $elemMatch: { apiSlug: "Googlekeyword" } } }
    );
    console.log(apikey.keys[0].key, "apikey");

    const search = new SerpApi.GoogleSearch(apikey.keys[0].key);
    const params = {
      engine: "google_trends",
      q: req.body.keyword,
      data_type: "RELATED_QUERIES",
    };

    // const callback = function (data) {
    //   console.log(data["jobs_results"]);
    // };

    // Show result as JSON
    search.json(params, (data) => {
      const keywords = data["related_queries"];
      const keywordArray = [...keywords.rising, ...keywords.top];
      keywordArray.map(async (keyword) => {
        await notion.pages.create({
          parent: {
            database_id: dataBaseId,
          },
          properties: {
            Keyword: {
              title: [
                {
                  text: {
                    content: keyword.query,
                  },
                },
              ],
            },
            Volume: {
              number: keyword.extracted_value,
            },
            Date: {
              date: {
                start: currDate,
              },
            },
          },
        });
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

exports.getKeywords = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const keyword = await googleKeyword.find({ users: userId });
    console.log(keyword);
    if (keyword === null) {
      return res.status(200).json({
        data: {
          keywords: [],
        },
      });
    } else {
      return res.status(200).json({
        data: {
          keywords: keyword,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteKeyword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await googleKeyword.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const emptyDB = await googleKeyword.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await googleKeyword.findByIdAndDelete(req.params.id);
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
