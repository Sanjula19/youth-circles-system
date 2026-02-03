import { Card, Skeleton } from "antd";

export default function ProfileSkeletonLoading() {
  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 520 }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </Card>
    </div>
  );
}
