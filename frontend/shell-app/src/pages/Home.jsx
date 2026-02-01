import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>shell-app home</Title>
      <Paragraph>Ant Design Typography is working.</Paragraph>
    </div>
  );
}
