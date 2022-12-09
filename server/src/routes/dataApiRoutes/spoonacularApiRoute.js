const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createRecipe,
  getRecipes,
  deleteRecipe,
} = require("../../controllers/dataApiControllers/spoonacularApiController");

router.post("/newrecipe", verify, createRecipe);
router.get("/recipes", verify, getRecipes);
router.put("/:id", verify, deleteRecipe);
module.exports = router;
