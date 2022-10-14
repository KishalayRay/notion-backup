const mongoose = require("mongoose");
const TheNewsApiListSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    news: [
      {
        title: {
          type: String,
          required: true,
        },
        snippet: {
          type: String,
          required: true,
        },
        time: {
          type: Date,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = new mongoose.model("TheNewsApiLists", TheNewsApiListSchema);
