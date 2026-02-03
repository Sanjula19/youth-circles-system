import { Card, Typography } from "antd";
import { useState } from "react";

import AuthForm from "../components/AuthForm";
import AuthErrorAlert from "../components/AuthErrorAlert";
import AuthSuccessRedirect from "../components/AuthSuccessRedirect";

import { auth } from "../services/auth.service";
import { TokenSave } from "../utils/tokenSave";

const { Title, Paragraph } = Typography;

export default function LoginPage({ onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (values) => {
    setError(null);
    setLoading(true);
    try {
      const res = await auth.login(values); // { token, role }
      TokenSave(res.token, res.role);
      setSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <AuthSuccessRedirect title="Logged in" subtitle="Redirecting to Shell ( / )..." />;
  }

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 420 }}>
        <Title level={3}>auth-app</Title>
        <Paragraph type="secondary">Login (mock role dropdown for testing)</Paragraph>

        <AuthErrorAlert error={error} />
        <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />

        <Paragraph style={{ marginTop: 16 }}>
          <a onClick={() => onNavigate("register")}>Create an account</a> ·{" "}
          <a onClick={() => onNavigate("reset")}>Forgot password?</a>
        </Paragraph>
      </Card>
    </div>
  );
}
