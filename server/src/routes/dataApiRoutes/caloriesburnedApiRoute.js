const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createActivity,
  getActivities,
  deleteActivity,
} = require("../../controllers/dataApiControllers/caloriesBurnedApiController");

router.post("/newActivity", verify, createActivity);
router.get("/activities", verify, getActivities);
router.put("/:id", verify, deleteActivity);
module.exports = router;
