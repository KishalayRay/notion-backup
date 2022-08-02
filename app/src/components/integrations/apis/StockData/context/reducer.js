const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_STOCKS":
      return {
        ...state,
        isLoading: false,
        stocks: action.payload.stocks,
      };
    case "ADD_STOCK":
      return {
        ...state,
        stocks: state.stocks.filter((stock) => {
          return stock["1. symbol"] !== action.payload;
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
