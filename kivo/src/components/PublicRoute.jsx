// src/components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    // Si ya hay usuario logueado, redirige al perfil
    return <Navigate to="/mi-perfil" replace />;
  }

  return children;
};

export { PublicRoute };
