import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"))
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  if (token !== null) return <div>{children}</div>;
  else return <Navigate to="/" />;
};

export default PrivateRoute;
