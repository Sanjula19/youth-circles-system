import { Card, Descriptions, Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function YouthCirclesStatsPage() {
  // v0.1 placeholder stats (backend later)
  const stats = {
    totalCircles: 12,
    activeCircles: 10,
    districtsCovered: 9,
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Youth Circles Stats</Title>
      <Paragraph type="secondary">Placeholder stats (backend later)</Paragraph>

      <Card>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Total Circles">{stats.totalCircles}</Descriptions.Item>
          <Descriptions.Item label="Active Circles">{stats.activeCircles}</Descriptions.Item>
          <Descriptions.Item label="Districts Covered">{stats.districtsCovered}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
