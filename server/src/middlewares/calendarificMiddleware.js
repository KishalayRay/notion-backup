const cryptoJS = require("crypto-js");
const NotionApiKey = require("../models/NotionKey");
const { Client } = require("@notionhq/client");
const omdbMiddleware = async (req, res, next) => {
  const notionCredential = await NotionApiKey.findOne(
    {
      $and: [
        { user: req.user.id },
        { credentials: { $elemMatch: { apiSlug: "Omdb" } } },
      ],
    },
    { credentials: { $elemMatch: { apiSlug: "Omdb" } } }
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
    const arrayOne = Object.values(response.properties).map(
      (item) => item.name
    );
    console.log(arrayOne);
    arrayTwo = ["Image", "Rating", "Genre", "Year", "Duration (min)", "Title"];
    const result = arrayTwo.every((val) => arrayOne.includes(val));

    if (result === false) {
      return;
    }
    req.dataBaseId = dataBaseId;
    req.notionKey = notionKey;
    next();
  };
  retrieveDatabase();
};
module.exports = omdbMiddleware;
