import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import AppProviders from "./app/providers";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/flights.css";
import "./styles/reservations.css";
import "./styles/checkin.css";
import "./styles/profile.css";
import "./styles/admin.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
