import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseGoogleAuth";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleIcon from "@mui/icons-material/Google";
import { config } from "../../utils/api";

/**
 * Component for Google Sign-In functionality.
 * Utilizes Firebase authentication to handle sign-in with Google and
 * registers the user with the backend if the sign-in is successful.
 */
const GoogleSignIn = () => {
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate(); // Hook to programmatically navigate

  /**
   * Handles Google sign-in process.
   * - Uses Firebase Auth to sign in with a Google popup.
   * - On success, registers the user with the backend and logs them in.
   * - Navigates to the home page upon successful login.
   */
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL, providerId } = result.user;

      // Register the user with the backend
      await axios.post(`${config.backendpoint}/users/register`, {
        name: displayName,
        email,
        password: providerId, // Using providerId as a placeholder password
        photoUrl: photoURL,
      });

      // Log the user in
      await login(email, providerId);

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Failed to login", error?.response?.data?.message || error);
    }
  };

  return (
    <div onClick={handleGoogleSignIn}>
      <button
        style={{
          backgroundColor: "#1976d3",
          color: "whitesmoke",
          border: "none",
          padding: "8px",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <GoogleIcon />
        Sign-In with Google
      </button>
    </div>
  );
};

export default GoogleSignIn;
