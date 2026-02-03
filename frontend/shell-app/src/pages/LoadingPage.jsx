import { Spin, Space, Typography } from "antd";

const { Text } = Typography;

export default function LoadingPage({ message = "Loading..." }) {
  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Space>
        <Spin />
        <Text>{message}</Text>
      </Space>
    </div>
  );
}
