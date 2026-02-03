import { Typography } from "antd";
import { getRole, isLoggedIn } from "../utils/authStore";

const { Title, Paragraph } = Typography;

export default function Home() {

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>shell-app home</Title>
      <Paragraph>Ant Design Typography is working.</Paragraph>

      <Paragraph>
        Current role: <b>{getRole()}</b>
      </Paragraph>
      <Paragraph>
        Logged in: <b>{isLoggedIn() ? "YES" : "NO"}</b>
      </Paragraph>
    </div>
  );
}
