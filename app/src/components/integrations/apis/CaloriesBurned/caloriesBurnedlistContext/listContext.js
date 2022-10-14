import { useReducer, createContext } from "react";
import CaloriesBurnedReducer from "./listReducer";
const INITIAL_STATE = {
  activity: [],
  isFetching: false,
  error: false,
};
export const CaloriesBurnedlistContext = createContext(INITIAL_STATE);

export const CaloriesBurnedlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CaloriesBurnedReducer, INITIAL_STATE);
  return (
    <CaloriesBurnedlistContext.Provider
      value={{
        activity: state.activity,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CaloriesBurnedlistContext.Provider>
  );
};
