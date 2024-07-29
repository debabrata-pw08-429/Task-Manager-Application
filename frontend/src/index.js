import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
          <Toaster position="top-center" reverseOrder={false} />
        </DndProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
