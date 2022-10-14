const BigPicture = require("../../models/BigPicture");
const NotionApiKey = require("../../models/NotionKey");
const NotionBigPicturePage = require("../../models/NotionBigPicturePage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");

exports.createCompany = async (req, res, next) => {
  try {
    const company = await BigPicture.findOne({
      $and: [{ companyId: req.body.companyId }, { users: req.user.id }],
    });
    console.log(company);
    if (company) {
      return next(createError(400, "Data already Inserted"));
    }

    const update = {
      $set: {
        companyId: req.body.companyId,
        company: req.body.company,
        sector: req.body.sector,
        site: req.body.site,
        location: req.body.location,
        foundedYear: req.body.foundedYear,
        description: req.body.description,
        valuation: req.body.valuation,
        raised: req.body.raised,
        employees: req.body.employees,
        revenue: req.body.revenue,
        rank: req.body.rank,
        followers: req.body.followers,
        aliases: req.body.aliases,
      },
      $push: { users: req.user.id },
    };

    await BigPicture.updateOne({ companyId: req.body.companyId }, update, {
      upsert: true,
    });

    // notion update

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
          Company: {
            title: [
              {
                text: {
                  content: req.body.company,
                },
              },
            ],
          },
          Site: {
            url: req.body.site,
          },

          Sector: {
            multi_select: req.body.sector.map((industry) => {
              return {
                name: industry,
              };
            }),
          },

          Aliases: {
            multi_select: req.body.aliases.map((alias) => {
              return {
                name: alias.replace(/,/g, " "),
              };
            }),
          },
          FoundedYear: {
            number: req.body.foundedYear,
          },
          "Market Valuation": {
            number: req.body.valuation,
          },
          "Money Raised": {
            number: req.body.raised,
          },
          "Anual Revenue": {
            number: req.body.revenue,
          },
          "Alexa Rank": {
            number: req.body.rank,
          },
          "Twitter Follower": {
            number: req.body.followers,
          },
          Employees: {
            number: req.body.employees,
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: req.body.description,
                },
              },
            ],
          },

          Location: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: req.body.location,
                },
              },
            ],
          },
        },
      });
      const body = {
        companyId: req.body.companyId,
        pageId: response.id,
      };
      const update = {
        $set: { user: req.user.id },
        $push: { associateIds: body },
      };
      const createPage = await NotionBigPicturePage.updateOne(
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
exports.getCompanies = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  if (req.query.page) {
    const numOmdbs = await BigPicture.countDocuments();
    if (skip > numOmdbs) {
      return next(
        createError(400, "This page does not existThis page does not exist")
      );
    }
  }
  const userId = req.user.id;
  try {
    const companies = await BigPicture.find({ users: userId });
    res.status(200).json({
      data: {
        count: companies.length,
        company: companies,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteCompany = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await BigPicture.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const associateCompany = await BigPicture.findById({ _id: req.params.id });
    const companyID = associateCompany.companyId;

    const pageDetail = await NotionBigPicturePage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { companyId: companyID } } },
        ],
      },
      { associateIds: { $elemMatch: { companyId: companyID } } }
    );
    console.log(pageDetail.associateIds[0].pageId);
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [{ user: req.user.id }, { "credentials.apiSlug": "Bigpicture" }],
      },
      { credentials: { $elemMatch: { apiSlug: "Bigpicture" } } }
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
        associateIds: { companyId: companyID },
      },
    };
    const deletePage = await NotionBigPicturePage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await BigPicture.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await BigPicture.findByIdAndDelete(req.params.id);
    }
    res.status(200).json({
      data: {
        message: "Googlebooks deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
