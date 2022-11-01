const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createOmdb,
  getOmdbs,
  deleteOmdb,
} = require("../../controllers/dataApiControllers/omdbApiController");
const omdbMiddleware = require("../../middlewares/dataApiMiddlewares/omdbMiddleware");

router.post("/newomdb", verify, omdbMiddleware, createOmdb);
router.get("/omdbs", verify, getOmdbs);
router.put("/:id", verify, deleteOmdb);
module.exports = router;
