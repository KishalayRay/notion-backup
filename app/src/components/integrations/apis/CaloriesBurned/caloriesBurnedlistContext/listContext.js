import { useReducer, createContext } from "react";
import CaloriesBurnedReducer from "./listReducer";
const INITIAL_STATE = {
  activity: [],
  pageId: 1,
  pageCount: 0,
  isFetching: false,
  error: false,
};
export const CaloriesBurnedlistContext = createContext(INITIAL_STATE);

export const CaloriesBurnedlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CaloriesBurnedReducer, INITIAL_STATE);
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
    <CaloriesBurnedlistContext.Provider
      value={{
        activity: state.activity,
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
    </CaloriesBurnedlistContext.Provider>
  );
};
