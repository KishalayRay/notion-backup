const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_RECIPES":
      return {
        ...state,
        isLoading: false,
        recipes: action.payload.recipes,
      };
    case "ADD_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => {
          return recipe.id !== action.payload;
        }),
      };
    case "SET_SEARCH":
      return {
        ...state,
        query: action.payload,
        isLoading: true,
      };
    default:
      return { ...state };
  }
};
export default Reducer;
