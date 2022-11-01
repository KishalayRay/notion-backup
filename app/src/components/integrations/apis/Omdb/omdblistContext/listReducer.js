const OmdbReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        omdb: action.payload.omdb,
        pageCount: action.payload.pageCount,
        isFetching: false,
        error: "",
      };
    case "GET_MOVIES_FAILURE":
      return {
        ...state,
        omdb: [],
        isFetching: false,
        error: "",
      };
    case "CREATE_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case "CREATE_MOVIES_SUCCESS":
      return {
        ...state,
        omdb: [action.payload, ...state.omdb],
        isFetching: false,
        error: "",
      };
    case "CREATE_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case "DELETE_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case "DELETE_MOVIES_SUCCESS":
      return {
        ...state,
        omdb: state.omdb.filter((movie) => {
          return movie._id !== action.payload;
        }),
        isFetching: false,
        error: "",
      };
    case "DELETE_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: "",
      };
    case "NEXT_PAGE":
      // let page = state.pageId + 1;
      // if (page >= state.pageCount) {
      //   page = 1;
      // }
      return {
        ...state,
        pageId: state.pageId + 1,
      };

    case "PREV_PAGE":
      // let page = state.pageId - 1;
      // if (page <= 1) {
      //   page = 1;
      // }
      return {
        ...state,
        pageId: state.pageId - 1,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
export default OmdbReducer;
