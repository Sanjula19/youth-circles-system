import { ConfigProvider, Result, Button } from "antd";
import { useEffect, useState } from "react";
import "./App.css";

import SurveyListPage from "./pages/SurveyListPage";
import SurveyFillPage from "./pages/SurveyFillPage";
import SurveySubmittedPage from "./pages/SurveySubmittedPage";

function getToken() {
  return localStorage.getItem("auth.token");
}

export default function App() {
  const [screen, setScreen] = useState("list"); // list | fill | submitted
  const [surveyId, setSurveyId] = useState(null);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const token = getToken();

  useEffect(() => {
    if (!token) {
      // keep UX consistent with other apps
      // redirect to auth app
      window.location.assign("/auth");
    }
  }, [token]);

  const goList = () => {
    setScreen("list");
    setSurveyId(null);
  };

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
      {screen === "list" && (
        <SurveyListPage
          onOpenSurvey={(id) => {
            setSurveyId(id);
            setScreen("fill");
          }}
        />
      )}

      {screen === "fill" && (
        <SurveyFillPage
          surveyId={surveyId}
          onBack={goList}
          onSubmitted={(info) => {
            setLastSubmitted(info);
            setScreen("submitted");
          }}
        />
      )}

      {screen === "submitted" && (
        <SurveySubmittedPage lastSubmitted={lastSubmitted} onBack={goList} />
      )}
    </ConfigProvider>
  );
}
