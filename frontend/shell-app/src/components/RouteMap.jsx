import { Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import AuthPlaceholder from "../pages/AuthPlaceholder";
import ProfilePlaceholder from "../pages/ProfilePlaceholder";
import SurveyPlaceholder from "../pages/SurveyPlaceholder";
import AdminPlaceholder from "../pages/AdminPlaceholder";
import NotFoundPage from "../pages/NotFoundPage";

import RoleGate from "./RoleGate";
import ErrorBoundaryView from "./ErrorBoundaryView";

export default function RouteMap() {
  return (
    <Routes>
      <Route
        element={
          <ErrorBoundaryView>
            <AppLayout />
          </ErrorBoundaryView>
        }
      >
        <Route index element={<Home />} />

        {/* IMPORTANT: no leading "/" for nested routes */}
        <Route path="auth" element={<AuthPlaceholder />} />
        <Route path="profile" element={<ProfilePlaceholder />} />
        <Route path="survey" element={<SurveyPlaceholder />} />

        <Route
          path="admin"
          element={
            <RoleGate allowed={["ADMIN"]}>
              <AdminPlaceholder />
            </RoleGate>
          }
        />

        {/* NotFound inside layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
