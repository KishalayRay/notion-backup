import { useReducer, createContext } from "react";
import SpoonacularReducer from "./listReducer";
const INITIAL_STATE = {
  recipes: [],
  isFetching: false,
  pageId: 1,
  pageCount: 0,
  error: false,
};
export const SpoonacularlistContext = createContext(INITIAL_STATE);

export const SpoonacularlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SpoonacularReducer, INITIAL_STATE);
  const prevPage = () => {
    console.log(state.pageId);
    dispatch({
      type: "PREV_PAGE",
    });
  };
  const nextPage = () => {
    console.log(state.pageId);
    dispatch({
      type: "NEXT_PAGE",
    });
  };
  return (
    <SpoonacularlistContext.Provider
      value={{
        recipes: state.recipes,
        isFetching: state.isFetching,
        error: state.error,
        pageId: state.pageId,
        pageCount: state.pageCount,
        nextPage,
        prevPage,
        dispatch,
      }}
    >
      {children}
    </SpoonacularlistContext.Provider>
  );
};
