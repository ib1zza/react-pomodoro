import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import TimerContextProvider from "@/context/TimerContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TimerContextProvider>
      <App />
    </TimerContextProvider>
  </React.StrictMode>
);
