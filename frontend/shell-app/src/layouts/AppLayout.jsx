import { Layout, Typography, Space } from "antd";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";
import LogoutAction from "../components/LogoutAction";
import { getRole } from "../utils/authStore";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

export default function AppLayout() {
  const appName = "Youth Circles";
  const role = getRole() || "GUEST";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: 16 }}>
          <Text strong style={{ color: "white" }}>
            {appName}
          </Text>
        </div>

        <SideNav role={role} />
      </Sider>

      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            background: "white",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Space>
            <Text strong>{appName}</Text>
            <Text type="secondary">Role: {role}</Text>
          </Space>

          <LogoutAction />
        </Header>

        <Content style={{ padding: 16, background: "#f5f5f5" }}>
          <div
            style={{
              background: "white",
              border: "1px solid #f0f0f0",
              borderRadius: 8,
              padding: 16,
              minHeight: 200,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
