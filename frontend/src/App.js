import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateComponent from "./routes/PrivateComponent";
import Register from "./components/Auth/Register";
import TaskBoard from "./components/Task/TaskBoard";
import Login from "./components/Auth/Login";

const App = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        exact
        path="/"
        element={<PrivateComponent element={TaskBoard} />}
      />
    </Routes>
  );
};

export default App;
