import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// CSS
import "./reset.css"; // reset CSS
import { ThemeProvider } from "styled-components"; // Theme

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#222",
};

const lightTheme = {
  textColor: "#222",
  backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
