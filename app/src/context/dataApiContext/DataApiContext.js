import { createContext, useReducer } from "react";
import DataApiReducer from "./DataApiReducer";

const INITIAL_STATE = {
  apiKey: null,
  isFetching: false,
  error: false,
};
export const DataApiContext = createContext(INITIAL_STATE);
export const DataApiContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataApiReducer, INITIAL_STATE);
  return (
    <DataApiContext.Provider
      value={{
        apiKey: state.apiKey,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </DataApiContext.Provider>
  );
};
