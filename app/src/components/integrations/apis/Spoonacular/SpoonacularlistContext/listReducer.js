const recipesReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECIPE_START":
      return {
        recipes: [],
        isFetching: true,
        error: false,
      };
    case "GET_RECIPE_SUCCESS":
      return {
        recipes: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_RECIPE_FAILURE":
      return {
        recipes: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_RECIPE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_RECIPE_SUCCESS":
      return {
        recipes: [...state.recipes, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_RECIPE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_RECIPE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_RECIPE_SUCCESS":
      return {
        recipes: state.recipes.filter((recipe) => {
          return recipe._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_RECIPE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
export default recipesReducer;
