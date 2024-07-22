import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import GoogleSignIn from "./GoogleSignIn";

/**
 * Login component allows users to log in using email/password or Google authentication.
 *
 * @component
 */
const Login = () => {
  const [email, setEmail] = useState(""); // State to manage email input
  const [password, setPassword] = useState(""); // State to manage password input
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate(); // Hook to programmatically navigate

  /**
   * Handles form submission for email/password login.
   *
   * @param {Object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to home page on successful login
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <>
      <Header />
      <Grid
        container
        component="main"
        sx={{ height: "90vh" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={11} sm={8} md={5} sx={{ padding: "18px" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: "#1976d3",
              fontWeight: "bold",
              paddingLeft: "30px",
              marginBottom: "-50px",
            }}
          >
            Login
          </Typography>
          <Box
            component={Paper}
            elevation={3}
            sx={{
              my: 8,
              mx: 4,
              padding: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "3px solid #1976d3",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }} // Add margin bottom for spacing
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
            <Grid container justifyContent="center">
              <Grid item>
                Don't have an account?{" "}
                <Link href="/register" variant="body2" sx={{ mx: "5px" }}>
                  Signup
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <GoogleSignIn />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
