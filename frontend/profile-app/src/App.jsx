import { ConfigProvider } from "antd";
import YouthProfilePage from "./pages/YouthProfilePage";
import AgentProfilePage from "./pages/AgentProfilePage";

function getRoleFromStorage() {
  try {
    const raw = localStorage.getItem("yc_auth_v1");
    if (!raw) return "YOUTH";
    const parsed = JSON.parse(raw);
    const role = parsed?.role;
    return role === "AGENT" ? "AGENT" : "YOUTH"; // treat ADMIN as YOUTH for dummy stage
  } catch {
    return "YOUTH";
  }
}

export default function App() {
  const role = getRoleFromStorage();

  return (
    <ConfigProvider>
      {role === "AGENT" ? <AgentProfilePage /> : <YouthProfilePage />}
    </ConfigProvider>
  );
}
