import { useReducer, createContext } from "react";
import BigPictureReducer from "./listReducer";
const INITIAL_STATE = {
  companies: [],
  isFetching: false,
  error: false,
};
export const BigPicturelistContext = createContext(INITIAL_STATE);

export const BigPicturelistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BigPictureReducer, INITIAL_STATE);
  return (
    <BigPicturelistContext.Provider
      value={{
        companies: state.companies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </BigPicturelistContext.Provider>
  );
};
