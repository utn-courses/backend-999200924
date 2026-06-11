// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser } from "../services/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode(storedToken);
      setUser({ id: decoded.id, username: decoded.username, email: decoded.email });
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data.success) {
      const receivedToken = data.data.token;
      localStorage.setItem("authToken", receivedToken);
      setToken(receivedToken);

      const decoded = jwtDecode(receivedToken);
      setUser({ id: decoded.id, username: decoded.username, email: decoded.email });
      return data
    } else {
      alert(data.error);
    }
  };

  const register = async (username, email, password) => {
    const data = await registerUser(username, email, password);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
