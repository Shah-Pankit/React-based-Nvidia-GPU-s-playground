import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import your main CSS file for Tailwind
import App from "./app"; // Corrected: Capital 'A' for App.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
