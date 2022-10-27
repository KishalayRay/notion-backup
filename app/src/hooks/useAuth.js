import React, { useContext } from "react";
import { AuthContext } from "../context/authContext/AuthContext";
const useAuth = () => {
  return useContext(AuthContext);
};
//useAuth
export default useAuth;
