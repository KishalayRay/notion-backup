const mongoose = require("mongoose");
const notionGooglebooksPageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  associateIds: [
    {
      bookId: {
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
module.exports = new mongoose.model(
  "NotionGooglebooksPages",
  notionGooglebooksPageSchema
);
