import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ isAdminRoute, children }) => {
  const { user } = useContext(UserContext);

  if (isAdminRoute && !user.isAdmin) {
    return <Navigate to="/profilePage" />;
  }

  return children;  
};

export default ProtectedRoute;
