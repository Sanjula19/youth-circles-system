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
  const role = getRole();

  const PROFILE_URL = import.meta.env.VITE_PROFILE_URL || "/profile";

  const items = [
    { key: "/", icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
    { key: "/auth", icon: <LoginOutlined />, label: <Link to="/auth">Auth</Link> },

    // ✅ Full navigation to profile app (dev URL if set; production path otherwise)
    { key: "/profile", icon: <UserOutlined />, label: <a href={PROFILE_URL}>Profile</a> },

    { key: "/survey", icon: <FileTextOutlined />, label: <Link to="/survey">Survey</Link> },
  ];

  if (role === "ADMIN") {
    items.push({
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Admin</Link>,
    });
  }

  const keys = items.map((i) => i.key).sort((a, b) => b.length - a.length);
  const selectedKey =
    keys.find((k) => location.pathname === k || (k !== "/" && location.pathname.startsWith(k))) || "/";

  return <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} items={items} />;
}
