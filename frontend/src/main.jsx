import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 2000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
createRoot(document.getElementById("root")).render(
  <AlertProvider template={AlertTemplate} {...options}>
    <StrictMode>
      <App />
    </StrictMode>
  </AlertProvider>
);
