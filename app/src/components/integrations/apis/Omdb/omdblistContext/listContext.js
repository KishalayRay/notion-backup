import { useReducer, createContext } from "react";
import OmdbReducer from "./listReducer";
const INITIAL_STATE = {
  omdb: [],
  isFetching: false,
  error: false,
};
export const OmdblistContext = createContext(INITIAL_STATE);

export const OmdblistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OmdbReducer, INITIAL_STATE);
  return (
    <OmdblistContext.Provider
      value={{
        omdb: state.omdb,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </OmdblistContext.Provider>
  );
};
