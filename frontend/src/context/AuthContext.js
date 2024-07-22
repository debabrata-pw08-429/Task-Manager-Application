import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${config.backendpoint}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${config.backendpoint}/users/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response?.data?.token);
      // Store provider ID in local storage
      localStorage.setItem("providerId", password);
      setUser(response?.data?.user);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const providerId = localStorage.getItem("providerId");

      if (providerId === "firebase") {
        // Make a delete request for the user
        await axios.delete(`${config.backendpoint}/users/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Clear local storage and state
      localStorage.clear();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      // Optionally handle logout error (e.g., show a notification)
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
