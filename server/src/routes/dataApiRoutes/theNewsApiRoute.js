const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createNews,
  getNews,
  createCountry,
  updateNews,
  pageDetails,
  createNextNews,
} = require("../../controllers/dataApiControllers/theNewsApiController");

router.post("/country", verify, createCountry);
router.post("/newnews", verify, createNews);
router.get("/news", verify, getNews);
// router.get("/", updateNews);
// router.get("/page", pageDetails);
// router.get("/nextNews", createNextNews);
module.exports = router;
