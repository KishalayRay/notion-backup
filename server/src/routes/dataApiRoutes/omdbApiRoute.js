const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createOmdb,
  getOmdbs,
  deleteOmdb,
} = require("../../controllers/dataApiControllers/omdbApiController");

router.post("/newomdb", verify, createOmdb);
router.get("/omdbs", verify, getOmdbs);
router.put("/:id", verify, deleteOmdb);
module.exports = router;
