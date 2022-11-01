const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createHoliday,
  getHoliday,
  createCountry,
  updateHoliday,
  pageDetails,
  createNextHoliday,
} = require("../../controllers/dataApiControllers/caledarificApiController");
const calendarificMiddleware = require("../../middlewares/dataApiMiddlewares/calendarificMiddleware");

router.post("/country", verify, createCountry);
router.post("/newholiday", verify, calendarificMiddleware, createHoliday);
router.get("/holiday", verify, getHoliday);
router.get("/", updateHoliday);
router.get("/page", pageDetails);
router.get("/nextholiday", createNextHoliday);
module.exports = router;
