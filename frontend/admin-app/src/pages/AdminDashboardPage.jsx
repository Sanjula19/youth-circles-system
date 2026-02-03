import { Card, Col, Row, Statistic, Typography } from "antd";
import DashboardCharts from "../components/DashboardCharts";

const { Title, Paragraph } = Typography;

export default function AdminDashboardPage({ stats }) {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Admin Dashboard</Title>
      <Paragraph type="secondary">admin-app (v0.1 dummy stage)</Paragraph>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Total Users" value={stats.totalUsers} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Active Users" value={stats.activeUsers} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic title="Surveys" value={stats.totalSurveys} />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <DashboardCharts />
      </div>
    </div>
  );
}
