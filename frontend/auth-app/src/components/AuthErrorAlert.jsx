import { Alert } from "antd";

export default function AuthErrorAlert({ error }) {
  if (!error) return null;

  const msg =
    typeof error === "string"
      ? error
      : error?.message || "Something went wrong";

  return <Alert type="error" showIcon message={msg} className="authAlert" />;
}
