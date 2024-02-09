import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ServerStatusProvider} from "./contexts/ServerStatusContext";
import {ThemeProvider} from "./contexts/ThemeContext";
import CssBaseline from "@mui/material/CssBaseline";
import {PageProvider} from "./contexts/PageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <ServerStatusProvider>
        <PageProvider>
          <App/>
        </PageProvider>
      </ServerStatusProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
