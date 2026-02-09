import { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Layout, Menu, Result, Button, message } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import "./App.css";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import UsersListPage from "./pages/UsersListPage";
import UserDetailPage from "./pages/UserDetailPage";
import YouthCirclesStatsPage from "./pages/YouthCirclesStatsPage";
import SurveyManageListPage from "./pages/SurveyManageListPage";
import SurveyBuilderPage from "./pages/SurveyBuilderPage";

import { admin } from "./services/admin.service";

const { Sider, Content, Header } = Layout;

function getAuthFromStorage() {
  const token = localStorage.getItem("auth.token");
  const role = localStorage.getItem("auth.role");
  return { token, role };
}

export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [surveys, setSurveys] = useState([]);
  const [surveysLoading, setSurveysLoading] = useState(false);

  const [builderMode, setBuilderMode] = useState("create");
  const [editingSurvey, setEditingSurvey] = useState(null);

  const [dashError, setDashError] = useState(null);

  const { token, role } = getAuthFromStorage();
  const isAdmin = role === "ADMIN";

  // Redirect to /auth if not logged in (shared contract)
  useEffect(() => {
    if (!token) {
      window.location.assign("/auth");
    }
  }, [token]);

  const reloadUsers = async () => {
    if (!isAdmin) return;
    setUsersLoading(true);
    setDashError(null);
    try {
      const data = await admin.listUsers();
      setUsers(data);
    } catch (e) {
      setDashError(e);
    } finally {
      setUsersLoading(false);
    }
  };

  const reloadSurveys = async () => {
    if (!isAdmin) return;
    setSurveysLoading(true);
    setDashError(null);
    try {
      const data = await admin.surveysCRUD.list();
      setSurveys(data);
    } catch (e) {
      setDashError(e);
    } finally {
      setSurveysLoading(false);
    }
  };

  const reloadDashboard = async () => {
    await Promise.all([reloadUsers(), reloadSurveys()]);
  };

  useEffect(() => {
    if (!isAdmin) return;
    reloadDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const stats = useMemo(() => {
    if (!isAdmin) return null;

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "ACTIVE").length;

    const totalYouth = users.filter((u) => u.role === "YOUTH").length;
    const totalAgents = users.filter((u) => u.role === "AGENT").length;

    const totalSurveys = surveys.length;

    // mock-only until backend:
    const totalYouthCircles = 12;
    const totalSubmissions = 128;

    return {
      totalUsers,
      activeUsers,
      totalYouth,
      totalAgents,
      totalYouthCircles,
      totalSurveys,
      totalSubmissions,
    };
  }, [users, surveys, isAdmin]);

  // Access rules (after hooks)
  if (!token) {
    return (
      <Result
        status="403"
        title="Login required"
        subTitle="Redirecting to /auth..."
        extra={<Button type="primary" onClick={() => window.location.assign("/auth")}>Go to /auth</Button>}
      />
    );
  }

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

  const selectedKey =
    screen === "userDetail" ? "users" : screen === "surveyBuilder" ? "surveys" : screen;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#b91c1c",
          borderRadius: 10,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={240} breakpoint="lg" collapsedWidth="0" className="adminSider">
          <div className="brandBlock">
            <div className="brandMark">NY</div>
            <div className="brandText">
              <div className="brandTitle">NYSC Admin</div>
              <div className="brandSub">Control Panel</div>
            </div>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => {
              setSelectedUser(null);
              setEditingSurvey(null);
              setScreen(key);
            }}
          />
        </Sider>

        <Layout>
          <Header className="adminHeader">
            <div className="adminHeaderRow">
              <div className="adminHeaderTitle">Admin</div>
              <div className="adminHeaderMeta">Role: ADMIN</div>
            </div>
          </Header>

          <Content className="adminContent">
            {screen === "dashboard" && (
              <AdminDashboardPage
                stats={stats}
                loading={usersLoading || surveysLoading}
                error={dashError}
                onRetry={reloadDashboard}
                onNavigate={setScreen}
              />
            )}

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
    </ConfigProvider>
  );
}
