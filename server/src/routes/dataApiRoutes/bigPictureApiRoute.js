const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createCompany,
  getCompanies,
  deleteCompany,
} = require("../../controllers/dataApiControllers/bigPictureApiController");

router.post("/newcompany", verify, createCompany);
router.get("/companies", verify, getCompanies);
router.put("/:id", verify, deleteCompany);
module.exports = router;
