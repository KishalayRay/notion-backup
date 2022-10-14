export const getRecipeStart = () => ({
  type: "GET_RECIPE_START",
});
export const getRecipeSuccess = (recipe) => ({
  type: "GET_RECIPE_SUCCESS",
  payload: recipe,
});
export const getRecipeFailure = () => ({
  type: "GET_RECIPE_FAILURE",
});

export const createRecipeStart = () => ({
  type: "CREATE_RECIPE_START",
});

export const createRecipeSuccess = (recipe) => ({
  type: "CREATE_RECIPE_SUCCESS",
  payload: recipe,
});
export const createRecipeFailure = () => ({
  type: "CREATE_RECIPE_FAILURE",
});

export const deleteRecipeStart = () => ({
  type: "DELETE_RECIPE_START",
});

export const deleteRecipeSuccess = (id) => ({
  type: "DELETE_RECIPE_SUCCESS",
  payload: id,
});
export const deleteRecipeFailure = () => ({
  type: "DELETE_RECIPE_FAILURE",
});
