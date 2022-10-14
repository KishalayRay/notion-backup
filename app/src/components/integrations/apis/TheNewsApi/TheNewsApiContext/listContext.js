import { useReducer, createContext } from "react";
import TheNewsApiReducer from "./listReducer";
const INITIAL_STATE = {
  news: [],
  isFetching: false,
  error: false,
};
export const TheNewsApiContext = createContext(INITIAL_STATE);

export const TheNewsApiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TheNewsApiReducer, INITIAL_STATE);
  return (
    <TheNewsApiContext.Provider
      value={{
        news: state.news,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TheNewsApiContext.Provider>
  );
};
