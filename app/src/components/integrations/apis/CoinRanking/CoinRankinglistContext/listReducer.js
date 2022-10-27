const CoinRankingReducer = (state, action) => {
  switch (action.type) {
    case "GET_COIN_START":
      return {
        coins: [],
        isFetching: true,
        error: false,
      };
    case "GET_COIN_SUCCESS":
      return {
        coins: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_COIN_FAILURE":
      return {
        coins: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_COIN_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_COIN_SUCCESS":
      return {
        coins: [...state.coins, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_COIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_COIN_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_COIN_SUCCESS":
      return {
        coins: state.coins.filter((coin) => {
          return coin._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_COIN_FAILURE":
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
export default CoinRankingReducer;
