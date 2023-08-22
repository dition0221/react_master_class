import React from "react";
import ReactDOM from "react-dom/client";
// CSS
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
// Components
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

/*
/ -> All Coins
/:id -> /btc -> Coin Detail

/btc/information
/btc/chart
*/
