const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createLead,
  getLeads,
  deleteLead,
} = require("../../controllers/dataApiControllers/hunterApiController");

router.post("/newlead", verify, createLead);
router.get("/leads", verify, getLeads);
router.put("/:id", verify, deleteLead);
module.exports = router;
