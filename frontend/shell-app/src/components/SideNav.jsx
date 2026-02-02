import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { getRole } from "../utils/authStore";

export default function SideNav() {
  const location = useLocation();
  const role = getRole(); // ✅ role is read from AuthStore

  const items = [
    { key: "/", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    { key: "/auth", icon: <LoginOutlined />, label: <Link to="/auth">Auth</Link> },
    { key: "/profile", icon: <UserOutlined />, label: <Link to="/profile">Profile</Link> },
    { key: "/survey", icon: <FileTextOutlined />, label: <Link to="/survey">Survey</Link> },
  ];

  // ✅ Only ADMIN sees Admin
  if (role === "ADMIN") {
    items.push({
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Admin</Link>,
    });
  }

  // Highlight current path (supports nested paths later)
  const keys = items.map((i) => i.key).sort((a, b) => b.length - a.length);
  const selectedKey = keys.find((k) => location.pathname === k || (k !== "/" && location.pathname.startsWith(k))) || "/";

  return <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={items} />;
}
