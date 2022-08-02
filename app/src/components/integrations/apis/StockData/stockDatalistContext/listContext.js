import { useReducer, createContext } from "react";
import StockDataReducer from "./listReducer";
const INITIAL_STATE = {
  stockData: [],
  isFetching: false,
  error: false,
};
export const StockDatalistContext = createContext(INITIAL_STATE);

export const StockDatalistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StockDataReducer, INITIAL_STATE);
  return (
    <StockDatalistContext.Provider
      value={{
        stockData: state.stockData,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </StockDatalistContext.Provider>
  );
};
