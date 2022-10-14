const mongoose = require("mongoose");
const caloriesBurnedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cph: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    burned: {
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
module.exports = new mongoose.model("CaloriesBurned", caloriesBurnedSchema);
