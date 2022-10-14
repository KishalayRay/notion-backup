const mongoose = require("mongoose");
const spoonacularSchema = new mongoose.Schema(
  {
    recipeId: {
      type: String,
      required: true,
    },
    recipeImage: {
      type: String,
      required: true,
    },
    recipeName: {
      type: String,
      required: true,
    },
    recipeIngredients: {
      type: Array,
      required: true,
    },
    carb: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    instructions: {
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
module.exports = new mongoose.model("Spoonaculars", spoonacularSchema);
