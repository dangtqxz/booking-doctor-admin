import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  //const isAuthenticated = true;
  const isAuthenticated = !!localStorage.getItem("userName");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("userName");
  return isAuthenticated ? <Navigate to="/admindashboard" /> : element;
};

export { PrivateRoute, PublicRoute };