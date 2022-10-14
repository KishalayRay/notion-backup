const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  getStats,
} = require("../../controllers/configControllers/statController");

router.get("/getstats", verify, getStats);
module.exports = router;
