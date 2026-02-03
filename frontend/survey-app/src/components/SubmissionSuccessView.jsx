import { Result, Button } from "antd";

export default function SubmissionSuccessView({ surveyTitle, onBack }) {
  return (
    <Result
      status="success"
      title="Survey Submitted"
      subTitle={surveyTitle ? `Submitted: ${surveyTitle}` : "Submission successful"}
      extra={
        <Button type="primary" onClick={onBack}>
          Back to Survey List
        </Button>
      }
    />
  );
}
