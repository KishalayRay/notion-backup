import React, { useContext } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";
import {
  localstoragetrue,
  localstoragefalse,
} from "../localstoragereducer/localstoragereducer";
import { useDispatch, useSelector } from "react-redux";
const useLogout = () => {
  const { setAuth, auth } = useAuth();
  const dispatch = useDispatch();
  const logout = async () => {
    setAuth({});
    localStorage.clear();
    dispatch(localstoragefalse());
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
