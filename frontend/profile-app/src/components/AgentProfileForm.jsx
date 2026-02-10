import { Button, Card, Col, Form, Input, Row, Select, Space, Typography } from "antd";
import { useMemo } from "react";

const { Text } = Typography;

const PHONE_RULE = /^\d{9,12}$/;

const DISTRICTS = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Galle",
  "Matara",
  "Jaffna",
  "Kurunegala",
  "Anuradhapura",
];

function safeStringify(obj) {
  try {
    return JSON.stringify(obj ?? {});
  } catch {
    return String(Math.random());
  }
}

function AgentProfileFormInner({ initialValues, onSave, saving }) {
  const [form] = Form.useForm();

  // re-render when values change (no local state needed)
  const values = Form.useWatch([], form);

  const baseline = useMemo(() => safeStringify(initialValues), [initialValues]);
  const current = useMemo(() => safeStringify(values), [values]);

  const isChanged = baseline !== current;
  const canSave = isChanged && !saving;

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={initialValues || {}}
      onFinish={async (v) => {
        await onSave(v);
      }}
    >
      <Card
        className="panelCard"
        title="Personal Info"
        extra={<Text type="secondary">Editable: Name</Text>}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Full Name (editable)"
              name="fullName"
              rules={[{ required: true, message: "Full name is required" }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Agent ID (read-only)" name="agentId">
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        className="panelCard"
        title="Office / Designation / District"
        style={{ marginTop: 12 }}
        extra={<Text type="secondary">Editable: Office, Designation, District</Text>}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Designation (editable)"
              name="designation"
              rules={[{ required: true, message: "Designation is required" }]}
            >
              <Input placeholder="e.g., District Officer" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Office (editable)"
              name="office"
              rules={[{ required: true, message: "Office is required" }]}
            >
              <Input placeholder="e.g., Colombo District Office" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="District (editable)"
              name="district"
              rules={[{ required: true, message: "District is required" }]}
            >
              <Select
                placeholder="Select district"
                options={DISTRICTS.map((d) => ({ value: d, label: d }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        className="panelCard"
        title="Contact"
        style={{ marginTop: 12 }}
        extra={<Text type="secondary">Editable</Text>}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email (editable)"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="agent@example.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Phone (editable)"
              name="phone"
              rules={[
                { required: true, message: "Phone is required" },
                {
                  validator: (_, v) => {
                    if (!v) return Promise.resolve();
                    const ok = PHONE_RULE.test(String(v).trim());
                    return ok
                      ? Promise.resolve()
                      : Promise.reject(new Error("Enter 9–12 digits"));
                  },
                },
              ]}
            >
              <Input placeholder="07XXXXXXXX" />
            </Form.Item>
          </Col>
        </Row>

        <div className="formActions">
          <Space wrap>
            <Button type="primary" htmlType="submit" loading={saving} disabled={!canSave}>
              Save Changes
            </Button>
            <Button onClick={() => form.resetFields()} disabled={saving}>
              Reset
            </Button>
          </Space>

          {!isChanged ? (
            <Text type="secondary" className="tinyHint">
              Make a change to enable “Save Changes”.
            </Text>
          ) : null}
        </div>
      </Card>
    </Form>
  );
}

export default function AgentProfileForm(props) {
  // Remount form whenever initialValues changes (clean reset without useEffect)
  const formKey = useMemo(() => safeStringify(props.initialValues), [props.initialValues]);
  return <AgentProfileFormInner key={formKey} {...props} />;
}
