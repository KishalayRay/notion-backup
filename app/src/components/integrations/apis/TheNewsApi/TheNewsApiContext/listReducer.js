const TheNewsApiReducer = (state, action) => {
  switch (action.type) {
    case "GET_NEWS_START":
      return {
        news: [],
        isFetching: true,
        error: false,
      };
    case "GET_NEWS_SUCCESS":
      return {
        news: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_NEWS_FAILURE":
      return {
        news: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_NEWS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_NEWS_SUCCESS":
      return {
        news: [...state.news, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_NEWS_FAILURE":
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
export default TheNewsApiReducer;
