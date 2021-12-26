import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";

import "./index.css";

render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
