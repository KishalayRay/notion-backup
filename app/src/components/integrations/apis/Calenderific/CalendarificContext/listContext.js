import { useReducer, createContext } from "react";
import CalendarificReducer from "./listReducer";
const INITIAL_STATE = {
  holiday: [],
  isFetching: false,
  error: false,
};
export const CalendarificContext = createContext(INITIAL_STATE);

export const CalendarificContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CalendarificReducer, INITIAL_STATE);
  return (
    <CalendarificContext.Provider
      value={{
        holiday: state.holiday,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CalendarificContext.Provider>
  );
};
