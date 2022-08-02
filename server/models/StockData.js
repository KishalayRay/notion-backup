const mongoose = require("mongoose");
const stockDataSchema = new mongoose.Schema(
  {
    stockSymbol: {
      type: String,
      required: true,
    },
    stockPrice: {
      type: Number,
      required: true,
    },
    stockDayChange: {
      type: Number,
      required: true,
    },
    stockDayChangeParcentage: {
      type: Number,
      required: true,
    },
    stockDayHigh: {
      type: Number,
      required: true,
    },
    stockDayLow: {
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
module.exports = new mongoose.model("StockData", stockDataSchema);
