import { Button, Space, Table, Tag, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function UsersListPage({ users, loading, onOpenUser, onActivate, onDeactivate }) {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag>{role}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "ACTIVE" ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">INACTIVE</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, u) => (
        <Space>
          <Button onClick={() => onOpenUser(u)}>View</Button>
          {u.status === "ACTIVE" ? (
            <Button danger onClick={() => onDeactivate(u.id)}>
              Deactivate
            </Button>
          ) : (
            <Button type="primary" onClick={() => onActivate(u.id)}>
              Activate
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Users</Title>
      <Paragraph type="secondary">User management (v0.1)</Paragraph>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={users}
        columns={columns}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
}
