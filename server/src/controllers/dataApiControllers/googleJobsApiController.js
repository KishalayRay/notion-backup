const googleJob = require("../../models/Googlejobs");
const NotionApiKey = require("../../models/NotionKey");
const Apikey = require("../../models/ApiKey");
const axios = require("axios");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const createUule = require("create-uule");
const SerpApi = require("google-search-results-nodejs");
exports.createJob = async (req, res, next) => {
  try {
    const currDate = new Date().toISOString();

    const existJob = await googleJob.findOne({
      $and: [
        { jobTitle: req.body.jobTitle },
        { jobLocation: req.body.jobLocation },
        { date: currDate.substring(0, 10) },
        { users: req.user.id },
      ],
    });
    if (existJob) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        jobTitle: req.body.jobTitle,
        jobLocation: req.body.jobLocation,
        date: currDate.substring(0, 10),
      },
      $push: { users: req.user.id },
    };

    await googleJob.updateOne({ jobTitle: req.body.jobTitle }, update, {
      upsert: true,
    });
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { credentials: { $elemMatch: { apiSlug: "Googlejobs" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Googlejobs" } } }
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
          { keys: { $elemMatch: { apiSlug: "Googlejobs" } } },
        ],
      },
      { keys: { $elemMatch: { apiSlug: "Googlejobs" } } }
    );
    console.log(apikey.keys[0].key, "apikey");
    const search = new SerpApi.GoogleSearch(apikey.keys[0].key);
    const uule = createUule(req.body.jobLocation);
    console.log(typeof uule, "uule");
    const params = {
      engine: "google_jobs",
      q: req.body.jobTitle,
      uule: uule,
      hl: "en",
    };

    // const callback = function (data) {
    //   console.log(data["jobs_results"]);
    // };

    // Show result as JSON
    search.json(params, (data) => {
      const jobsArray = data["jobs_results"];
      console.log(jobsArray);
      jobsArray.map(async (job) => {
        await notion.pages.create({
          parent: {
            database_id: dataBaseId,
          },
          properties: {
            Title: {
              title: [
                {
                  text: {
                    content: job.title,
                  },
                },
              ],
            },
            Company: {
              rich_text: [
                {
                  text: {
                    content: job.company_name,
                  },
                },
              ],
            },
            Location: {
              rich_text: [
                {
                  text: {
                    content: job.location,
                  },
                },
              ],
            },
            Aggregator: {
              rich_text: [
                {
                  text: {
                    content: job.via,
                  },
                },
              ],
            },

            Extensions: {
              multi_select: job.extensions.map((extension) => {
                return {
                  name: extension,
                };
              }),
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

exports.getJobs = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const job = await googleJob.find({ users: userId });
    console.log(job);
    if (job === null) {
      return res.status(200).json({
        data: {
          jobs: [],
        },
      });
    } else {
      return res.status(200).json({
        data: {
          jobs: job,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await googleJob.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const emptyDB = await googleJob.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await googleJob.findByIdAndDelete(req.params.id);
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
