const OmdbReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_START":
      return {
        omdb: [],
        isFetching: true,
        error: false,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        omdb: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        omdb: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_MOVIES_SUCCESS":
      return {
        omdb: [...state.omdb, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_MOVIES_SUCCESS":
      return {
        omdb: state.omdb.filter((movie) => {
          return movie._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_MOVIES_FAILURE":
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
export default OmdbReducer;
