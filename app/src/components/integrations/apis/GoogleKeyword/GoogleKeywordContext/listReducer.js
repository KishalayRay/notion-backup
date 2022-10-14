const GoogleKeywordReducer = (state, action) => {
  switch (action.type) {
    case "GET_KEYWORD_START":
      return {
        keywords: [],
        isFetching: true,
        error: false,
      };
    case "GET_KEYWORD_SUCCESS":
      return {
        keywords: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_KEYWORD_FAILURE":
      return {
        keywords: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_KEYWORD_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_KEYWORD_SUCCESS":
      return {
        keywords: [...state.keywords, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_KEYWORD_FAILURE":
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
export default GoogleKeywordReducer;
