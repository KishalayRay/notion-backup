const mongoose = require("mongoose");
const notionBigPictureSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  associateIds: [
    {
      companyId: {
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
  "NotionBigPicturePages",
  notionBigPictureSchema
);
