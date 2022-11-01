const Omdb = require("../../models/Omdb");
const cryptoJS = require("crypto-js");
const NotionApiKey = require("../../models/NotionKey");
const NotionOmdbPage = require("../../models/NotionOmdbPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
exports.createOmdb = async (req, res, next) => {
  try {
    const movie = await Omdb.findOne({
      $and: [{ movieId: req.body.movieId }, { users: req.user.id }],
    });
    console.log(movie);
    if (movie) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        movieId: req.body.movieId,
        movieTitle: req.body.movieTitle,
        movieImage: req.body.movieImage,
        movieGenre: req.body.movieGenre,
        movieDuration: req.body.movieDuration || 0,
        movieRating: req.body.movieRating || 0,
        movieYear: req.body.movieYear || 0,
      },
      $push: { users: req.user.id },
    };

    await Omdb.updateOne({ movieId: req.body.movieId }, update, {
      upsert: true,
    });

    const notion = new Client({
      auth: req.notionKey,
    });

    const main = async () => {
      try {
        const response = await notion.pages.create({
          parent: {
            database_id: req.dataBaseId,
          },
          properties: {
            Title: {
              title: [
                {
                  text: {
                    content: req.body.movieTitle,
                  },
                },
              ],
            },
            Image: {
              files: [
                {
                  type: "external",
                  name: "movie image",
                  external: {
                    url: req.body.movieImage,
                  },
                },
              ],
            },
            Genre: {
              multi_select: req.body.movieGenre.map((genre) => {
                return {
                  name: genre,
                };
              }),
            },
            "Duration (min)": {
              number: req.body.movieDuration || 0,
            },
            Rating: {
              number: req.body.movieRating || 0,
            },
            Year: {
              number: req.body.movieYear || 0,
            },
          },
        });

        const body = {
          movieId: req.body.movieId,
          pageId: response.id,
        };
        const update = {
          $set: { user: req.user.id },
          $push: { associateIds: body },
        };
        const createPage = await NotionOmdbPage.updateOne(
          { user: req.user.id },
          update,
          {
            upsert: true,
          }
        );
        console.log(createPage);
      } catch (err) {
        return next(createError(400, "Notion Error"));
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
exports.getOmdbs = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 6;
  const skip = (page - 1) * limit;
  const numOmdbs = await Omdb.countDocuments();
  const pageCount = Math.ceil(numOmdbs / limit);
  if (req.query.page) {
    if (skip > numOmdbs) {
      return next(
        createError(400, "This page does not existThis page does not exist")
      );
    }
  }
  const userId = req.user.id;
  try {
    const movies = await Omdb.find({ users: userId })

      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.status(200).json({
      data: {
        count: movies.length,
        pageCount: pageCount,
        Omdb: movies,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteOmdb = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await Omdb.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const associateMovie = await Omdb.findById({ _id: req.params.id });
    const movieID = associateMovie.movieId;

    const pageDetail = await NotionOmdbPage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { movieId: movieID } } },
        ],
      },
      { associateIds: { $elemMatch: { movieId: movieID } } }
    );
    console.log(pageDetail.associateIds[0].pageId);
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [{ user: req.user.id }, { "credentials.apiSlug": "Omdb" }],
      },
      { credentials: { $elemMatch: { apiSlug: "Omdb" } } }
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
        associateIds: { movieId: movieID },
      },
    };
    const deletePage = await NotionOmdbPage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await Omdb.findById({
      _id: req.params.id,
      users: { $size: 0 },
    });
    if (emptyDB) {
      await Omdb.findByIdAndDelete(req.params.id);
    }
    res.status(200).json({
      data: {
        message: "Omdb deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
