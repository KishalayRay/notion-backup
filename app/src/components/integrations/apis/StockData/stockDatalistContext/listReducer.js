const StockDataReducer = (state, action) => {
  switch (action.type) {
    case "GET_STOCK_START":
      return {
        stockData: [],
        isFetching: true,
        error: false,
      };
    case "GET_STOCK_SUCCESS":
      return {
        stockData: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_STOCK_FAILURE":
      return {
        stockData: [],
        isFetching: false,
        error: true,
      };
    case "CREATE_STOCK_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_STOCK_SUCCESS":
      return {
        stockData: [...state.stockData, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_STOCK_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case "DELETE_STOCK_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_STOCK_SUCCESS":
      return {
        stockData: state.stockData.filter((stock) => {
          return stock._id !== action.payload;
        }),
        isFetching: false,
        error: false,
      };
    case "DELETE_STOCK_FAILURE":
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
export default StockDataReducer;
