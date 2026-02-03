import { Card, Descriptions } from "antd";

export default function YouthCircleView({ youthCircle }) {
  if (!youthCircle) return null;

  return (
    <Card title="Youth Circle (read-only)" style={{ marginTop: 16 }}>
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="Name">{youthCircle.name}</Descriptions.Item>
        <Descriptions.Item label="District">{youthCircle.district}</Descriptions.Item>
        <Descriptions.Item label="Status">{youthCircle.status}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
