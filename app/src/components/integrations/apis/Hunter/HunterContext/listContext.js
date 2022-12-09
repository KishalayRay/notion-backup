import { useReducer, createContext } from "react";
import HunterReducer from "./listReducer";
const INITIAL_STATE = {
  leads: [],
  isFetching: false,
  error: false,
};
export const HunterlistContext = createContext(INITIAL_STATE);

export const HunterlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HunterReducer, INITIAL_STATE);
  return (
    <HunterlistContext.Provider
      value={{
        leads: state.leads,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </HunterlistContext.Provider>
  );
};
