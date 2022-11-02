import { useReducer, createContext } from "react";
import OmdbReducer from "./listReducer";
const INITIAL_STATE = {
  omdb: [],
  pageId: 1,
  pageCount: 0,
  isFetching: false,
  error: "",
  addMovieclicked: false,
};
export const OmdblistContext = createContext(INITIAL_STATE);

export const OmdblistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OmdbReducer, INITIAL_STATE);
  const prevPage = () => {
    console.log(state.pageId + 1, "ppageId");
    dispatch({
      type: "PREV_PAGE",
    });
  };
  const nextPage = () => {
    console.log(state.pageId + 1, state.pageCount, "ppageId");

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
        addMovieclicked: state.addMovieclicked,
        nextPage,
        prevPage,
        dispatch,
      }}
    >
      {children}
    </OmdblistContext.Provider>
  );
};
