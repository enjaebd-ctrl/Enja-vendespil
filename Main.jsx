import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Vi henter de to CSS-filer her i stedet for i index.html
import "./css/reset.css";
import "./css/main.css";

// Finder div'en med id="root" og viser App-komponenten i den
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);