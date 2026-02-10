import { Layout, Space, Tag, Typography } from "antd";
import { Outlet } from "react-router-dom";

import SideNav from "../components/SideNav";
import LogoutAction from "../components/LogoutAction";
import { getRole, isLoggedIn } from "../utils/authStore";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

function roleColor(role) {
  if (role === "ADMIN") return "red";
  if (role === "AGENT") return "gold";
  if (role === "YOUTH") return "green";
  return "default";
}

export default function AppLayout() {
  const appName = "Youth Circles";
  const loggedIn = isLoggedIn();
  const role = loggedIn ? getRole() : "GUEST";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={260} breakpoint="lg" collapsedWidth="0" className="shellSider">
        <div className="shellBrand">
          <div className="shellLogo">YC</div>
          <div className="shellBrandText">
            <Text className="shellBrandTitle">{appName}</Text>
            <Text className="shellBrandSub" type="secondary">
              National Youth Services Council
            </Text>
          </div>
        </div>

        <SideNav role={role} />
      </Sider>

      <Layout>
        <Header className="shellHeader">
          <Space size={10} wrap>
            <Text className="shellHeaderTitle">{appName}</Text>
            <Tag color={roleColor(role)} className="roleTag">
              {role || "GUEST"}
            </Tag>
            <Tag className="statusTag">{loggedIn ? "Signed in" : "Not signed in"}</Tag>
          </Space>

          <div className="shellHeaderRight">
            {loggedIn ? <LogoutAction /> : null}
          </div>
        </Header>

        <Content className="shellContent">
          <div className="shellContainer">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
