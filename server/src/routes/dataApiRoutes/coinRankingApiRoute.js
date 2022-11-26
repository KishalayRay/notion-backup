const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createCoin,
  getCoins,
  deleteCoin,
  updateCoin,
  pageDetails,
} = require("../../controllers/dataApiControllers/coinRankingApiController");
const coinMiddleware = require("../../middlewares/dataApiMiddlewares/coinMiddleware");
router.post("/newcoin", verify, coinMiddleware, createCoin);
router.get("/coins", verify, getCoins);
router.put("/:id", verify, deleteCoin);
router.get("/", updateCoin);
router.get("/page", pageDetails);
module.exports = router;
