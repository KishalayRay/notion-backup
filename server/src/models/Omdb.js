const mongoose = require("mongoose");
const omdbSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    movieImage: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    movieGenre: {
      type: Array,
      required: true,
    },
    movieDuration: {
      type: Number,
      required: true,
    },
    movieRating: {
      type: Number,
      required: true,
    },
    movieYear: {
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

module.exports = new mongoose.model("Omdb", omdbSchema);
