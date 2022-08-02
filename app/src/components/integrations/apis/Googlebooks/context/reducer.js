const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_BOOKS":
      return {
        ...state,
        isLoading: false,
        books: action.payload.books,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => {
          return book.id !== action.payload;
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
