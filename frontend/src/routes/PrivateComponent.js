import { Navigate } from "react-router-dom";

const PrivateComponent = ({ element: Component }) => {
  // Get the token from local storage
  let token = localStorage.getItem("token");

  // Render the component if token exists, otherwise redirect to login
  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateComponent;
