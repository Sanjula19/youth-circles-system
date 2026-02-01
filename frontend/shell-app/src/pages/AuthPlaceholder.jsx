import { Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function AuthPlaceholder() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>/auth (placeholder)</Title>
      <Paragraph>
        In deployment, <b>/auth</b> will be served by <b>auth-app</b>. Shell does not render the auth app internally.
      </Paragraph>

      <Space>
        <Button type="primary" href="/auth">
          Open /auth
        </Button>
        <Button>
          <Link to="/">Back to /</Link>
        </Button>
      </Space>
    </div>
  );
}
