import { Button, Card, List, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { survey, hasSubmitted } from "../services/survey.service";

const { Title, Paragraph } = Typography;

export default function SurveyListPage({ onOpenSurvey }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await survey.listAvailable();
        if (!alive) return;
        setItems(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <div style={{ width: 720 }}>
        <Title level={3}>Survey List</Title>
        <Paragraph type="secondary">survey-app (v0.1 dummy stage)</Paragraph>

        <Card>
          <List
            loading={loading}
            dataSource={items}
            renderItem={(s) => {
              const done = hasSubmitted(s.id);
              return (
                <List.Item
                  actions={[
                    <Button
                      key="open"
                      type="primary"
                      onClick={() => onOpenSurvey(s.id)}
                      disabled={done}
                    >
                      {done ? "Submitted" : "Fill"}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <span>
                        {s.title} {done ? <Tag color="green">SUBMITTED</Tag> : <Tag>AVAILABLE</Tag>}
                      </span>
                    }
                    description={`Survey ID: ${s.id}`}
                  />
                </List.Item>
              );
            }}
          />
        </Card>
      </div>
    </div>
  );
}
