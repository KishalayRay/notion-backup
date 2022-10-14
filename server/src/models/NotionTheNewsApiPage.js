const mongoose = require("mongoose");
const NotionTheNewsApiPageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  associateIds: [
    {
      name: {
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
  "NotionTheNewsApiPages",
  NotionTheNewsApiPageSchema
);
