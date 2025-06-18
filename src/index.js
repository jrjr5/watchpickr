import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthWrapper from "./AuthWrapper";

// ✅ Suppress MetaMask extension errors in development
if (process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args[0];
    if (
      typeof message === "string" &&
      message.includes("Cannot read properties of null (reading 'type')") &&
      message.includes("chrome-extension://egjidjbpglichdcondbcbdnbeeppgdph")
    ) {
      return; // Ignore MetaMask dev injection bug
    }
    originalConsoleError(...args);
  };
}

// ✅ Mount the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthWrapper />
  </React.StrictMode>
);

