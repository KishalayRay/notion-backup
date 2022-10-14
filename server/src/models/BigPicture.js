const mongoose = require("mongoose");
const bigPictureSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    foundedYear: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sector: {
      type: Array,
      required: true,
    },
    valuation: {
      type: Number,
      required: true,
    },
    raised: {
      type: Number,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    employees: {
      type: Number,
      required: true,
    },
    followers: {
      type: Number,
      required: true,
    },

    aliases: {
      type: Array,
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
module.exports = new mongoose.model("BigPictures", bigPictureSchema);
