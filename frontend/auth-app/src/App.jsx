import { useState } from "react";
import { ConfigProvider } from "antd";

import "./App.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

export default function App() {
  const [screen, setScreen] = useState("login"); // login | register | reset

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#b91c1c",
          borderRadius: 10,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        },
        components: {
          Button: { controlHeight: 42 },
          Input: { controlHeight: 42 },
          Select: { controlHeight: 42 },
        },
      }}
    >
      {screen === "login" && <LoginPage onNavigate={setScreen} />}
      {screen === "register" && <RegisterPage onNavigate={setScreen} />}
      {screen === "reset" && <ResetPasswordPage onNavigate={setScreen} />}
    </ConfigProvider>
  );
}
