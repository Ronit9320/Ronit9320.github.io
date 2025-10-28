import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

console.log("main.tsx is executing");
console.log("Looking for root element:", document.getElementById("root"));

try {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Root element not found, creating fallback element");
    const fallback = document.createElement("div");
    fallback.id = "root";
    document.body.appendChild(fallback);
    createRoot(fallback).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } else {
    console.log("Root element found, rendering app");
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
} catch (error) {
  console.error("Error rendering React app:", error);

  const fallbackError = document.createElement("div");
  fallbackError.style.padding = "20px";
  fallbackError.style.margin = "20px";
  fallbackError.style.backgroundColor = "#ffdddd";
  fallbackError.style.border = "1px solid #ff6666";
  fallbackError.style.borderRadius = "5px";
  fallbackError.innerHTML = `
    <h2>Error rendering application</h2>
    <p>${error instanceof Error ? error.message : String(error)}</p>
    <p><a href="./debug.html">Go to debug page</a></p>
  `;
  document.body.appendChild(fallbackError);
}
