const express = require("express");
const verify = require("../../middlewares/verifyToken");
const { body } = require("express-validator");
const router = express.Router();
const {
  createNotionConfig,
  getNotionConfig,
  deleteNotionConfig,
  getAllNotionConfig,
} = require("../../controllers/configControllers/notionConfigController");

router.post(
  "/newauth",
  body("databaseId").not().isEmpty().withMessage("Database ID required"),
  body("apiKey").not().isEmpty().withMessage("Notion Secret Key required"),
  verify,
  createNotionConfig
);
router.post("/auth", verify, getNotionConfig);
router.get("/allauth", verify, getAllNotionConfig);
router.post("/", verify, deleteNotionConfig);
module.exports = router;
