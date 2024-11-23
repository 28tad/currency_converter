import React from "react";
import ReactDOM from "react-dom/client";
import { Test } from "./Comps/Test";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);