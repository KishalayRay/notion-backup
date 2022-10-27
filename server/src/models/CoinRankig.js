const mongoose = require("mongoose");
const coinRankingSchema = new mongoose.Schema(
  {
    coinSymbol: {
      type: String,
      required: true,
    },
    coinPrice: {
      type: Number,
      required: true,
    },
    coinDayChange: {
      type: Number,
      required: true,
    },
    coinMarketCap: {
      type: Number,
      required: true,
    },
    coinCirculation: {
      type: Number,
      required: true,
    },
    coinRank: {
      type: Number,
      required: true,
    },
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = new mongoose.model("CoinRanking", coinRankingSchema);
