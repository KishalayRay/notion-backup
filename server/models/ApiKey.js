const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    keys: [
      {
        apiSlug: {
          type: String,
          required: true,
        },
        key: {
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
module.exports = new mongoose.model("ApiKeys", apiKeySchema);
