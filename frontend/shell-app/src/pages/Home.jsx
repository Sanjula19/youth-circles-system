import { Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>shell-app home</Title>
      <Paragraph>Ant Design Typography is working.</Paragraph>

      <Paragraph style={{ marginTop: 16 }}>
        Shell navigation (placeholders for now):
      </Paragraph>

      <Space wrap>
        <Button type="primary">
          <Link to="/auth">/auth</Link>
        </Button>
        <Button>
          <Link to="/profile">/profile</Link>
        </Button>
        <Button>
          <Link to="/survey">/survey</Link>
        </Button>
        <Button danger>
          <Link to="/admin">/admin</Link>
        </Button>
      </Space>
    </div>
  );
}
