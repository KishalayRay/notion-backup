const mongoose = require("mongoose");
const notionPageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  associateIds: [
    {
      movieId: {
        type: String,
        required: true,
      },

      pageId: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = new mongoose.model("NotionOmdbPages", notionPageSchema);
