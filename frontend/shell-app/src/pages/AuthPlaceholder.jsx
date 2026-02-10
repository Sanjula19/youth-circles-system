import { Card, Space, Typography, Button, Alert } from "antd";
import { ArrowRightOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

export default function AuthPlaceholder() {
  return (
    <div className="pageStack">
      <Card className="softCard">
        <Space direction="vertical" size={10} style={{ width: "100%" }}>
          <Space size={10} wrap>
            <div className="iconBadge">
              <LockOutlined />
            </div>
            <div>
              <Title level={3} style={{ margin: 0 }}>/auth</Title>
              <Text type="secondary">Authentication Module</Text>
            </div>
          </Space>

          <Paragraph type="secondary" style={{ marginTop: 0 }}>
            You’re about to open the <b>Auth</b> micro-frontend. Use it to sign in, register, or reset your password.
          </Paragraph>

          <Alert
            showIcon
            type="info"
            message="You are leaving the Shell module"
            description="This button opens the Auth module at /auth."
          />

          <Space wrap>
            <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => window.location.assign("/auth")}>
              Open Auth (/auth)
            </Button>
            <Button>
              <Link to="/">Back to Home</Link>
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
