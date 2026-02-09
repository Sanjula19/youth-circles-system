import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Progress,
  Select,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";

import AuthErrorAlert from "./AuthErrorAlert";
import InterestGrid from "./InterestGrid";

const { Title, Paragraph, Text } = Typography;

const DRAFT_KEY = "auth.registerDraft.v1";

const DISTRICTS = [
  "Colombo","Gampaha","Kalutara","Kandy","Matale","Nuwara Eliya","Galle","Matara","Hambantota",
  "Jaffna","Kilinochchi","Mannar","Mullaitivu","Vavuniya","Trincomalee","Batticaloa","Ampara",
  "Kurunegala","Puttalam","Anuradhapura","Polonnaruwa","Badulla","Moneragala","Ratnapura","Kegalle",
];

const EDUCATION = [
  "O/L",
  "A/L",
  "NVQ / Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Other",
];

const GENDER = ["Male", "Female", "Other"];

function percentForStep(step) {
  if (step === 0) return 33;
  if (step === 1) return 67;
  return 100;
}

function readDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (err) {
    void err;
    return null;
  }
}

export default function RegisterWizard({
  loading,
  onCancel,
  onComplete,
  error,
  setError,
}) {
  const [form] = Form.useForm();

  // ✅ Avoid setState inside useEffect by initializing step from localStorage lazily
  const [step, setStep] = useState(() => {
    const d = readDraft();
    return d && typeof d.step === "number" ? d.step : 0;
  });

  const percent = useMemo(() => percentForStep(step), [step]);

  const persistDraft = () => {
    try {
      const values = form.getFieldsValue(true);
      const safe = { ...values };

      if (safe.dob && dayjs.isDayjs(safe.dob)) {
        safe.dob = safe.dob.toISOString();
      }

      localStorage.setItem(DRAFT_KEY, JSON.stringify({ step, values: safe }));
    } catch (err) {
      void err;
    }
  };

  // Load draft values into form (no setStep here -> lint rule satisfied)
  useEffect(() => {
    try {
      const d = readDraft();
      if (!d || !d.values || typeof d.values !== "object") return;

      const values = { ...d.values };
      if (values.dob && typeof values.dob === "string") {
        values.dob = dayjs(values.dob);
      }
      form.setFieldsValue(values);
    } catch (err) {
      void err;
    }
  }, [form]);

  const stepFields = useMemo(() => {
    if (step === 0) return ["fullName", "email", "phone", "nic", "dob", "gender"];
    if (step === 1) return ["district", "address", "educationLevel"];
    return ["interests"];
  }, [step]);

  const next = async () => {
    if (setError) setError(null);
    try {
      await form.validateFields(stepFields);
      persistDraft();
      setStep((s) => Math.min(2, s + 1));
    } catch (err) {
      void err;
    }
  };

  const back = () => {
    persistDraft();
    setStep((s) => Math.max(0, s - 1));
  };

  const complete = async () => {
    if (setError) setError(null);
    try {
      await form.validateFields([
        "fullName","email","phone","nic","dob","gender",
        "district","address","educationLevel","interests",
      ]);

      const values = form.getFieldsValue(true);
      const payload = {
        ...values,
        dob: values.dob && dayjs.isDayjs(values.dob) ? values.dob.format("YYYY-MM-DD") : values.dob,
      };

      persistDraft();
      await onComplete(payload);
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      if (err && err.message) message.error(err.message);
    }
  };

  const cancel = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      void err;
    }
    if (onCancel) onCancel();
  };

  return (
    <Card className="authCard2">
      <div className="wizardTop">
        <div className="wizardTopRow">
          <Text className="wizardStepText">Step {step + 1} of 3</Text>
          <Text type="secondary">{percent}% Complete</Text>
        </div>
        <Progress percent={percent} showInfo={false} strokeLinecap="round" />
      </div>

      <div className="wizardHead">
        <Title level={4} className="wizardTitle">
          {step === 0 ? "Personal Details" : step === 1 ? "Demographics" : "Select Your Interests"}
        </Title>
        <Paragraph type="secondary" className="wizardSub">
          {step === 0
            ? "Please provide your basic information"
            : step === 1
            ? "Tell us about your location and education"
            : "Choose Youth Circles that match your interests (select at least one)"}
        </Paragraph>
      </div>

      <AuthErrorAlert error={error} />

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onValuesChange={persistDraft}
        initialValues={{ interests: [] }}
      >
        {step === 0 && (
          <>
            <Form.Item
              label="Full Name *"
              name="fullName"
              rules={[{ required: true, message: "Full name is required" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email Address *"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="your.email@example.com" />
            </Form.Item>

            <div className="grid2">
              <Form.Item
                label="Phone Number *"
                name="phone"
                rules={[
                  { required: true, message: "Phone number is required" },
                  { pattern: /^[0-9+\s-]{9,}$/, message: "Enter a valid phone number" },
                ]}
              >
                <Input placeholder="07X XXX XXXX" />
              </Form.Item>

              <Form.Item
                label="NIC Number *"
                name="nic"
                rules={[
                  { required: true, message: "NIC is required" },
                  { pattern: /^(\d{9}[vVxX]|\d{12})$/, message: "NIC: 9 digits + V/X or 12 digits" },
                ]}
              >
                <Input placeholder="XXXXXXXXXV or XXXXXXXXXXXX" />
              </Form.Item>
            </div>

            <div className="grid2">
              <Form.Item
                label="Date of Birth *"
                name="dob"
                rules={[{ required: true, message: "Date of birth is required" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="mm/dd/yyyy" />
              </Form.Item>

              <Form.Item
                label="Gender *"
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Select
                  placeholder="Select gender"
                  options={GENDER.map((g) => ({ value: g, label: g }))}
                />
              </Form.Item>
            </div>

            <div className="wizardActions">
              <Button onClick={cancel}>Cancel</Button>
              <Button type="primary" onClick={next} loading={loading}>
                Next Step
              </Button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <Form.Item
              label="District *"
              name="district"
              rules={[{ required: true, message: "District is required" }]}
            >
              <Select
                placeholder="Select your district"
                showSearch
                optionFilterProp="label"
                options={DISTRICTS.map((d) => ({ value: d, label: d }))}
              />
            </Form.Item>

            <Form.Item
              label="Address *"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input placeholder="Enter your residential address" />
            </Form.Item>

            <Form.Item
              label="Education Level *"
              name="educationLevel"
              rules={[{ required: true, message: "Education level is required" }]}
            >
              <Select
                placeholder="Select your highest education level"
                options={EDUCATION.map((e) => ({ value: e, label: e }))}
              />
            </Form.Item>

            <Form.Item label="Current Occupation / Status" name="occupation">
              <Input placeholder="e.g., Student, Employed, Job Seeker" />
            </Form.Item>

            <div className="wizardActions">
              <Button onClick={back}>Back</Button>
              <Button type="primary" onClick={next} loading={loading}>
                Next Step
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Form.Item
              name="interests"
              rules={[
                {
                  validator: async (_, value) => {
                    if (!Array.isArray(value) || value.length === 0) {
                      throw new Error("Select at least one interest");
                    }
                  },
                },
              ]}
            >
              <InterestGrid
                value={form.getFieldValue("interests")}
                onChange={(v) => form.setFieldsValue({ interests: v })}
              />
            </Form.Item>

            <div className="wizardActions">
              <Button onClick={back}>Back</Button>
              <Button type="primary" onClick={complete} loading={loading}>
                Complete Registration
              </Button>
            </div>
          </>
        )}
      </Form>
    </Card>
  );
}
