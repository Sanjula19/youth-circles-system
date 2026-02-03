import { Button, Card, Form, Input, List, Space, Typography, message } from "antd";
import { useEffect, useState } from "react";

const { Title, Paragraph, Text } = Typography;

export default function SurveyBuilderPage({ mode, survey, onSave, onCancel }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState("");

  useEffect(() => {
    form.setFieldsValue({ title: survey?.title || "" });
    setQuestions(survey?.questions || []);
  }, [survey, form]);

  const addQuestion = () => {
    const q = newQ.trim();
    if (!q) return message.error("Question text is required");
    setQuestions((prev) => [...prev, q]);
    setNewQ("");
  };

  const removeQuestion = (idx) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleFinish = async (values) => {
    const title = (values.title || "").trim();
    if (!title) return message.error("Title is required");

    setSaving(true);
    try {
      await onSave({ title, questions });
      message.success("Saved (mock)");
    } catch (e) {
      message.error(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Survey Builder</Title>
      <Paragraph type="secondary">
        {mode === "edit" ? "Edit Survey (v0.1)" : "Create Survey (v0.1)"} — text questions only
      </Paragraph>

      <Card>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Survey Title" name="title" rules={[{ required: true, message: "Title is required" }]}>
            <Input placeholder="Enter survey title" />
          </Form.Item>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Add Question (text only)</Text>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={newQ}
                onChange={(e) => setNewQ(e.target.value)}
                placeholder="Type a question..."
              />
              <Button onClick={addQuestion}>Add</Button>
            </Space.Compact>

            <List
              bordered
              dataSource={questions}
              locale={{ emptyText: "No questions added yet" }}
              renderItem={(q, idx) => (
                <List.Item
                  actions={[
                    <Button danger size="small" key="rm" onClick={() => removeQuestion(idx)}>
                      Remove
                    </Button>,
                  ]}
                >
                  {idx + 1}. {q}
                </List.Item>
              )}
            />
          </Space>

          <Space style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" loading={saving}>
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
}
