import { Alert, Button, Col, Empty, Row, Skeleton, Space, Typography } from "antd";
import DashboardCharts from "../components/DashboardCharts";
import MetricCard from "../components/MetricCard";
import PageShell from "../components/PageShell";
import QuickLinks from "../components/QuickLinks";

const { Text } = Typography;

export default function AdminDashboardPage({
  stats,
  loading,
  error,
  onRetry,
  onNavigate,
}) {
  return (
    <PageShell
      title="Admin Dashboard"
      subtitle="Overview of platform activity (mock data until backend)"
      extra={
        <Space>
          <Button onClick={onRetry} disabled={loading}>
            Refresh
          </Button>
        </Space>
      }
    >
      {error ? (
        <Alert
          type="error"
          showIcon
          message="Failed to load dashboard"
          description={error?.message || "Something went wrong"}
          action={
            <Button size="small" onClick={onRetry}>
              Retry
            </Button>
          }
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {loading ? (
        <div style={{ marginBottom: 16 }}>
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      ) : null}

      {!loading && !error && !stats ? (
        <div className="panelCard" style={{ padding: 16 }}>
          <Empty description="No dashboard data available" />
        </div>
      ) : null}

      {!loading && stats ? (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <MetricCard
                title="Total Youth"
                value={stats.totalYouth}
                hint="Registered youth users"
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <MetricCard
                title="Total Agents"
                value={stats.totalAgents}
                hint="Registered agent users"
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <MetricCard
                title="Total Youth Circles"
                value={stats.totalYouthCircles}
                hint="Circles in the system"
              />
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <MetricCard
                title="Total Surveys"
                value={stats.totalSurveys}
                hint="Available surveys"
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <MetricCard
                title="Total Submissions"
                value={stats.totalSubmissions}
                hint="Mock submissions count"
              />
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <MetricCard
                title="Active Users"
                value={stats.activeUsers}
                hint="Users with ACTIVE status"
              />
            </Col>
          </Row>

          <div style={{ marginTop: 16 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <DashboardCharts />
              </Col>
              <Col xs={24} lg={8}>
                <QuickLinks
                  onGoUsers={() => onNavigate?.("users")}
                  onGoSurveys={() => onNavigate?.("surveys")}
                />
                <div style={{ marginTop: 12 }}>
                  <Text type="secondary" className="smallNote">
                    Tip: Put <b>auth.role=ADMIN</b> in localStorage to access admin during mock mode.
                  </Text>
                </div>
              </Col>
            </Row>
          </div>
        </>
      ) : null}
    </PageShell>
  );
}
