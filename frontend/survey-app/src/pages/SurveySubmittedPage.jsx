import SubmissionSuccessView from "../components/SubmissionSuccessView";

export default function SurveySubmittedPage({ lastSubmitted, onBack }) {
  return (
    <div style={{ padding: 24 }}>
      <SubmissionSuccessView surveyTitle={lastSubmitted?.title} onBack={onBack} />
    </div>
  );
}
