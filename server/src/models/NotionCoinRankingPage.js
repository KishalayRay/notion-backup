const mongoose = require("mongoose");
const notionCoinRankingPageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  associateIds: [
    {
      coinSymbol: {
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
  "NotionCoinRankingPages",
  notionCoinRankingPageSchema
);
