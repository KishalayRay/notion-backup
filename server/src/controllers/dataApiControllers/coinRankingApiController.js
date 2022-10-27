const Coin = require("../../models/CoinRankig");
const cryptoJS = require("crypto-js");
const NotionApiKey = require("../../models/NotionKey");
const Apikey = require("../../models/ApiKey");
const NotionCoinDataPage = require("../../models/NotionCoinRankingPage");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const axios = require("axios");
//const APiKeys = require("../../models/ApiKeys");
exports.createCoin = async (req, res, next) => {
  try {
    const coin = await Coin.findOne({
      $and: [{ coinSymbol: req.body.coinSymbol }, { users: req.user.id }],
    });
    console.log(coin);
    if (coin) {
      return next(createError(400, "Data already Inserted"));
    }
    const update = {
      $set: {
        coinSymbol: req.body.coinSymbol,
        coinPrice: req.body.coinPrice,
        coinDayChange: req.body.coinDayChange,
        coinCirculation: req.body.coinCirculation,
        coinRank: req.body.coinRank,
        coinMarketCap: req.body.coinMarketCap,
      },
      $push: { users: req.user.id },
    };

    await Coin.updateOne({ coinSymbol: req.body.coinSymbol }, update, {
      upsert: true,
    });
    // notion update

    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: req.user.id },
          { credentials: { $elemMatch: { apiSlug: "Coinranking" } } },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Coinranking" } } }
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
          Coin: {
            title: [
              {
                type: "text",
                text: {
                  content: req.body.coinSymbol,
                },
              },
            ],
          },
          Price: {
            number: req.body.coinPrice,
          },
          Day_Change: {
            number: req.body.coinDayChange,
          },
          Market_Cap: {
            number: req.body.coinMarketCap,
          },
          "Circulating Supply": {
            number: req.body.coinCirculation,
          },
          Rank: {
            number: req.body.coinRank,
          },
        },
      });

      const body = {
        coinSymbol: req.body.coinSymbol,
        pageId: response.id,
      };
      const update = {
        $set: { user: req.user.id },
        $push: { associateIds: body },
      };
      const createPage = await NotionCoinDataPage.updateOne(
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
exports.getCoins = async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  if (req.query.page) {
    const numCoins = await Coin.countDocuments();
    if (skip > Day_Change) {
      return next(
        createError(400, "This page does not existThis page does not exist")
      );
    }
  }
  const userId = req.user.id;
  try {
    const coins = await Coin.find({ users: userId });
    res.status(200).json({
      data: {
        count: coins.length,
        coin: coins,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteCoin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const update = {
      $pull: { users: userId },
    };

    await Coin.findByIdAndUpdate({ _id: req.params.id }, update, {
      new: true,
    });
    const associateCoin = await Coin.findById({ _id: req.params.id });
    const coinSymbol = associateCoin.coinSymbol;

    const pageDetail = await NotionCoinDataPage.findOne(
      {
        $and: [
          { user: req.user.id },
          { associateIds: { $elemMatch: { coinSymbol: coinSymbol } } },
        ],
      },
      { associateIds: { $elemMatch: { coinSymbol: coinSymbol } } }
    );
    console.log(pageDetail.associateIds[0].pageId);
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [{ user: req.user.id }, { "credentials.apiSlug": "Coinranking" }],
      },
      { credentials: { $elemMatch: { apiSlug: "Coinranking" } } }
    );
    console.log(notionCredential);
    const notionKey = notionCredential.credentials[0].apiKey;

    const notion = new Client({ auth: notionKey });

    const updatePage = {
      $pull: {
        associateIds: { stockSymbol: stockSymbol },
      },
    };
    const deletePage = await NotionCoinDataPage.updateOne(
      { user: req.user.id },
      updatePage,
      { new: true }
    );
    console.log(deletePage, "Notion Page");
    const emptyDB = await Coin.findByIdAndUpdate({
      _id: req.params.id,
      users: [],
    });
    if (emptyDB) {
      await Coin.findByIdAndDelete(req.params.id);
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
exports.updateCoin = async () => {
  // let page = 1;
  // const limit = 5;
  // let skip = 0;
  // let i = 0;
  // const stocksCount = await StockData.countDocuments();
  // const loop = Math.ceil(stocksCount / limit);
  // if (skip > stocksCount) {
  //   return next(
  //     createError(400, "This page does not existThis page does not exist")
  //   );
  // }

  const coins = await Coin.find({});
  const apikey = await Apikey.aggregate([
    { $unwind: "$keys" },
    { $match: { "keys.apiSlug": "Coinranking" } },
    { $sample: { size: 1 } },
  ]);
  const originalKey = apikey[0].keys.key;
  console.log(originalKey);
  coins.map(async (coin) => {
    try {
      const response = await axios.get(
        `https://api.coinranking.com/v2/coins?symbols=${coin.coinSymbol}`,
        {
          headers: {
            "x-access-token": originalKey,
          },
        }
      );
      console.log(response.data);
      const currentCoin = response.data.coins[0];
      const update = await Coin.updateOne(
        { coinSymbol: coin.coinSymbol },
        {
          $set: {
            coinPrice: parseFloat(currentCoin.price),
            coinDayChangeParcentage: parseFloat(currentCoin.change),
            coinDayHigh: parseFloat(
              currentCoin.sparkline[currentCoin.sparkline.length - 1]
            ),
            coinDayLow: parseFloat(currentCoin.sparkline[0]),
            coinRank: parseFloat(currentCoin.rank),
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  });
};
exports.pageDetails = async (req, res) => {
  const individuals = await NotionCoinDataPage.find(
    {},
    { "associateIds.coinSymbol": 1, "associateIds.pageId": 1, user: 1 }
  );

  res.json(individuals);
  for (let i = 0; i < individuals.length; i++) {
    const notionCredential = await NotionApiKey.findOne(
      {
        $and: [
          { user: individuals[i].user },
          { "credentials.apiSlug": "Coinranking" },
        ],
      },
      { credentials: { $elemMatch: { apiSlug: "Coinranking" } } }
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
      const data = await Coin.findOne({
        coinSymbol: individuals[i].associateIds[j].coinSymbol,
      });
      console.log(page, "between", data.coinSymbol);
      await notion.pages.update({
        page_id: page,
        properties: {
          Price: {
            number: data.coinPrice,
          },

          Day_Change: {
            number: data.coinDayChangeParcentage / 100.0,
          },
          Todays_High: {
            number: data.coinkDayHigh,
          },
          Todays_Low: {
            number: data.coinDayLow,
          },
          Rank: {
            number: data.coinRank,
          },
        },
      });
    }
  }
};
