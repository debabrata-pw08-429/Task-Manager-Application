import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { config } from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the current user
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Check if a token exists in local storage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      // Make a request to get user data if token is present
      axios
        .get(`${config.backendpoint}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data)) // Update user state with response data
        .catch(() => localStorage.removeItem("token")); // Remove token if request fails
    }
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    const toastId = toast.loading("Logging...");

    try {
      // Make a request to authenticate the user
      const response = await axios.post(`${config.backendpoint}/users/login`, {
        email,
        password,
      });

      if (response) {
        toast.dismiss(toastId);
        toast.success(`Welcome Back! ${response.data.user.name}`);
      }

      // Store token and provider ID in local storage
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("providerId", password);

      // Update user state with response data
      setUser(response?.data?.user);
    } catch (error) {
      // Log error message if login fails
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
      console.error(error.response.data.message);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const providerId = localStorage.getItem("providerId");

      // If the provider is Firebase, make a request to delete the user
      if (providerId === "firebase") {
        await axios.delete(`${config.backendpoint}/users/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Clear local storage and update state
      localStorage.clear();
      setUser(null);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      // Log error message if logout fails
      console.error("Logout failed", error);
    }
  };

  // Provide authentication context to children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
