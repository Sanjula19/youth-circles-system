import { Card, Form, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { validateRequired } from "./FieldValidation";

export default function ProfileForm({ initialValues, onSave }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  // Local status flags (controlled by parent is fine too, but keep simple)
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    // required-only validation (simple)
    const { isValid, errors } = validateRequired(values, ["fullName", "email", "phone"]);
    setFieldErrors(errors);

    if (!isValid) return;

    setSaving(true);
    try {
      await onSave(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="My Profile">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Full Name"
          name="fullName"
          help={fieldErrors.fullName}
          validateStatus={fieldErrors.fullName ? "error" : ""}
        >
          <Input placeholder="Full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          help={fieldErrors.email}
          validateStatus={fieldErrors.email ? "error" : ""}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          help={fieldErrors.phone}
          validateStatus={fieldErrors.phone ? "error" : ""}
        >
          <Input placeholder="Phone" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={saving}>
          Update Profile
        </Button>
      </Form>
    </Card>
  );
}
