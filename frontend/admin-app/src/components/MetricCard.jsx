import { Card, Statistic } from "antd";

export default function MetricCard({ title, value, suffix, hint }) {
  return (
    <Card className="metricCard" bordered>
      <Statistic title={title} value={value} suffix={suffix} />
      {hint ? <div className="metricHint">{hint}</div> : null}
    </Card>
  );
}
