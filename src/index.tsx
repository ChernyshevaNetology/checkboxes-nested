import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CheckboxContextProvider } from "./context/Context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CheckboxContextProvider>
      <App />
    </CheckboxContextProvider>
  </React.StrictMode>,
);
