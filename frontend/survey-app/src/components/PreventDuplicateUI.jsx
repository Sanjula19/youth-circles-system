import { Result, Button } from "antd";
import { hasSubmitted } from "../services/survey.service";

export default function PreventDuplicateUI({ surveyId, onBack, children }) {
  if (!surveyId) return null;

  if (hasSubmitted(surveyId)) {
    return (
      <Result
        status="warning"
        title="Already Submitted"
        subTitle="You already submitted this survey. Duplicate submissions are blocked."
        extra={
          <Button type="primary" onClick={onBack}>
            Back to Survey List
          </Button>
        }
      />
    );
  }

  return children;
}
