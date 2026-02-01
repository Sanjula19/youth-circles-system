import { Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function ProfilePlaceholder() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>/profile (placeholder)</Title>
      <Paragraph>
        In deployment, <b>/profile</b> will be served by <b>profile-app</b>. Shell does not render the profile app internally.
      </Paragraph>

      <Space>
        <Button type="primary" href="/profile">
          Open /profile
        </Button>
        <Button>
          <Link to="/">Back to /</Link>
        </Button>
      </Space>
    </div>
  );
}
