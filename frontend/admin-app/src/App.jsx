import { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Result, Button, message } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import UsersListPage from "./pages/UsersListPage";
import UserDetailPage from "./pages/UserDetailPage";
import YouthCirclesStatsPage from "./pages/YouthCirclesStatsPage";
import SurveyManageListPage from "./pages/SurveyManageListPage";
import SurveyBuilderPage from "./pages/SurveyBuilderPage";

import { admin } from "./services/admin.service";

const { Sider, Content, Header } = Layout;

function getRoleFromStorage() {
  try {
    const raw = localStorage.getItem("yc_auth_v1");
    if (!raw) return "YOUTH";
    const parsed = JSON.parse(raw);
    return parsed?.role || "YOUTH";
  } catch {
    return "YOUTH";
  }
}

export default function App() {
  // ✅ All hooks must be called at the top level, unconditionally
  const [screen, setScreen] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [surveysLoading, setSurveysLoading] = useState(false);
  const [builderMode, setBuilderMode] = useState("create");
  const [editingSurvey, setEditingSurvey] = useState(null);

  // Get role - this is not a hook, so it's safe
  const role = getRoleFromStorage();
  const isAdmin = role === "ADMIN";

  const reloadUsers = async () => {
    if (!isAdmin) return;
    setUsersLoading(true);
    try {
      const data = await admin.listUsers();
      setUsers(data);
    } finally {
      setUsersLoading(false);
    }
  };

  const reloadSurveys = async () => {
    if (!isAdmin) return;
    setSurveysLoading(true);
    try {
      const data = await admin.surveysCRUD.list();
      setSurveys(data);
    } finally {
      setSurveysLoading(false);
    }
  };

  // ✅ useEffect is always called (hooks rules satisfied)
  useEffect(() => {
    if (!isAdmin) return;
    reloadUsers();
    reloadSurveys();
  }, [isAdmin]);

  // ✅ useMemo is always called (hooks rules satisfied)
  const stats = useMemo(() => {
    if (!isAdmin) return { totalUsers: 0, activeUsers: 0, totalSurveys: 0 };
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
    const totalSurveys = surveys.length;
    return { totalUsers, activeUsers, totalSurveys };
  }, [users, surveys, isAdmin]);

  // ✅ Early return AFTER all hooks have been called
  if (!isAdmin) {
    return (
      <Result
        status="403"
        title="Access Denied"
        subTitle="This app is for ADMIN only."
        extra={[
          <Button key="home" type="primary" onClick={() => window.location.assign("/")}>
            Go to Shell (/)
          </Button>,
          <Button key="auth" onClick={() => window.location.assign("/auth")}>
            Go to Auth (/auth)
          </Button>,
        ]}
      />
    );
  }

  const onActivateUser = async (id) => {
    await admin.activateUser(id);
    message.success("User activated");
    reloadUsers();
  };

  const onDeactivateUser = async (id) => {
    await admin.deactivateUser(id);
    message.success("User deactivated");
    reloadUsers();
  };

  const onCreateSurvey = () => {
    setBuilderMode("create");
    setEditingSurvey(null);
    setScreen("surveyBuilder");
  };

  const onEditSurvey = (s) => {
    setBuilderMode("edit");
    setEditingSurvey(s);
    setScreen("surveyBuilder");
  };

  const onActivateSurvey = async (id) => {
    await admin.surveysCRUD.activate(id);
    message.success("Survey activated");
    reloadSurveys();
  };

  const onDeactivateSurvey = async (id) => {
    await admin.surveysCRUD.deactivate(id);
    message.success("Survey deactivated");
    reloadSurveys();
  };

  const onSaveSurvey = async ({ title, questions }) => {
    if (builderMode === "edit" && editingSurvey?.id) {
      await admin.surveysCRUD.update(editingSurvey.id, { title, questions });
    } else {
      await admin.surveysCRUD.create({ title, questions });
    }
    await reloadSurveys();
    setScreen("surveys");
  };

  const menuItems = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "users", icon: <TeamOutlined />, label: "Users" },
    { key: "youthCircles", icon: <BarChartOutlined />, label: "Youth Circles Stats" },
    { key: "surveys", icon: <FileTextOutlined />, label: "Survey Management" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} breakpoint="lg" collapsedWidth="0">
        <div style={{ padding: 16, color: "white", fontWeight: 600 }}>admin-app</div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[screen === "userDetail" ? "users" : screen === "surveyBuilder" ? "surveys" : screen]}
          items={menuItems}
          onClick={({ key }) => {
            setSelectedUser(null);
            setEditingSurvey(null);
            setScreen(key);
          }}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "white", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ fontWeight: 600 }}>Role: ADMIN</div>
        </Header>

        <Content style={{ background: "#f5f5f5" }}>
          {screen === "dashboard" && <AdminDashboardPage stats={stats} />}

          {screen === "users" && (
            <UsersListPage
              users={users}
              loading={usersLoading}
              onOpenUser={(u) => {
                setSelectedUser(u);
                setScreen("userDetail");
              }}
              onActivate={onActivateUser}
              onDeactivate={onDeactivateUser}
            />
          )}

          {screen === "userDetail" && (
            <UserDetailPage
              user={selectedUser}
              onBack={() => {
                setSelectedUser(null);
                setScreen("users");
              }}
            />
          )}

          {screen === "youthCircles" && <YouthCirclesStatsPage />}

          {screen === "surveys" && (
            <SurveyManageListPage
              surveys={surveys}
              loading={surveysLoading}
              onCreateNew={onCreateSurvey}
              onEdit={onEditSurvey}
              onActivate={onActivateSurvey}
              onDeactivate={onDeactivateSurvey}
            />
          )}

          {screen === "surveyBuilder" && (
            <SurveyBuilderPage
              mode={builderMode}
              survey={editingSurvey}
              onSave={onSaveSurvey}
              onCancel={() => setScreen("surveys")}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}