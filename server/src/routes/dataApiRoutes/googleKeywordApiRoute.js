const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createKeyword,
  getKeywords,
  deleteKeyword,
} = require("../../controllers/dataApiControllers/googleKeywordsApiController");

router.post("/newkeyword", verify, createKeyword);
router.get("/keywords", verify, getKeywords);
router.put("/:id", verify, deleteKeyword);
module.exports = router;
