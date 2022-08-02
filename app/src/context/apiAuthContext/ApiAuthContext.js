import { createContext, useReducer } from "react";
import ApiAuthReducer from "./ApiAuthReducer";

const INITIAL_STATE = {
  apiAuth: null,
  isFetching: false,
  error: false,
};
export const ApiAuthContext = createContext(INITIAL_STATE);

export const ApiAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ApiAuthReducer, INITIAL_STATE);
  return (
    <ApiAuthContext.Provider
      value={{
        apiAuth: state.apiAuth,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ApiAuthContext.Provider>
  );
};
