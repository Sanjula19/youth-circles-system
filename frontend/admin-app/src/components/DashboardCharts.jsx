import { Card, Empty, Typography } from "antd";

const { Paragraph } = Typography;

export default function DashboardCharts() {
  return (
    <Card className="panelCard" title="Charts (coming soon)">
      <Paragraph type="secondary" style={{ marginTop: 0 }}>
        We’ll plug real charts here when backend analytics is ready.
      </Paragraph>

      <div className="chartPlaceholder">
        <Empty
          description="No charts yet (v0.1)"
        />
      </div>
    </Card>
  );
}
