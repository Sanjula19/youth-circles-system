import { Button, Card, Descriptions, Typography } from "antd";

const { Title } = Typography;

export default function UserDetailPage({ user, onBack }) {
  if (!user) return null;

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>User Detail</Title>

      <Card style={{ marginTop: 12 }}>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
          <Descriptions.Item label="Status">{user.status}</Descriptions.Item>
        </Descriptions>

        <Button style={{ marginTop: 16 }} onClick={onBack}>
          Back to Users
        </Button>
      </Card>
    </div>
  );
}
