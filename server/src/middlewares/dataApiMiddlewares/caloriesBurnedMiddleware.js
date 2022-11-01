const cryptoJS = require("crypto-js");
const NotionApiKey = require("../../models/NotionKey");
const axios = require("axios");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const caloriesBurnedMiddleware = async (req, res, next) => {
  const notionCredential = await NotionApiKey.findOne(
    {
      $and: [
        { user: req.user.id },
        { credentials: { $elemMatch: { apiSlug: "Caloriesburned" } } },
      ],
    },
    { credentials: { $elemMatch: { apiSlug: "Caloriesburned" } } }
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
      return;
    }
    console.log(response.properties);
    const arrayOne = Object.values(response.properties).map(
      (item) => `${item.name},${item.type}`
    );

    console.log(arrayOne);
    arrayTwo = [
      "Calories Per Hour,number",
      "Burned,number",
      "Activity,title",
      "Duration,number",
      "Date,date",
    ];
    const result = arrayTwo.every((val) => arrayOne.includes(val));
    console.log(result);
    if (result === false) {
      return next(createError(400, "You have updated notion database"));
    }

    req.dataBaseId = dataBaseId;
    req.notionKey = notionKey;
    next();
  };
  retrieveDatabase();
};
module.exports = caloriesBurnedMiddleware;
