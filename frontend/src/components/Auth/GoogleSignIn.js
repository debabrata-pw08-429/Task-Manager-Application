import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseGoogleAuth";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../utils/api";

const GoogleSignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      let name = result.user.displayName;
      let email = result.user.email;
      let password = result.user.providerId;

      try {
        await axios.post(`${config.backendpoint}/users/register`, {
          name,
          email,
          password,
        });

        await login(email, password);

        navigate("/");
      } catch (error) {
        console.error("Failed to login", error);
      }
    });
  };

  return (
    <div onClick={handleGoogleSignIn}>
      <button>GoogleSignIn</button>
    </div>
  );
};

export default GoogleSignIn;
