import { Button, Card, message, Typography } from "antd";
import { useEffect, useState } from "react";

import QuestionRenderer from "../components/QuestionRenderer";
import PreventDuplicateUI from "../components/PreventDuplicateUI";
import { validateRequiredAnswers } from "../components/RequiredValidation";

import { survey as surveyApi } from "../services/survey.service";

const { Title, Paragraph, Text } = Typography;

export default function SurveyFillPage({ surveyId, onBack, onSubmitted }) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [surveyData, setSurveyData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const data = await surveyApi.getSurvey(surveyId);
        if (!alive) return;
        setSurveyData(data);
        setAnswers({});
        setErrors({});
      } catch (e) {
        message.error(e?.message || "Failed to load survey");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [surveyId]);

  const onChangeAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
    // clear field error as user types
    setErrors((prev) => {
      if (!prev[qid]) return prev;
      const next = { ...prev };
      delete next[qid];
      return next;
    });
  };

  const onSubmit = async () => {
    if (!surveyData) return;

    const check = validateRequiredAnswers(surveyData.questions, answers);
    setErrors(check.errors);

    if (!check.isValid) {
      message.error("Please fill required questions");
      return;
    }

    setSubmitting(true);
    try {
      await surveyApi.submitSurvey(surveyId, { answers });
      onSubmitted({ id: surveyId, title: surveyData.title });
    } catch (e) {
      message.error(e?.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 720 }}>
          <Text>Loading survey...</Text>
        </Card>
      </div>
    );
  }

  if (!surveyData) {
    return (
      <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 720 }}>
          <Text>Survey not available.</Text>
          <div style={{ marginTop: 12 }}>
            <Button onClick={onBack}>Back</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <div style={{ width: 720 }}>
        <Title level={3}>Fill Survey</Title>
        <Paragraph type="secondary">{surveyData.title}</Paragraph>

        <PreventDuplicateUI surveyId={surveyId} onBack={onBack}>
          <>
            {(surveyData.questions || []).map((q) => (
              <QuestionRenderer
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={onChangeAnswer}
                error={errors[q.id]}
              />
            ))}

            <div style={{ display: "flex", gap: 12 }}>
              <Button onClick={onBack}>Back</Button>
              <Button type="primary" loading={submitting} onClick={onSubmit}>
                Submit
              </Button>
            </div>
          </>
        </PreventDuplicateUI>
      </div>
    </div>
  );
}
