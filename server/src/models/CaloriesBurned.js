const mongoose = require("mongoose");

const caloriesBurnedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    data: [
      {
        activityId: {
          type: String,
          required: true,
        },
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
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = new mongoose.model("CaloriesBurned", caloriesBurnedSchema);
