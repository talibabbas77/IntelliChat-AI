import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if the token is present

  return isAuthenticated ? element : <Navigate to="/login" />; // Redirect to login page if not authenticated
};

export default PrivateRoute;
