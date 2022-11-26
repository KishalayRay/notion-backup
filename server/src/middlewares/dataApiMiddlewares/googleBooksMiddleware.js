const cryptoJS = require("crypto-js");
const NotionApiKey = require("../../models/NotionKey");
const axios = require("axios");
const { Client } = require("@notionhq/client");
const { createError } = require("../../utils/error");
const bookMiddleware = async (req, res, next) => {
  // console.log(req.body.bookTitle);
  // const data = await axios.get(
  //   `https://imsea.herokuapp.com/api/1?q=${req.body.bookTitle}`
  // );
  // console.log(data);

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
      return;
    }
    console.log(response.properties);
    const arrayOne = Object.values(response.properties).map(
      (item) => `${item.name},${item.type}`
    );

    console.log(arrayOne);
    // arrayTwo = [
    //   "Image,files",
    //   "Rating,number",
    //   "Genre,multi_select",
    //   "Year,number",
    //   "Duration (min),number",
    //   "Title,title",
    // ];
    // const result = arrayTwo.every((val) => arrayOne.includes(val));
    // console.log(result);
    // if (result === false) {
    //   return next(createError(400, "You have updated notion database"));
    // }

    req.dataBaseId = dataBaseId;
    req.notionKey = notionKey;
    // req.image = data.results[0];
    next();
  };
  retrieveDatabase();
};
module.exports = bookMiddleware;
