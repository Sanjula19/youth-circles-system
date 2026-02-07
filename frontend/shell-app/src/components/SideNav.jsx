import { Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function goTo(app) {
  // DEV mode: go to each app dev server port
  if (import.meta.env.DEV) {
    const map = {
      shell: "http://127.0.0.1:3000/",
      auth: "http://127.0.0.1:3001/auth/",
      profile: "http://127.0.0.1:3002/profile/",
      survey: "http://127.0.0.1:3003/survey/",
      admin: "http://127.0.0.1:3004/admin/",
    };
    window.location.assign(map[app]);
    return;
  }

  // PROD (Docker/Nginx): go by sub-path
  const map = {
    shell: "/",
    auth: "/auth/",
    profile: "/profile/",
    survey: "/survey/",
    admin: "/admin/",
  };
  window.location.assign(map[app]);
}

export default function SideNav({ role }) {
  const items = [
    { key: "home", icon: <HomeOutlined />, label: "Home", app: "shell" },
    { key: "auth", icon: <LoginOutlined />, label: "Auth", app: "auth" },
    { key: "profile", icon: <UserOutlined />, label: "Profile", app: "profile" },
    { key: "survey", icon: <FileTextOutlined />, label: "Survey", app: "survey" },
  ];

  if (role === "ADMIN") {
    items.push({
      key: "admin",
      icon: <SettingOutlined />,
      label: "Admin",
      app: "admin",
    });
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={items.map((it) => ({
        key: it.key,
        icon: it.icon,
        label: it.label,
        onClick: () => goTo(it.app),
      }))}
    />
  );
}
