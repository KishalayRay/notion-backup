const express = require("express");
const verify = require("../../middlewares/verifyToken");
const { body } = require("express-validator");
const router = express.Router();
const {
  createApiConfig,
  getApiConfig,
  deleteApiConfig,
} = require("../../controllers/configControllers/apiConfigController");

const apiKeyMiddleware = require("../../middlewares/apiKeyMiddleware/apiKey");
router.post(
  "/newkey",
  body("key").not().isEmpty().withMessage("API required required"),
  verify,
  createApiConfig
);
router.post("/key", verify, getApiConfig);
router.post("/", verify, deleteApiConfig);
module.exports = router;
