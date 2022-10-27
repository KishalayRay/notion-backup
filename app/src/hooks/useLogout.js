import React, { useContext } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth, auth } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.clear();
    try {
      await axios.get("/auth/logout");
      console.log(auth);
    } catch (e) {
      console.log(e);
    }
  };
  return logout;
};

export default useLogout;
