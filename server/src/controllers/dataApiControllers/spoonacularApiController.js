const Spoonacular = require("../../models/Spoonacular");
const NotionApiKey = require("../../models/NotionKey");
const NotionSpoonacularPage = require("../../models/NotionSpoonacularPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await Spoonacular.findOne({
      $and: [{ recipeId: req.body.recipeId }, { users: req.user.id }],
    });
    console.log(recipe);
    if (recipe) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        recipeId: req.body.recipeId,
        recipeImage: req.body.recipeImage,
        recipeName: req.body.recipeName,
        recipeIngredients: req.body.recipeIngredients,
        fat: parseFloat(req.body.fat),
        carb: parseFloat(req.body.carb),
        calories: parseFloat(req.body.calories),
        protein: parseFloat(req.body.protein),
        instructions: req.body.instructions.replace(/(<([^>]+)>)/gi, ""),
      },
      $push: { users: req.user.id },
    };

    const recipeUpdate = await Spoonacular.updateOne(
      { recipeId: req.body.recipeId },
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
          { credentials: { $elemMatch: { apiSlug: "Spoonacular" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Spoonacular" } } }
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
          Meal: {
            title: [
              {
                text: {
                  content: req.body.recipeName,
                },
              },
            ],
          },
          Image: {
            files: [
              {
                type: "external",
                name: "meal cover",
                external: {
                  url: req.body.recipeImage,
                },
              },
            ],
          },
          Ingredients: {
            multi_select: req.body.recipeIngredients.map((ingredient) => {
              return {
                name: ingredient,
              };
            }),
          },
          "Fat (g)": {
            number: parseFloat(req.body.fat),
          },
          "Carbs (g)": {
            number: parseFloat(req.body.carb),
          },
          "Calories (k)": {
            number: parseFloat(req.body.calories),
          },
          "Protein (g)": {
            number: parseFloat(req.body.protein),
          },
          Instructions: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: req.body.instructions.replace(/(<([^>]+)>)/gi, ""),
                },
              },
            ],
          },
        },
      });
      const body = {
        recipeId: req.body.recipeId,
        pageId: response.id,
      };
      const update = {
        $set: { user: req.user.id },
        $push: { associateIds: body },
      };
      const createPage = await NotionSpoonacularPage.updateOne(
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
exports.getRecipes = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  if (req.query.page) {
    const numRecipes = await Spoonacular.countDocuments();
    if (skip > numRecipes) {
      return next(
        createError(400, "This page does not existThis page does not exist")
      );
    }
  }
  const userId = req.user.id;
  try {
    const recipes = await Spoonacular.find({ users: userId });
    res.status(200).json({
      data: {
        count: recipes.length,
        recipes: recipes,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteRecipe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await Spoonacular.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const associateRecipe = await Spoonacular.findById({ _id: req.params.id });
    const recipeID = associateRecipe.recipeId;

    const pageDetail = await NotionSpoonacularPage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { recipeId: recipeID } } },
        ],
      },
      { associateIds: { $elemMatch: { recipeId: recipeID } } }
    );
    console.log(pageDetail.associateIds[0].pageId);
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [{ user: req.user.id }, { "credentials.apiSlug": "Spoonacular" }],
      },
      { credentials: { $elemMatch: { apiSlug: "Spoonacular" } } }
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
        associateIds: { recipeId: recipeID },
      },
    };
    const deletePage = await NotionSpoonacularPage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await Spoonacular.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await Spoonacular.findByIdAndDelete(req.params.id);
    }
    res.status(200).json({
      data: {
        message: "Recipe deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
