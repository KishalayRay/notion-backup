const mongoose = require("mongoose");
const notionSpoonacularPageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  associateIds: [
    {
      recipeId: {
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
  "NotionSpoonacularPage",
  notionSpoonacularPageSchema
);
