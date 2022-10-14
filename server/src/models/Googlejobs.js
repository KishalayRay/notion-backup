const mongoose = require("mongoose");
const googleJobsSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobLocation: {
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
module.exports = new mongoose.model("GoogleJobs", googleJobsSchema);
