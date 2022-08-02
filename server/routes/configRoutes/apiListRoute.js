const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createApi,
  getApi,
  getProApi,
  getSingleApi,
  updateApi,
  deleteApi,
} = require("../../controllers/configControllers/apiListController");

router.post("/", verify, createApi);
router.get("/", verify, getApi);
router.get("/pro", verify, getProApi);
router.get("/:id", verify, getSingleApi);
router.put("/:id", verify, updateApi);
router.delete("/:id", verify, deleteApi);

module.exports = router;
