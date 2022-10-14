import { useReducer, createContext } from "react";
import HunterReducer from "./listReducer";
const INITIAL_STATE = {
  leads: [],
  isFetching: false,
  error: false,
};
export const HunterContext = createContext(INITIAL_STATE);

export const HunterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HunterReducer, INITIAL_STATE);
  return (
    <HunterContext.Provider
      value={{
        leads: state.leads,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </HunterContext.Provider>
  );
};
