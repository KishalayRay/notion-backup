const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_MOVIES":
      return {
        ...state,
        isLoading: false,
        movies: action.payload.movies,
        query: "",
      };
    case "ADD_MOVIE":
      return {
        ...state,
        query: "",
        movies: state.movies.filter((movie) => {
          return movie.imdbID !== action.payload;
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
