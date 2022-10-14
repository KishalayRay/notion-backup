const express = require("express");
const router = express.Router();
const verify = require("../../middlewares/verifyToken");
const {
  getPrices,
  createSession,
  getSubscription,
  cancelSubscription,
} = require("../../controllers/stripeController/subsController");
router.get("/prices", verify, getPrices);
router.post("/session", verify, createSession);
router.get("/subscription", verify, getSubscription);
router.post("/cancel", verify, cancelSubscription);
module.exports = router;
