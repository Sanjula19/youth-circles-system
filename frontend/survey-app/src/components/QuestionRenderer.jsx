import { Card, Typography, Radio, Checkbox, Input } from "antd";

const { Text, Paragraph } = Typography;

export default function QuestionRenderer({ question, value, onChange, error }) {
  if (!question) return null;

  const { id, type, text, required, options = [] } = question;

  const title = (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <Text strong>
        {text} {required ? <Text type="danger">*</Text> : null}
      </Text>
      {error ? <Text type="danger">{error}</Text> : null}
    </div>
  );

  const renderInput = () => {
    if (type === "single") {
      return (
        <Radio.Group
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {options.map((opt) => (
            <Radio key={opt} value={opt}>
              {opt}
            </Radio>
          ))}
        </Radio.Group>
      );
    }

    if (type === "multi") {
      return (
        <Checkbox.Group
          value={Array.isArray(value) ? value : []}
          onChange={(vals) => onChange(id, vals)}
          options={options}
        />
      );
    }

    if (type === "likert") {
      const likertOptions = [1, 2, 3, 4, 5].map((n) => ({
        label: `${n}`,
        value: n,
      }));

      return (
        <Radio.Group
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          options={likertOptions}
          optionType="button"
          buttonStyle="solid"
        />
      );
    }

    // text
    return (
      <Input.TextArea
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(id, e.target.value)}
        rows={3}
        placeholder="Type your answer..."
      />
    );
  };

  return (
    <Card style={{ marginBottom: 12 }} title={title}>
      <Paragraph style={{ marginBottom: 0 }}>{renderInput()}</Paragraph>
    </Card>
  );
}
