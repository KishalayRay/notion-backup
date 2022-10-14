const mongoose = require("mongoose");
const googleKeywordSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
    },
    date: {
      type: String,
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
module.exports = new mongoose.model("GoogleKeywords", googleKeywordSchema);
