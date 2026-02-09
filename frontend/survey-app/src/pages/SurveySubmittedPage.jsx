import { Button, Result, Space, Typography } from "antd";
import PageShell from "../components/PageShell";

const { Paragraph } = Typography;

export default function SurveySubmittedPage({ lastSubmitted, onBack }) {
  return (
    <PageShell
      title="Submission Complete"
      subtitle="Thanks for helping NYSC improve."
    >
      <Result
        status="success"
        title="Survey Submitted Successfully"
        subTitle={lastSubmitted?.title ? `Submitted: ${lastSubmitted.title}` : "Your response has been recorded."}
        extra={
          <Space wrap>
            <Button type="primary" onClick={onBack}>Back to Surveys</Button>
            <Button onClick={() => window.location.assign("/profile")}>Go to Profile</Button>
          </Space>
        }
      />

      <div className="panelCard" style={{ padding: 16, marginTop: 12 }}>
        <Paragraph style={{ margin: 0 }}>
          What happens next:
        </Paragraph>
        <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 18, opacity: 0.85 }}>
          <li>Your submission is saved (mock) in localStorage for now.</li>
          <li>When the backend is ready, your answers will be stored securely in the database.</li>
          <li>Admins can review aggregated feedback to improve Youth Circles services.</li>
        </ul>
      </div>
    </PageShell>
  );
}
