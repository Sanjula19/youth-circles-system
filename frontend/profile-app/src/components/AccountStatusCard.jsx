import { Card, Descriptions, Tag, Typography } from "antd";

const { Text } = Typography;

export default function AccountStatusCard({ account }) {
  if (!account) return null;

  const statusColor = account.status === "ACTIVE" ? "green" : account.status === "PENDING" ? "orange" : "red";

  return (
    <Card className="panelCard" title="Account Status (read-only)">
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="Role">
          <Tag>{account.role || "-"}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColor}>{account.status || "-"}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Member Since">
          <Text type="secondary">{account.createdAt ? new Date(account.createdAt).toLocaleDateString() : "-"}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Last Updated">
          <Text type="secondary">{account.updatedAt ? new Date(account.updatedAt).toLocaleString() : "-"}</Text>
        </Descriptions.Item>
      </Descriptions>

      <div className="tinyHint">
        This is mock data stored locally until backend is ready.
      </div>
    </Card>
  );
}
