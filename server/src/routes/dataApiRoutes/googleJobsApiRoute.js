const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createJob,
  getJobs,
  deleteJob,
} = require("../../controllers/dataApiControllers/googleJobsApiController");

router.post("/newjob", verify, createJob);
router.get("/jobs", verify, getJobs);
router.put("/:id", verify, deleteJob);
module.exports = router;
