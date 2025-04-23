import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
