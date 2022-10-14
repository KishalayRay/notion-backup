const mongoose = require("mongoose");
const statSchema = new mongoose.Schema({
  integrationNum: {
    type: Number,
    required: true,
  },
  apiKeyNum: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Stat", statSchema);
