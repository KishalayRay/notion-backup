import { useReducer, createContext } from "react";
import SpoonacularReducer from "./listReducer";
const INITIAL_STATE = {
  recipes: [],
  isFetching: false,
  error: false,
};
export const SpoonacularlistContext = createContext(INITIAL_STATE);

export const SpoonacularlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SpoonacularReducer, INITIAL_STATE);
  return (
    <SpoonacularlistContext.Provider
      value={{
        recipes: state.recipes,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </SpoonacularlistContext.Provider>
  );
};
