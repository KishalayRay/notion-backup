import { useReducer, createContext } from "react";
import GoogleKeywordReducer from "./listReducer";
const INITIAL_STATE = {
  keywords: [],
  isFetching: false,
  error: false,
};
export const GoogleKeywordContext = createContext(INITIAL_STATE);

export const GoogleKeywordContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GoogleKeywordReducer, INITIAL_STATE);
  return (
    <GoogleKeywordContext.Provider
      value={{
        keywords: state.keywords,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </GoogleKeywordContext.Provider>
  );
};
