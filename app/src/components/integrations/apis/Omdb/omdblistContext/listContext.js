import { useReducer, createContext } from "react";
import OmdbReducer from "./listReducer";
const INITIAL_STATE = {
  omdb: [],
  pageId: 1,
  pageCount: 0,
  isFetching: false,
  error: "",
};
export const OmdblistContext = createContext(INITIAL_STATE);

export const OmdblistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OmdbReducer, INITIAL_STATE);
  const prevPage = () => {
    dispatch({
      type: "PREV_PAGE",
    });
  };
  const nextPage = () => {
    dispatch({
      type: "NEXT_PAGE",
    });
  };
  return (
    <OmdblistContext.Provider
      value={{
        omdb: state.omdb,
        isFetching: state.isFetching,
        pageId: state.pageId,
        pageCount: state.pageCount,
        error: state.error,
        nextPage,
        prevPage,
        dispatch,
      }}
    >
      {children}
    </OmdblistContext.Provider>
  );
};
