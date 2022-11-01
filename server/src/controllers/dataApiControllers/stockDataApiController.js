const StockData = require("../../models/StockData");
const NotionApiKey = require("../../models/NotionKey");
const Apikey = require("../../models/ApiKey");
const NotionStockDataPage = require("../../models/NotionStockDataPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const axios = require("axios");
//const APiKeys = require("../../models/ApiKeys");
exports.createStock = async (req, res, next) => {
  try {
    const stock = await StockData.findOne({
      $and: [{ stockSymbol: req.body.stockSymbol }, { users: req.user.id }],
    });
    console.log(stock);
    if (stock) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        stockName: req.body.stockName,
        stockSymbol: req.body.stockSymbol,
        stockPrice: parseFloat(req.body.stockPrice).toFixed(2),
        stockDayChange: parseFloat(req.body.stockDayChange).toFixed(2),
        stockDayChangeParcentage: parseFloat(
          req.body.stockDayChangeParcentage
        ).toFixed(2),
        stockDayHigh: parseFloat(req.body.stockDayHigh).toFixed(2),
        stockDayLow: parseFloat(req.body.stockDayLow).toFixed(2),
      },
      $push: { users: req.user.id },
    };

    await StockData.updateOne({ stockSymbol: req.body.stockSymbol }, update, {
      upsert: true,
    });
    // notion update

    const notion = new Client({
      auth: req.notionKey,
    });

    const main = async () => {
      const response = await notion.pages.create({
        parent: {
          database_id: req.dataBaseId,
        },
        properties: {
          Stock: {
            title: [
              {
                type: "text",
                text: {
                  content: req.body.stockName,
                },
              },
            ],
          },
          Symbol: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: req.body.stockSymbol,
                },
              },
            ],
          },
          Price: {
            number: parseFloat(req.body.stockPrice),
          },
          "Day Change": {
            number: parseFloat(req.body.stockDayChange),
          },
          "Change Parcentage": {
            number: parseFloat(req.body.stockDayChangeParcentage) / 100,
          },
          "Todays High": {
            number: parseFloat(req.body.stockDayHigh),
          },
          "Todays Low": {
            number: parseFloat(req.body.stockDayLow),
          },
        },
      });

      const body = {
        stockSymbol: req.body.stockSymbol,
        pageId: response.id,
      };
      const update = {
        $set: { user: req.user.id },
        $push: { associateIds: body },
      };
      const createPage = await NotionStockDataPage.updateOne(
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
exports.getStocks = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  if (req.query.page) {
    const numOmdbs = await Omdb.countDocuments();
    if (skip > numOmdbs) {
      return next(
        createError(400, "This page does not existThis page does not exist")
      );
    }
  }
  const userId = req.user.id;
  try {
    const stocks = await StockData.find({ users: userId });
    res.status(200).json({
      data: {
        count: stocks.length,
        Stock: stocks,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteStock = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await StockData.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const associateStock = await StockData.findById({ _id: req.params.id });
    const stockSymbol = associateStock.stockSymbol;

    const pageDetail = await NotionStockDataPage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { stockSymbol: stockSymbol } } },
        ],
      },
      { associateIds: { $elemMatch: { stockSymbol: stockSymbol } } }
    );
    console.log(pageDetail.associateIds[0].pageId);
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { "credentials.apiSlug": "Alphavantage" },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Alphavantage" } } }
    );
    console.log(notionCredential);
    const notionKey = notionCredential.credentials[0].apiKey;

    const notion = new Client({ auth: notionKey });

    const updatePage = {
      $pull: {
        associateIds: { stockSymbol: stockSymbol },
      },
    };
    const deletePage = await NotionStockDataPage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await StockData.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await StockData.findByIdAndDelete(req.params.id);
    }
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
    res.status(200).json({
      data: {
        message: "Sockdata deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.updateStock = async () => {
  let page = 1;
  const limit = 5;
  let skip = 0;
  let i = 0;
  const stocksCount = await StockData.countDocuments();
  const loop = Math.ceil(stocksCount / limit);
  if (skip > stocksCount) {
    return next(
      createError(400, "This page does not existThis page does not exist")
    );
  }
  const myLoop = () => {
    setTimeout(async () => {
      const stocks = await StockData.find({}).skip(skip).limit(limit);
      const apikey = await Apikey.aggregate([
        { $unwind: "$keys" },
        { $match: { "keys.apiSlug": "Calendarific" } },
        { $sample: { size: 1 } },
      ]);
      const originalKey = apikey[0].keys.key;
      console.log(originalKey);
      stocks.map(async (stock) => {
        try {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.stockSymbol}&apikey=${originalKey}`
          );
          console.log(response.data);
          const currentStock = response.data["Global Quote"];
          const update = await StockData.updateOne(
            { stockSymbol: stock.stockSymbol },
            {
              $set: {
                stockPrice: parseFloat(currentStock["05. price"]),
                stockDayChange: parseFloat(currentStock["09. change"]),
                stockDayChangeParcentage: parseFloat(
                  currentStock["10. change percent"]
                ),
                stockDayHigh: parseFloat(currentStock["03. high"]),
                stockDayLow: parseFloat(currentStock["04. low"]),
              },
            }
          );
        } catch (e) {
          console.log(e);
        }
      });
      console.log(page, skip);
      page++;
      skip = (page - 1) * limit;
      i++;
      if (i < loop) {
        myLoop();
      }
    }, 1000 * 60);
  };
  myLoop();
};
exports.pageDetails = async (req, res) => {
  // const pageDetails = await NotionStockDataPage.find(
  //   {
  //     associateIds: {
  //       $elemMatch: { stockSymbol: "META" },
  //     },
  //   },
  //   { associateIds: { $elemMatch: { stockSymbol: "META" } } }
  // );
  // res.json(pageDetails);
  const individuals = await NotionStockDataPage.find(
    {},
    { "associateIds.stockSymbol": 1, "associateIds.pageId": 1, user: 1 }
  );

  res.json(individuals);
  for (let i = 0; i < individuals.length; i++) {
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: individuals[i].user },
          { "credentials.apiSlug": "Alphavantage" },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Alphavantage" } } }
    );
    const dataBaseId = notionCredential.credentials[0].databaseId;
    const notionKey = notionCredential.credentials[0].apiKey;
    console.log(notionKey, "notionkey", individuals[i].associateIds.length);
    const notion = new Client({ auth: notionKey });
    const response = await notion.databases.retrieve({
      database_id: dataBaseId,
    });
    if (response === null) {
      continue;
    }
    for (let j = 0; j < individuals[i].associateIds.length; j++) {
      console.log("inside j loop");
      const page = individuals[i].associateIds[j].pageId;
      const pageExistance = await notion.pages.retrieve({ page_id: page });
      console.log(pageExistance.id);
      if (pageExistance.archived === true) {
        continue;
      }
      const data = await StockData.findOne({
        stockSymbol: individuals[i].associateIds[j].stockSymbol,
      });
      console.log(page, "between", data.stockSymbol);
      const res = await notion.pages.update({
        page_id: page,
        properties: {
          Price: {
            number: data.stockPrice,
          },
          Day_Change: {
            number: data.stockDayChange,
          },
          Change_Parcentage: {
            number: data.stockDayChangeParcentage / 100.0,
          },
          Todays_High: {
            number: data.stockDayHigh,
          },
          Todays_Low: {
            number: data.stockDayLow,
          },
        },
      });
    }
  }
  // individuals.map(async (individual) => {
  //   const notionCredential = await NotionApiKey.findOne(
  //     {
  //       $and: [
  //         { user: individual.user },
  //         { "credentials.apiSlug": "Alphavantage" },
  //       ],
  //     },
  //     { credentials: { $elemMatch: { apiSlug: "Alphavantage" } } }
  //   );
  //   console.log(notionCredential);
  //   const notionKey = cryptoJS.AES.decrypt(
  //     notionCredential.credentials[0].apiKey,
  //     process.env.SECRET_KEY
  //   ).toString(cryptoJS.enc.Utf8);
  //   console.log(notionKey);
  // });
};
