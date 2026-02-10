import { ConfigProvider, Result, Button } from "antd";
import YouthProfilePage from "./pages/YouthProfilePage";
import AgentProfilePage from "./pages/AgentProfilePage";
import "./App.css";

function getAuth() {
  return {
    token: localStorage.getItem("auth.token"),
    role: localStorage.getItem("auth.role") || "YOUTH",
  };
}

export default function App() {
  const { token, role } = getAuth();

  if (!token) {
    return (
      <Result
        status="403"
        title="Login required"
        subTitle="Please sign in to view your profile."
        extra={
          <Button type="primary" onClick={() => window.location.assign("/auth")}>
            Go to /auth
          </Button>
        }
      />
    );
  }

  // Only AGENT gets agent profile; others use youth profile (including ADMIN)
  const view = role === "AGENT" ? <AgentProfilePage /> : <YouthProfilePage />;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#b91c1c",
          borderRadius: 10,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        },
      }}
    >
      {view}
    </ConfigProvider>
  );
}
