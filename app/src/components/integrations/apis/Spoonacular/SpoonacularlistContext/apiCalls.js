import axios from "axios";
import cryptoJS from "crypto-js";

import {
  getRecipeStart,
  getRecipeFailure,
  getRecipeSuccess,
  deleteRecipeStart,
  deleteRecipeFailure,
  deleteRecipeSuccess,
  createRecipeStart,
  createRecipeSuccess,
  createRecipeFailure,
} from "./listActions";
export const GetRecipes = async (axiosPrivate, dispatch, pageId) => {
  dispatch(getRecipeStart);
  try {
    const response = await axiosPrivate.get(
      `/spoonacular/recipes?page=${pageId}`
    );

    dispatch(
      getRecipeSuccess(response.data.data.recipes, response.data.data.pageCount)
    );
    console.log(response.data.data.recipes);
  } catch (e) {
    dispatch(getRecipeFailure);
  }
};
export const CreateRecipe = async (recipeId, axiosPrivate, dispatch) => {
  dispatch(createRecipeStart);
  console.log(recipeId);
  try {
    const res = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Spoonacular",
    });
    const apiKey = res.data.data.ApiKey.keys[0].key;

    const information = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=false`
    );
    const ingreArray = information.data.extendedIngredients.map((ingre) => {
      return ingre.name;
    });
    const nutritions = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`
    );

    const recipeObject = {
      recipeId: information.data.id,
      recipeName: information.data.title,
      recipeImage: information.data.image,
      instructions: information.data.instructions,
      recipeIngredients: ingreArray,
      fat: parseFloat(nutritions.data.fat),
      carb: parseFloat(nutritions.data.carbs),
      calories: parseFloat(nutritions.data.calories),
      protein: parseFloat(nutritions.data.protein),
    };

    const postData = await axiosPrivate.post(`/spoonacular/newrecipe`, {
      recipeId: information.data.id,
      recipeName: information.data.title,
      recipeImage: information.data.image,
      instructions: information.data.instructions,
      recipeIngredients: ingreArray,
      fat: parseFloat(nutritions.data.fat),
      carb: parseFloat(nutritions.data.carbs),
      calories: parseFloat(nutritions.data.calories),
      protein: parseFloat(nutritions.data.protein),
    });
    console.log(postData.data);
    console.log(recipeObject);
    dispatch(createRecipeSuccess(recipeObject));
  } catch (e) {
    console.log(e);
    dispatch(createRecipeFailure);
  }
};

export const DeleteRecipe = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteRecipeStart);

  try {
    await axiosPrivate.put(`/spoonacular/${id}`, {});

    dispatch(deleteRecipeSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteRecipeFailure);
  }
};
