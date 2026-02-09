import { Alert, Button, Card, Empty, List, Space, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { survey, hasSubmitted, getSubmission } from "../services/survey.service";

import PageShell from "../components/PageShell";
import SurveyStatusTag from "../components/SurveyStatusTag";
import SubmissionModal from "../components/SubmissionModal";

const { Text } = Typography;

export default function SurveyListPage({ onOpenSurvey }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubmission, setModalSubmission] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const load = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await survey.listAvailable();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewSubmission = (s) => {
    setModalTitle(s.title);
    setModalSubmission(getSubmission(s.id));
    setModalOpen(true);
  };

  const listEmpty = useMemo(() => !loading && !error && items.length === 0, [loading, error, items]);

  return (
    <PageShell
      title="Surveys"
      subtitle="Complete available surveys and track your submission (mock)."
      extra={
        <Space>
          <Button onClick={load} disabled={loading}>Refresh</Button>
        </Space>
      }
    >
      {error ? (
        <Alert
          type="error"
          showIcon
          message="Failed to load surveys"
          description={error?.message || "Please try again."}
          action={<Button size="small" onClick={load}>Retry</Button>}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {listEmpty ? (
        <Card className="panelCard">
          <Empty description="No surveys available right now" />
        </Card>
      ) : (
        <Card className="panelCard">
          <List
            loading={loading}
            dataSource={items}
            locale={{ emptyText: " " }}
            renderItem={(s) => {
              const completed = hasSubmitted(s.id);
              const closed = s.status === "CLOSED";
              const derivedStatus = completed ? "COMPLETED" : closed ? "CLOSED" : "AVAILABLE";

              return (
                <List.Item
                  className="surveyRow"
                  actions={[
                    derivedStatus === "AVAILABLE" ? (
                      <Button
                        key="fill"
                        type="primary"
                        onClick={() => onOpenSurvey(s.id)}
                      >
                        Fill
                      </Button>
                    ) : derivedStatus === "COMPLETED" ? (
                      <Button key="view" onClick={() => viewSubmission(s)}>
                        View Submission
                      </Button>
                    ) : (
                      <Button key="closed" disabled>
                        Closed
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space size={10} wrap>
                        <span className="surveyTitle">{s.title}</span>
                        <SurveyStatusTag status={derivedStatus} />
                        {typeof s.estMinutes === "number" ? (
                          <Text type="secondary" className="pill">
                            ~{s.estMinutes} min
                          </Text>
                        ) : null}
                      </Space>
                    }
                    description={
                      <div className="surveyDesc">
                        <Text type="secondary">
                          {s.description || "No description provided."}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </Card>
      )}

      <SubmissionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        submission={modalSubmission}
        surveyTitle={modalTitle}
      />
    </PageShell>
  );
}
