import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Contexts/AuthContext";
import Loader from "../Components/Loader";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader label="Checking authentication..." />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default RequireAuth;
