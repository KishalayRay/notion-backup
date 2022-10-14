const Googlebooks = require("../../models/Googlebooks");
const cryptoJS = require("crypto-js");
const NotionApiKey = require("../../models/NotionKey");
const NotionGooglebooksPage = require("../../models/NotionGooglebooksPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");

exports.createBook = async (req, res, next) => {
  try {
    const book = await Googlebooks.findOne({
      $and: [{ bookId: req.body.bookId }, { users: req.user.id }],
    });
    console.log(book);
    if (book) {
      return next(createError(400, "Data already Inserted"));
    }

    console.log(logResults);
    const update = {
      $set: {
        bookId: req.body.bookId,
        bookTitle: req.body.bookTitle,
        bookCover: req.body.bookCover,
        bookCategory: req.body.bookCategory,
        bookAuthor: req.body.bookAuthor,
        bookPage: req.body.bookPage,
      },
      $push: { users: req.user.id },
    };

    const bookupdate = await Googlebooks.updateOne(
      { bookId: req.body.bookId },
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
          { credentials: { $elemMatch: { apiSlug: "Googlebooks" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Googlebooks" } } }
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
          Title: {
            title: [
              {
                text: {
                  content: req.body.bookTitle,
                },
              },
            ],
          },
          Cover: {
            files: [
              {
                type: "external",
                name: "book cover",
                external: {
                  url: req.body.bookCover,
                },
              },
            ],
          },
          Category: {
            multi_select: [
              {
                name: req.body.bookCategory,
              },
            ],
          },
          "Page No": {
            number: req.body.bookPage,
          },
          Author: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: req.body.bookAuthor,
                },
              },
            ],
          },
        },
      });
      const body = {
        bookId: req.body.bookId,
        pageId: response.id,
      };
      const update = {
        $set: { user: req.user.id },
        $push: { associateIds: body },
      };
      const createPage = await NotionGooglebooksPage.updateOne(
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
exports.getBooks = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  if (req.query.page) {
    const numOmdbs = await Googlebooks.countDocuments();
    if (skip > numOmdbs) {
      return next(
        createError(400, "This page does not existThis page does not exist")
      );
    }
  }
  const userId = req.user.id;
  try {
    const books = await Googlebooks.find({ users: userId });
    res.status(200).json({
      data: {
        count: books.length,
        book: books,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await Googlebooks.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const associateBook = await Googlebooks.findById({ _id: req.params.id });
    const bookID = associateBook.bookId;

    const pageDetail = await NotionGooglebooksPage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { bookId: bookID } } },
        ],
      },
      { associateIds: { $elemMatch: { bookId: bookID } } }
    );
    console.log(pageDetail.associateIds[0].pageId);
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [{ user: req.user.id }, { "credentials.apiSlug": "Googlebooks" }],
      },
      { credentials: { $elemMatch: { apiSlug: "Googlebooks" } } }
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
        associateIds: { bookId: bookID },
      },
    };
    const deletePage = await NotionGooglebooksPage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await Googlebooks.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await Googlebooks.findByIdAndDelete(req.params.id);
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
