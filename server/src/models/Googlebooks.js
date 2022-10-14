const mongoose = require("mongoose");
const googlebookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    bookCover: {
      type: String,
      required: true,
    },
    bookCategory: {
      type: String,
      required: true,
    },

    bookAuthor: {
      type: String,
      required: true,
    },
    bookPage: {
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
module.exports = new mongoose.model("Googlebooks", googlebookSchema);
