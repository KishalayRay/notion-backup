const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createBook,
  getBooks,
  deleteBook,
} = require("../../controllers/dataApiControllers/googlebooksApiController");

router.post("/newbook", verify, createBook);
router.get("/books", verify, getBooks);
router.put("/:id", verify, deleteBook);
module.exports = router;
