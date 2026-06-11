// src/routes/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Si no hay usuario logueado, redirige a /login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { PrivateRoute };