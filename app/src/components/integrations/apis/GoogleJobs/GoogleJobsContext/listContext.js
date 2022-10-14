import { useReducer, createContext } from "react";
import GoogleJobsReducer from "./listReducer";
const INITIAL_STATE = {
  jobs: [],
  isFetching: false,
  error: false,
};
export const GoogleJobsContext = createContext(INITIAL_STATE);

export const GoogleJobsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GoogleJobsReducer, INITIAL_STATE);
  return (
    <GoogleJobsContext.Provider
      value={{
        jobs: state.jobs,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </GoogleJobsContext.Provider>
  );
};
