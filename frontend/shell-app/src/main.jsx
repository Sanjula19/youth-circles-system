import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import App from "./App.jsx";
import { appTheme } from "./styles/theme";

import "antd/dist/reset.css";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={appTheme}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
