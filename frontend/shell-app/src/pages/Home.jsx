import { Card, Col, Divider, Row, Space, Tag, Typography, Button, List, Statistic, Alert } from "antd";
import {
  ArrowRightOutlined,
  LoginOutlined,
  IdcardOutlined,
  FormOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { getRole, isLoggedIn } from "../utils/authStore";

const { Title, Paragraph, Text } = Typography;

function roleColor(role) {
  if (role === "ADMIN") return "red";
  if (role === "AGENT") return "gold";
  if (role === "YOUTH") return "green";
  return "default";
}

function openPath(path) {
  window.location.assign(path);
}

export default function Home() {
  const loggedIn = isLoggedIn();
  const role = loggedIn ? getRole() : "GUEST";

  const quickActions = (() => {
    if (!loggedIn) {
      return [
        { key: "login", label: "Sign In", icon: <LoginOutlined />, onClick: () => openPath("/auth") },
        { key: "register", label: "Create Account", icon: <IdcardOutlined />, onClick: () => openPath("/auth") },
        { key: "help", label: "How it works", icon: <QuestionCircleOutlined />, onClick: () => document.getElementById("help")?.scrollIntoView({ behavior: "smooth" }) },
      ];
    }

    if (role === "ADMIN") {
      return [
        { key: "admin", label: "Open Admin Console", icon: <SettingOutlined />, onClick: () => openPath("/admin") },
        { key: "surveys", label: "Go to Surveys", icon: <FormOutlined />, onClick: () => openPath("/survey") },
        { key: "profile", label: "My Profile", icon: <IdcardOutlined />, onClick: () => openPath("/profile") },
      ];
    }

    // YOUTH / AGENT
    return [
      { key: "profile", label: "My Profile", icon: <IdcardOutlined />, onClick: () => openPath("/profile") },
      { key: "survey", label: "Fill Surveys", icon: <FormOutlined />, onClick: () => openPath("/survey") },
      { key: "help", label: "Help / Guide", icon: <QuestionCircleOutlined />, onClick: () => document.getElementById("help")?.scrollIntoView({ behavior: "smooth" }) },
    ];
  })();

  // mock summary by role (NO backend)
  const summary = (() => {
    if (!loggedIn) {
      return [
        { title: "Surveys Available", value: 2 },
        { title: "Profile Completion", value: "—" },
        { title: "My Youth Circle", value: "—" },
      ];
    }
    if (role === "ADMIN") {
      return [
        { title: "Total Users", value: 1240 },
        { title: "Total Surveys", value: 18 },
        { title: "Total Submissions", value: 6420 },
      ];
    }
    if (role === "AGENT") {
      return [
        { title: "Assigned District", value: "Colombo" },
        { title: "Active Youth Circles", value: 10 },
        { title: "Open Surveys", value: 2 },
      ];
    }
    // YOUTH
    return [
      { title: "Surveys Available", value: 2 },
      { title: "Completed Surveys", value: 1 },
      { title: "My Youth Circle", value: "Gampaha Youth Circle" },
    ];
  })();

  return (
    <div className="pageStack">
      <div className="heroWrap">
        <div className="heroBg" />
        <div className="heroContent">
          <Space direction="vertical" size={6} style={{ width: "100%" }}>
            <Space wrap size={10}>
              <Title level={2} style={{ margin: 0 }}>Welcome{loggedIn ? " back" : ""} 👋</Title>
              <Tag color={roleColor(role)}>{role || "GUEST"}</Tag>
              <Tag>{loggedIn ? "Signed in" : "Not signed in"}</Tag>
            </Space>

            <Paragraph type="secondary" style={{ margin: 0 }}>
              Your single place to manage profiles, youth circles, and surveys.
            </Paragraph>

            {!loggedIn ? (
              <Alert
                showIcon
                type="warning"
                message="You are not signed in"
                description="Sign in to access Profile and Surveys."
                action={
                  <Button type="primary" onClick={() => openPath("/auth")} icon={<ArrowRightOutlined />}>
                    Go to Login
                  </Button>
                }
              />
            ) : null}
          </Space>
        </div>
      </div>

      <Row gutter={[12, 12]}>
        <Col xs={24} lg={16}>
          <Card className="softCard" title="Quick Actions" extra={<Text type="secondary">Role-based shortcuts</Text>}>
            <Row gutter={[12, 12]}>
              {quickActions.map((a) => (
                <Col xs={24} md={8} key={a.key}>
                  <Button className="actionBtn" block size="large" onClick={a.onClick} icon={a.icon}>
                    {a.label}
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="softCard" title="Today Snapshot" extra={<Text type="secondary">Mock data</Text>}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
              <Statistic title={summary[0].title} value={summary[0].value} />
              <Divider style={{ margin: "8px 0" }} />
              <Statistic title={summary[1].title} value={summary[1].value} />
              <Divider style={{ margin: "8px 0" }} />
              <Statistic title={summary[2].title} value={summary[2].value} />
            </Space>
          </Card>
        </Col>
      </Row>

      <Card id="help" className="softCard" title="Help / How-to">
        <Paragraph type="secondary" style={{ marginTop: 0 }}>
          Follow these steps to get the best experience (works even without backend for now).
        </Paragraph>

        <List
          bordered
          dataSource={[
            loggedIn ? "✅ You’re signed in. Next: verify your Profile details." : "1) Sign in from the Auth module.",
            "2) Open Profile and complete required fields.",
            "3) Open Surveys and submit required surveys (duplicate submissions are blocked).",
            role === "ADMIN"
              ? "4) As Admin: open Admin Console to manage users and surveys."
              : "4) Need help? Check the placeholder pages for next steps.",
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />

        <Space wrap style={{ marginTop: 12 }}>
          <Button onClick={() => openPath("/profile")} disabled={!loggedIn} icon={<IdcardOutlined />}>
            Go to Profile
          </Button>
          <Button onClick={() => openPath("/survey")} disabled={!loggedIn} icon={<FormOutlined />}>
            Go to Surveys
          </Button>
          <Button type="primary" onClick={() => openPath("/auth")} icon={<LoginOutlined />}>
            Open Auth
          </Button>
        </Space>
      </Card>

      <Card className="softCard" title="Module Shortcuts">
        <Paragraph type="secondary" style={{ marginTop: 0 }}>
          These buttons open each micro-frontend module directly.
        </Paragraph>

        <Space wrap>
          <Button onClick={() => openPath("/auth")}>/auth</Button>
          <Button onClick={() => openPath("/profile")} disabled={!loggedIn}>/profile</Button>
          <Button onClick={() => openPath("/survey")} disabled={!loggedIn}>/survey</Button>
          <Button onClick={() => openPath("/admin")} disabled={role !== "ADMIN"}>/admin</Button>
        </Space>
      </Card>
    </div>
  );
}
