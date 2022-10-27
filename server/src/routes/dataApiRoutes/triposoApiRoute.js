const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createTriposo,
  getTriposo,
  deleteTriposo,
} = require("../../controllers/dataApiControllers/triposoApiController");

router.post("/newtrip", verify, createTriposo);
router.get("/trip", verify, getTriposo);
router.put("/:id", verify, deleteTriposo);
module.exports = router;
