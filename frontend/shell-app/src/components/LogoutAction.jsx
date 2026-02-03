import { Button, message } from "antd";
import { clearAuth } from "../utils/authStore";

export default function LogoutAction() {
  const onLogout = () => {
    try {
      clearAuth(); // clears { token, role } in AuthStore + localStorage
      message.success("Logged out");

      // Important: go to the /auth PATH (full page load),
      // so in deployment Nginx serves auth-app (not embedded in shell).
      setTimeout(() => {
        window.location.assign("/auth");
      }, 300);
    } catch (e) {
      console.error(e);
      message.error("Logout failed");
    }
  };

  return (
    <Button danger onClick={onLogout}>
      Logout
    </Button>
  );
}
