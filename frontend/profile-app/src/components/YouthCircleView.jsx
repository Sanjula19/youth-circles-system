import { Card, Descriptions, Tag, Typography } from "antd";

const { Text } = Typography;

export default function YouthCircleView({ youthCircle }) {
  if (!youthCircle) return null;

  const statusColor = youthCircle.status === "ACTIVE" ? "green" : "red";

  return (
    <Card className="panelCard" title="Youth Circle (read-only)">
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="Name">{youthCircle.name}</Descriptions.Item>
        <Descriptions.Item label="District">{youthCircle.district}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColor}>{youthCircle.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Role in Circle">
          <Text type="secondary">{youthCircle.memberRole || "-"}</Text>
        </Descriptions.Item>
      </Descriptions>

      <div className="tinyHint">
        Circle membership is managed by admins/agents (read-only here).
      </div>
    </Card>
  );
}
