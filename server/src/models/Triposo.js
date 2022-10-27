const mongoose = require("mongoose");
const triposoSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    date: {
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
module.exports = new mongoose.model("Triposos", triposoSchema);
