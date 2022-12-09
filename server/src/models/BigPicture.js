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

    foundedYear: {
      type: Number,
      required: true,
    },

    sector: {
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
