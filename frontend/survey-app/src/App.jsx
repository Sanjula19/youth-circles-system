import { ConfigProvider } from "antd";
import { useState } from "react";

import SurveyListPage from "./pages/SurveyListPage";
import SurveyFillPage from "./pages/SurveyFillPage";
import SurveySubmittedPage from "./pages/SurveySubmittedPage";

export default function App() {
  const [screen, setScreen] = useState("list"); // list | fill | submitted
  const [surveyId, setSurveyId] = useState(null);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const goList = () => {
    setScreen("list");
    setSurveyId(null);
  };

  return (
    <ConfigProvider>
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
