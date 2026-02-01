import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  FileTextOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export default function SideNav({ role = "YOUTH" }) {
  const location = useLocation();

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/auth",
      icon: <LoginOutlined />,
      label: <Link to="/auth">Auth</Link>,
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "/survey",
      icon: <FileTextOutlined />,
      label: <Link to="/survey">Survey</Link>,
    },
    ...(role === "ADMIN"
      ? [
          {
            key: "/admin",
            icon: <DashboardOutlined />,
            label: <Link to="/admin">Admin</Link>,
          },
        ]
      : []),
  ];

  const selectedKey = items.find((i) => location.pathname.startsWith(i.key))
    ? items.find((i) => location.pathname.startsWith(i.key)).key
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
