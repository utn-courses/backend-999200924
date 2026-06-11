const API_BASE = "http://localhost:3001"

// src/services/authApi.js
export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error en login:", err);
    return { success: false, error: "Error en la conexión" };
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error en registro:", err);
    return { success: false, error: "Error en la conexión" };
  }
};
