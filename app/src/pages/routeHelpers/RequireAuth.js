import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const RequireAuth = () => {
  const { auth } = useAuth();
  console.log(auth, auth?.accessToken, "requireAuth");
  const location = useLocation();
  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RequireAuth;
