import { Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import AuthPlaceholder from "../pages/AuthPlaceholder";
import ProfilePlaceholder from "../pages/ProfilePlaceholder";
import SurveyPlaceholder from "../pages/SurveyPlaceholder";
import AdminPlaceholder from "../pages/AdminPlaceholder";

export default function RouteMap() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPlaceholder />} />
        <Route path="/profile" element={<ProfilePlaceholder />} />
        <Route path="/survey" element={<SurveyPlaceholder />} />
        <Route path="/admin" element={<AdminPlaceholder />} />
      </Route>
    </Routes>
  );
}
