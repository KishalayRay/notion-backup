const express = require("express");
const verify = require("../../middlewares/verifyToken");
const router = express.Router();
const {
  createRecipe,
  getRecipes,
  deleteRecipe,
} = require("../../controllers/dataApiControllers/spoonacularApiController");
const spoonacularMiddleware = require("../../middlewares/dataApiMiddlewares/spoonacularMiddleware");

router.post("/newrecipe", verify, spoonacularMiddleware, createRecipe);
router.get("/recipes", verify, getRecipes);
router.put("/:id", verify, deleteRecipe);
module.exports = router;
