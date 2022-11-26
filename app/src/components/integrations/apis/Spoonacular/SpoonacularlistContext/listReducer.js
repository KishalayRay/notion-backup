const SpoonacularReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECIPE_START":
      return {
        ...state,
        recipes: [],
        isFetching: true,
        error: false,
      };
    case "GET_RECIPE_SUCCESS":
      return {
        ...state,
        recipes: action.payload.recipes,
        pageCount: action.payload.pageCount,
        isFetching: false,
        error: false,
      };
    case "GET_RECIPE_FAILURE":
      return {
        ...state,
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
        ...state,
        recipes: [action.payload, ...state.recipes],
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
        ...state,
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
    case "NEXT_PAGE": {
      let page = state.pageId + 1;
      if (page > state.pageCount) {
        page = 1;
      }
      return {
        ...state,
        pageId: page,
      };
    }

    case "PREV_PAGE": {
      let page = state.pageId - 1;
      if (page < 1) {
        page = 1;
      }
      return {
        ...state,
        pageId: page,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default SpoonacularReducer;
