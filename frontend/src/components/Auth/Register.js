import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { config } from "../../utils/api";
import Header from "../Layout/Header";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.backendpoint}/users/register`, {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button type="submit">Register</Button>
      </form>
    </>
  );
};

export default Register;
