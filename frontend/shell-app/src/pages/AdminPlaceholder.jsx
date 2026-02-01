import { Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function AdminPlaceholder() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>/admin (placeholder)</Title>
      <Paragraph>
        In deployment, <b>/admin</b> will be served by <b>admin-app</b>. Shell does not render the admin app internally.
      </Paragraph>

      <Space>
        <Button type="primary" danger href="/admin">
          Open /admin
        </Button>
        <Button>
          <Link to="/">Back to /</Link>
        </Button>
      </Space>
    </div>
  );
}
