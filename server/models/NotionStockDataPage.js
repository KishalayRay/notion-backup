const mongoose = require("mongoose");
const notionStockDataPageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  associateIds: [
    {
      stockSymbol: {
        type: String,
        required: true,
      },

      pageId: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = new mongoose.model(
  "NotionStockDataPages",
  notionStockDataPageSchema
);
