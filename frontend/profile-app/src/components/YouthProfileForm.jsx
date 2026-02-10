import { Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import { useMemo } from "react";

const { Text } = Typography;

const PHONE_RULE = /^\d{9,12}$/;

function safeStringify(obj) {
  try {
    return JSON.stringify(obj ?? {});
  } catch {
    return String(Math.random());
  }
}

function YouthProfileFormInner({ initialValues, onSave, saving }) {
  const [form] = Form.useForm();

  // re-render on value changes (no local state)
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
        // parent reload will provide new initialValues and remount wrapper (key)
      }}
    >
      <Card
        className="panelCard"
        title="Personal Details"
        extra={<Text type="secondary">Editable: Full name, DOB, Address</Text>}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Full Name (editable)"
              name="fullName"
              rules={[{ required: true, message: "Full name is required" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="NIC Number (read-only)" name="nic">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Date of Birth (editable)"
              name="dob"
              rules={[
                { required: true, message: "Date of birth is required" },
                {
                  validator: (_, v) => {
                    if (!v) return Promise.resolve();
                    const ok = /^\d{4}-\d{2}-\d{2}$/.test(String(v));
                    return ok ? Promise.resolve() : Promise.reject(new Error("Use format YYYY-MM-DD"));
                  },
                },
              ]}
            >
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Gender (read-only)" name="gender">
              <Input disabled />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Address (editable)"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input placeholder="Enter your address" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        className="panelCard"
        title="Contact Details"
        style={{ marginTop: 12 }}
        extra={<Text type="secondary">Editable: Email, Phone</Text>}
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
              <Input placeholder="you@example.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Phone (editable)"
              name="phone"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  validator: (_, v) => {
                    if (!v) return Promise.resolve();
                    const ok = PHONE_RULE.test(String(v).trim());
                    return ok ? Promise.resolve() : Promise.reject(new Error("Enter 9–12 digits"));
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

export default function YouthProfileForm(props) {
  // key remount ensures Form initialValues are truly reset (no effects, no setState)
  const formKey = useMemo(() => safeStringify(props.initialValues), [props.initialValues]);
  return <YouthProfileFormInner key={formKey} {...props} />;
}
