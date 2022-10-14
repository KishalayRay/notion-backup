const mongoose = require("mongoose");
const CalendarificSchema = new mongoose.Schema(
  {
    country: {
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
module.exports = new mongoose.model("Calendarifics", CalendarificSchema);
