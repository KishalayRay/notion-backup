const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = new mongoose.model("Users", userSchema);
