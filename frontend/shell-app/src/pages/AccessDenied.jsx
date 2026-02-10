import { Result, Button, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import { getRole, isLoggedIn } from "../utils/authStore";

const { Paragraph } = Typography;

function clearAuthEverywhere() {
  try {
    localStorage.removeItem("auth.token");
    localStorage.removeItem("auth.role");
    localStorage.removeItem("yc_auth_v1");
  } catch {
    // ignore
  }
}

export default function AccessDeniedPage() {
  const loggedIn = isLoggedIn();
  const role = loggedIn ? getRole() : "GUEST";

  return (
    <Result
      status="403"
      title="Access Denied"
      subTitle="You don’t have permission to view this page."
      extra={
        <Space wrap>
          <Button type="primary">
            <Link to="/">Go Home</Link>
          </Button>
          <Button
            onClick={() => {
              clearAuthEverywhere();
              window.location.assign("/auth");
            }}
          >
            Logout
          </Button>
          <Button onClick={() => window.location.assign("/auth")}>Login</Button>
        </Space>
      }
    >
      <Paragraph type="secondary" style={{ marginTop: 12 }}>
        Current role: <b>{role || "GUEST"}</b>. If you think this is a mistake, sign in with the correct account/role.
      </Paragraph>
    </Result>
  );
}
