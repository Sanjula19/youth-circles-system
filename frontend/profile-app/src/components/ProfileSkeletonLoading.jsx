import { Card, Col, Row, Skeleton } from "antd";

export default function ProfileSkeletonLoading() {
  return (
    <div className="page">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="panelCard">
            <Skeleton active paragraph={{ rows: 6 }} />
          </Card>
          <div style={{ marginTop: 12 }}>
            <Card className="panelCard">
              <Skeleton active paragraph={{ rows: 5 }} />
            </Card>
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="panelCard">
            <Skeleton active paragraph={{ rows: 5 }} />
          </Card>
          <div style={{ marginTop: 12 }}>
            <Card className="panelCard">
              <Skeleton active paragraph={{ rows: 5 }} />
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
