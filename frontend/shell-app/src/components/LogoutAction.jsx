import { Button } from "antd";

export default function LogoutAction() {
  return (
    <Button danger onClick={() => alert("LogoutAction placeholder")}>
      Logout
    </Button>
  );
}
