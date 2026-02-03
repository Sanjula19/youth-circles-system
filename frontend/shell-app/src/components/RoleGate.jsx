import AccessDenied from "../pages/AccessDenied";
import { getRole } from "../utils/authStore";

export default function RoleGate({ allow = [], children }) {
  const role = getRole() || "GUEST";
  const ok = allow.includes(role);

  if (!ok) return <AccessDenied />;
  return children;
}
