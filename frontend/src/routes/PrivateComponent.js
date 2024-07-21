import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

const PrivateComponent = ({ element: Component }) => {
  // const { user } = useContext(AuthContext);
  let token = localStorage.getItem("token");

  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateComponent;
