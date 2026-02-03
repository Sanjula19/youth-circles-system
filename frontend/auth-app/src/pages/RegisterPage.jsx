import { Card, Typography } from "antd";
import { useState } from "react";

import AuthForm from "../components/AuthForm";
import AuthErrorAlert from "../components/AuthErrorAlert";
import AuthSuccessRedirect from "../components/AuthSuccessRedirect";

import { auth } from "../services/auth.service";
import { TokenSave } from "../utils/tokenSave";

const { Title, Paragraph } = Typography;

export default function RegisterPage({ onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (values) => {
    setError(null);
    setLoading(true);
    try {
      const res = await auth.register(values); // mock returns { token, role: "YOUTH" }
      TokenSave(res.token, res.role);
      setSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <AuthSuccessRedirect title="Registered" subtitle="Redirecting to Shell ( / )..." />;
  }

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 420 }}>
        <Title level={3}>auth-app</Title>
        <Paragraph type="secondary">Register (mock)</Paragraph>

        <AuthErrorAlert error={error} />
        <AuthForm mode="register" onSubmit={handleRegister} loading={loading} />

        <Paragraph style={{ marginTop: 16 }}>
          <a onClick={() => onNavigate("login")}>Back to login</a>
        </Paragraph>
      </Card>
    </div>
  );
}
