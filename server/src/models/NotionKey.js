const mongoose = require("mongoose");

const notionKeySchema = new mongoose.Schema(
  {
    credentials: [
      {
        apiSlug: {
          type: String,
          required: true,
        },
        databaseId: {
          type: String,
          required: true,
          unique: true,
        },
        apiKey: {
          type: String,
          required: true,
          unique: true,
        },
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = new mongoose.model("NotionKeys", notionKeySchema);
