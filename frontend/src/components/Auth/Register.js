import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { config } from "../../utils/api";
import Header from "../Layout/Header";
import GoogleSignIn from "./GoogleSignIn";
import toast from "react-hot-toast";

/**
 * Register component allows users to create a new account with email and password.
 * Optionally includes Google sign-in functionality.
 *
 * @component
 */
const Register = () => {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Hook to programmatically navigate

  /**
   * Handles form submission for user registration.
   * Validates passwords and sends registration data to the backend.
   *
   * @param {Object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    // Prepare registration data
    const registrationData = {
      name: `${firstName} ${lastName}`,
      email,
      password,
    };

    const toastId = toast.loading("Registering new user...");

    try {
      // Send registration data to backend
      const response = await axios.post(
        `${config.backendpoint}/users/register`,
        registrationData
      );

      if (response.status === 201) {
        toast.dismiss(toastId);
        toast.success("Successfully Registered!");
      }

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
      console.error("Failed to register", error);
    }
  };

  return (
    <>
      <Header />
      <Grid
        container
        component="main"
        sx={{ height: "auto" }}
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
            Signup
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
              {/* First Name Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {/* Last Name Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {/* Email Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Confirm Password Field */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Signup
              </Button>
            </Box>
            <Grid container justifyContent="center">
              <Grid item>
                Already have an account?{" "}
                <Link href="/login" variant="body2" sx={{ mx: "5px" }}>
                  Login
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              {/* Optional: Include GoogleSignIn component if needed */}
              <GoogleSignIn />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
