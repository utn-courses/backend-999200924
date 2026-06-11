// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>

        {user ? (
          <>
            <Link to="/mi-perfil">Mi Perfil</Link>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/registrate">Registrate</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export { Header };
