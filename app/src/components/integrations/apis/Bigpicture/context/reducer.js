const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_COMPANIES":
      return {
        ...state,
        isLoading: false,
        companies: action.payload.companies,
      };
    case "ADD_COMPANY":
      return {
        ...state,
        companies: state.companies.filter((company, index) => {
          return index !== action.payload;
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
