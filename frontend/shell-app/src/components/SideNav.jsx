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
  const role = getRole(); // reads current role from AuthStore

  const items = [
    { key: "/", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    { key: "/auth", icon: <LoginOutlined />, label: <Link to="/auth">Auth</Link> },
    { key: "/profile", icon: <UserOutlined />, label: <Link to="/profile">Profile</Link> },
    { key: "/survey", icon: <FileTextOutlined />, label: <Link to="/survey">Survey</Link> },
  ];

  if (role === "ADMIN") {
    items.push({
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Admin</Link>,
    });
  }

  const selectedKey =
    items.find((i) => location.pathname === i.key) ||
    items.find((i) => i.key !== "/" && location.pathname.startsWith(i.key))
      ? (items.find((i) => location.pathname === i.key) ||
          items.find((i) => i.key !== "/" && location.pathname.startsWith(i.key))).key
      : "/";

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      items={items}
    />
  );
}
