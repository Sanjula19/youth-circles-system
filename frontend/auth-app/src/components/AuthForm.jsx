import { Form, Input, Button, Select, Typography, Space } from "antd";

const { Text } = Typography;

const ROLE_OPTIONS = [
  { value: "YOUTH", label: "YOUTH" },
  { value: "AGENT", label: "AGENT" },
  { value: "ADMIN", label: "ADMIN" },
];

export default function AuthForm({ mode, onSubmit, loading = false, initialRole = "YOUTH" }) {
  const [form] = Form.useForm();

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isReset = mode === "reset";

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{ role: initialRole }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
      >
        <Input placeholder="you@example.com" />
      </Form.Item>

      {!isReset && (
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
      )}

      {isLogin && (
        <Form.Item
          label="Role (mock)"
          name="role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select options={ROLE_OPTIONS} />
        </Form.Item>
      )}

      {isRegister && (
        <Text type="secondary">
          Register uses role <b>YOUTH</b> by default (mock).
        </Text>
      )}

      <Space style={{ marginTop: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isLogin ? "Login" : isRegister ? "Register" : "Send Reset Link"}
        </Button>
      </Space>
    </Form>
  );
}
