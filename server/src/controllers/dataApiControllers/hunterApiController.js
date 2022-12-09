const hunter = require("../../models/Hunter");
const NotionApiKey = require("../../models/NotionKey");
const { Client, APIErrorCode } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const Apikey = require("../../models/ApiKey");
const axios = require("axios");
exports.createLead = async (req, res, next) => {
  try {
    const currDate = new Date().toISOString();

    const existLead = await hunter.findOne({
      $and: [{ domain: req.body.domain }, { users: req.user.id }],
    });
    if (existLead) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        domain: req.body.domain,
        date: currDate,
      },
      $push: { users: req.user.id },
    };

    await hunter.updateOne({ domain: req.body.domain }, update, {
      upsert: true,
    });
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { credentials: { $elemMatch: { apiSlug: "Hunter" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Hunter" } } }
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
          { keys: { $elemMatch: { apiSlug: "Hunter" } } },
        ],
      },
      { keys: { $elemMatch: { apiSlug: "Hunter" } } }
    );
    console.log(apikey.keys[0].key, "apikey");

    const response = await axios.get(
      `https://api.hunter.io/v2/domain-search?domain=${req.body.domain}&api_key=${apikey.keys[0].key}`
    );
    const LeadData = response.data.data.emails;
    LeadData.map(async (lead) => {
      try {
        await notion.pages.create({
          parent: {
            database_id: dataBaseId,
          },
          properties: {
            Company: {
              title: [
                {
                  text: {
                    content: response.data.data.domain,
                  },
                },
              ],
            },
            FirstName: {
              rich_text: [
                {
                  text: {
                    content: lead.first_name || "",
                  },
                },
              ],
            },
            LastName: {
              rich_text: [
                {
                  text: {
                    content: lead.last_name || "",
                  },
                },
              ],
            },
            Type: {
              multi_select: [
                {
                  name: lead.type || "",
                },
              ],
            },

            Email: {
              type: "email",
              email: lead.value || "",
            },
            Position: {
              rich_text: [
                {
                  text: {
                    content: lead.position || "",
                  },
                },
              ],
            },
          },
        });
      } catch (err) {
        if (err.code === APIErrorCode.ObjectNotFound) {
          return next(createError(400, "Notion Error"));
        } else {
          // Other error handling code
          return next(createError(400, "Notion Error"));
        }
      }
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

exports.getLeads = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const lead = await hunter.find({ users: userId });
    console.log(lead);
    if (lead === null) {
      return res.status(200).json({
        data: {
          leads: [],
        },
      });
    } else {
      return res.status(200).json({
        data: {
          leads: lead,
        },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await hunter.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const emptyDB = await hunter.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await hunter.findByIdAndDelete(req.params.id);
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
