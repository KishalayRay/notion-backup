import { useReducer, createContext } from "react";
import CoinRankingReducer from "./listReducer";
const INITIAL_STATE = {
  coins: [],
  isFetching: false,
  error: false,
};
export const CoinRankinglistContext = createContext(INITIAL_STATE);

export const CoinRankinglistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CoinRankingReducer, INITIAL_STATE);
  return (
    <CoinRankinglistContext.Provider
      value={{
        coins: state.coins,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CoinRankinglistContext.Provider>
  );
};
