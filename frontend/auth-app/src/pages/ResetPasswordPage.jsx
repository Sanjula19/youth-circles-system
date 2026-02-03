import { Card, Typography, message } from "antd";
import { useState } from "react";

import AuthForm from "../components/AuthForm";
import AuthErrorAlert from "../components/AuthErrorAlert";

import { auth } from "../services/auth.service";

const { Title, Paragraph } = Typography;

export default function ResetPasswordPage({ onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async (values) => {
    setError(null);
    setLoading(true);
    try {
      await auth.resetPassword(values); // mock ok
      message.success("Reset link sent (mock)");
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 420 }}>
        <Title level={3}>auth-app</Title>
        <Paragraph type="secondary">Reset password (mock)</Paragraph>

        <AuthErrorAlert error={error} />
        <AuthForm mode="reset" onSubmit={handleReset} loading={loading} />

        <Paragraph style={{ marginTop: 16 }}>
          <a onClick={() => onNavigate("login")}>Back to login</a>
        </Paragraph>
      </Card>
    </div>
  );
}
