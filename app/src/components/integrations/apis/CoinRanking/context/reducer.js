const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_COINS":
      return {
        ...state,
        isLoading: false,
        coins: action.payload.coins,
      };
    case "ADD_COIN":
      return {
        ...state,
        coins: state.coins.filter((coin) => {
          return coin.id !== action.payload;
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
