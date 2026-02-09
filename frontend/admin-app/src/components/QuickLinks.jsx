import { Button, Card, Space, Typography } from "antd";

const { Text } = Typography;

export default function QuickLinks({ onGoUsers, onGoSurveys }) {
  return (
    <Card className="panelCard" title="Quick Actions">
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text type="secondary">
          Jump quickly to common admin tasks.
        </Text>

        <Space wrap>
          <Button type="primary" onClick={onGoUsers}>
            Manage Users
          </Button>
          <Button onClick={onGoSurveys}>Manage Surveys</Button>
        </Space>
      </Space>
    </Card>
  );
}
