import { Button, Card, Form, Input, Select, Typography } from "antd";
import { useMemo, useState } from "react";

import AuthLayout from "../components/AuthLayout";
import AuthErrorAlert from "../components/AuthErrorAlert";
import AuthSuccessRedirect from "../components/AuthSuccessRedirect";

import { auth } from "../services/auth.service";
import { TokenSave } from "../utils/tokenSave";

const { Paragraph, Text } = Typography;

const USER_TYPES = [
  { value: "YOUTH", label: "Youth" },
  { value: "AGENT", label: "Agent" },
  { value: "ADMIN", label: "Admin" },
];

export default function LoginPage({ onNavigate }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const shellUrl = useMemo(() => import.meta.env.VITE_SHELL_URL || "/", []);

  const onFinish = async (values) => {
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
    return <AuthSuccessRedirect title="Signed in" subtitle="Redirecting to Home..." />;
  }

  return (
    <AuthLayout
      title="Youth Circles"
      subtitle="National Youth Services Council"
      markText="NY"
      bottom={
        <a className="backHome" onClick={() => window.location.assign(shellUrl)}>
          ← Back to Home
        </a>
      }
    >
      <Card className="authCard2">
        <div className="cardHead">
          <div className="cardTitle">Sign In</div>
          <div className="cardSub">Enter your credentials to access your account</div>
        </div>

        <AuthErrorAlert error={error} />

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{ role: "YOUTH" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="User Type"
            name="role"
            rules={[{ required: true, message: "User type is required" }]}
          >
            <Select options={USER_TYPES} />
          </Form.Item>

          <Form.Item
            label="Email / Username"
            name="identifier"
            rules={[{ required: true, message: "Email / Username is required" }]}
          >
            <Input placeholder="Enter your email or username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="primaryBtn" loading={loading}>
            Sign In
          </Button>

          <div className="cardFooterLink">
            <Text type="secondary">New youth member? </Text>
            <a onClick={() => onNavigate("register")}>Register here</a>
            <span className="dot">•</span>
            <a onClick={() => onNavigate("reset")}>Forgot password?</a>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
}
