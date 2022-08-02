import { useReducer, createContext } from "react";
import GooglebookReducer from "./listReducer";
const INITIAL_STATE = {
  book: [],
  isFetching: false,
  error: false,
};
export const GooglebookslistContext = createContext(INITIAL_STATE);

export const GooglebookslistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GooglebookReducer, INITIAL_STATE);
  return (
    <GooglebookslistContext.Provider
      value={{
        book: state.book,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </GooglebookslistContext.Provider>
  );
};
