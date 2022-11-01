const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createStock,
  getStocks,
  deleteStock,
  updateStock,
  pageDetails,
} = require("../../controllers/dataApiControllers/stockDataApiController");
const stockDataMiddleware = require("../../middlewares/dataApiMiddlewares/stockDataMiddleware");

router.post("/newstock", verify, stockDataMiddleware, createStock);
router.get("/stocks", verify, getStocks);
router.put("/:id", verify, deleteStock);
router.get("/", updateStock);
router.get("/page", pageDetails);
module.exports = router;
