import { useReducer, createContext } from "react";
import TriposoReducer from "./listReducer";
const INITIAL_STATE = {
  trips: [],
  isFetching: false,
  error: false,
};
export const TriposolistContext = createContext(INITIAL_STATE);

export const TriposolistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TriposoReducer, INITIAL_STATE);
  return (
    <TriposolistContext.Provider
      value={{
        trips: state.trips,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </TriposolistContext.Provider>
  );
};
