import { Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export default function SurveyPlaceholder() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>/survey (placeholder)</Title>
      <Paragraph>
        In deployment, <b>/survey</b> will be served by <b>survey-app</b>. Shell does not render the survey app internally.
      </Paragraph>

      <Space>
        <Button type="primary" href="/survey">
          Open /survey
        </Button>
        <Button>
          <Link to="/">Back to /</Link>
        </Button>
      </Space>
    </div>
  );
}
