import { Button, Card, Form, Input, Result, Typography } from "antd";
import { useMemo, useState } from "react";

import AuthLayout from "../components/AuthLayout";
import AuthErrorAlert from "../components/AuthErrorAlert";

import { auth } from "../services/auth.service";

const { Text } = Typography;

export default function ResetPasswordPage({ onNavigate }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  const shellUrl = useMemo(() => import.meta.env.VITE_SHELL_URL || "/", []);

  const onFinish = async (values) => {
    setError(null);
    setLoading(true);
    try {
      await auth.resetPassword(values); // { ok: true }
      setSent(true);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="We’ll send you a reset link (mock)"
      markText="NY"
      bottom={
        <a className="backHome" onClick={() => window.location.assign(shellUrl)}>
          ← Back to Home
        </a>
      }
    >
      <Card className="authCard2">
        {!sent ? (
          <>
            <div className="cardHead">
              <div className="cardTitle">Forgot your password?</div>
              <div className="cardSub">Enter your email / username / NIC to continue</div>
            </div>

            <AuthErrorAlert error={error} />

            <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
              <Form.Item
                label="Email / Username / NIC"
                name="identifier"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input placeholder="Enter your email or username" />
              </Form.Item>

              <Button type="primary" htmlType="submit" block className="primaryBtn" loading={loading}>
                Send Reset Link
              </Button>

              <div className="cardFooterLink">
                <Text type="secondary">Remembered? </Text>
                <a onClick={() => onNavigate("login")}>Back to Sign In</a>
              </div>
            </Form>
          </>
        ) : (
          <Result
            status="success"
            title="Reset link sent"
            subTitle="This is a mock flow. Backend will plug in later."
            extra={[
              <Button key="login" type="primary" onClick={() => onNavigate("login")}>
                Back to Sign In
              </Button>,
            ]}
          />
        )}
      </Card>
    </AuthLayout>
  );
}
