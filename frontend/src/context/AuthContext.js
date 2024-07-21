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
    const response = await axios.post(`${config.backendpoint}/users/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
