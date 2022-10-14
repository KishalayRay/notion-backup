const mongoose = require("mongoose");
const hunterSchema = new mongoose.Schema(
  {
    domain: {
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
module.exports = new mongoose.model("Hunters", hunterSchema);
