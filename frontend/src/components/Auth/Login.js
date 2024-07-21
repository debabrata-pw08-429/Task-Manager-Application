import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import GoogleSignIn from "./GoogleSignIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      navigate("/");
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <>
      <Header />

      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>

      <GoogleSignIn />
    </>
  );
};

export default Login;
