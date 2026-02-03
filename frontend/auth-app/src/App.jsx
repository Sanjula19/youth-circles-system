import { useState } from "react";
import { ConfigProvider } from "antd";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

export default function App() {
  const [screen, setScreen] = useState("login"); // login | register | reset

  return (
    <ConfigProvider>
      {screen === "login" && <LoginPage onNavigate={setScreen} />}
      {screen === "register" && <RegisterPage onNavigate={setScreen} />}
      {screen === "reset" && <ResetPasswordPage onNavigate={setScreen} />}
    </ConfigProvider>
  );
}
