const GooglebookReducer = (state, action) => {
  switch (action.type) {
    case "GET_BOOKS_START":
      return {
        book: [],
        isFetching: true,
        error: false,
      };
    case "GET_BOOKS_SUCCESS":
      return {
        book: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_BOOKS_FAILURE":
      return {
        book: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_BOOKS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_BOOKS_SUCCESS":
      return {
        book: [...state.book, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_BOOKS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_BOOKS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_BOOKS_SUCCESS":
      return {
        book: state.book.filter((volume) => {
          return volume._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_BOOKS_FAILURE":
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
export default GooglebookReducer;
