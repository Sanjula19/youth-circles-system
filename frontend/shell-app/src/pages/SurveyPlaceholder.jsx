import { Card, Space, Typography, Button, Alert } from "antd";
import { ArrowRightOutlined, FormOutlined, LoginOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../utils/authStore";

const { Title, Paragraph, Text } = Typography;

export default function SurveyPlaceholder() {
  const loggedIn = isLoggedIn();

  return (
    <div className="pageStack">
      <Card className="softCard">
        <Space direction="vertical" size={10} style={{ width: "100%" }}>
          <Space size={10} wrap>
            <div className="iconBadge">
              <FormOutlined />
            </div>
            <div>
              <Title level={3} style={{ margin: 0 }}>/survey</Title>
              <Text type="secondary">Survey Module</Text>
            </div>
          </Space>

          <Paragraph type="secondary" style={{ marginTop: 0 }}>
            The <b>Survey</b> micro-frontend is served at <b>/survey</b>. It contains the survey list + fill flow.
          </Paragraph>

          {!loggedIn ? (
            <Alert
              showIcon
              type="warning"
              message="You must sign in to fill surveys"
              description="Please sign in first, then return to Surveys."
              action={
                <Button type="primary" icon={<LoginOutlined />} onClick={() => window.location.assign("/auth")}>
                  Go to Login
                </Button>
              }
            />
          ) : (
            <Alert
              showIcon
              type="info"
              message="Ready to open Surveys"
              description="This button opens the Survey module at /survey."
            />
          )}

          <Space wrap>
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              onClick={() => window.location.assign("/survey")}
              disabled={!loggedIn}
            >
              Open Surveys (/survey)
            </Button>
            <Button>
              <Link to="/">Back to Home</Link>
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
