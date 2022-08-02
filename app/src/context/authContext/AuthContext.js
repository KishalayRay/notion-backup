import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";
import { isExpired } from "react-jwt";

const INITIAL_STATE = {
  user:
    JSON.parse(localStorage.getItem("user")) !== null
      ? isExpired(JSON.parse(localStorage.getItem("user")).accessToken)
        ? null
        : JSON.parse(localStorage.getItem("user"))
      : null,
  isFetching: false,
  errors: null,
};
export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("user")) !== null) {
  //     if (isExpired(JSON.parse(localStorage.getItem("user")).accessToken)) {
  //       dispatch(logout());
  //     }
  //   }
  // });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  console.log(state.user);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        errors: state.errors,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
