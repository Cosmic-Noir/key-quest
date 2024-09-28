import React from "react";
import ReactDOM from "react-dom/client";
import App from "./key-quest/src/App";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  }
});