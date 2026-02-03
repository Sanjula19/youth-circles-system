import { Button, Space, Table, Tag, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function SurveyManageListPage({
  surveys,
  loading,
  onCreateNew,
  onEdit,
  onActivate,
  onDeactivate,
}) {
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) =>
        status === "ACTIVE" ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">INACTIVE</Tag>,
    },
    {
      title: "Questions",
      key: "questions",
      render: (_, s) => <span>{s.questions?.length || 0}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, s) => (
        <Space>
          <Button onClick={() => onEdit(s)}>Edit</Button>
          {s.status === "ACTIVE" ? (
            <Button danger onClick={() => onDeactivate(s.id)}>
              Deactivate
            </Button>
          ) : (
            <Button type="primary" onClick={() => onActivate(s.id)}>
              Activate
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Survey Management</Title>
      <Paragraph type="secondary">Create/Edit/Activate/Deactivate (v0.1)</Paragraph>

      <Button type="primary" onClick={onCreateNew} style={{ marginBottom: 12 }}>
        New Survey
      </Button>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={surveys}
        columns={columns}
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
}
