import { Alert } from "antd";

export default function ProfileSaveError({ error }) {
  if (!error) return null;

  const msg = typeof error === "string" ? error : error.message || "Update failed";
  return (
    <Alert
      type="error"
      showIcon
      message={msg}
      style={{ marginBottom: 16 }}
    />
  );
}
