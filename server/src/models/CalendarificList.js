const mongoose = require("mongoose");
const CalendarificListSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    holidays: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
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
module.exports = new mongoose.model(
  "CalendarificLists",
  CalendarificListSchema
);
