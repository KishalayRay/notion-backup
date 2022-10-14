const mongoose = require("mongoose");
const apiSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: "",
    },
    apiName: {
      type: String,
      required: true,
    },
    apiSlug: {
      type: String,
      required: true,
    },
    keyRequire: {
      type: String,
      default: "require",
    },
    description: {
      type: String,
      required: true,
    },
    proAccess: {
      type: Boolean,
      default: true,
      required: true,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = new mongoose.model("ApiLists", apiSchema);
