const StockData = require("../../models/StockData");
const Apikey = require("../../models/ApiKey");
const cryptoJS = require("crypto-js");
exports.stockdataUpdate = async () => {
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
        { $match: { "keys.apiSlug": "Apivintage" } },

        { $sample: { size: 1 } },
      ]);
      const originalKey = cryptoJS.AES.decrypt(
        apikey[0].keys[0].key,
        process.env.SECRET_KEY
      ).toString(cryptoJS.enc.Utf8);
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
