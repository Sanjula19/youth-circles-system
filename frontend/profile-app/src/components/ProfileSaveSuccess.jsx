import { Alert } from "antd";

export default function ProfileSaveSuccess({ visible }) {
  if (!visible) return null;
  return (
    <Alert
      type="success"
      showIcon
      message="Profile updated successfully"
      style={{ marginBottom: 16 }}
    />
  );
}
