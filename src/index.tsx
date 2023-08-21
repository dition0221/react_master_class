import React from "react";
import ReactDOM from "react-dom/client";
// CSS
// import "./reset.css"; // reset CSS
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";
// Router
import { RouterProvider } from "react-router-dom";
import router from "./screens/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
