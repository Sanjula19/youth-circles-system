import { Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import AuthPlaceholder from "../pages/AuthPlaceholder";
import ProfilePlaceholder from "../pages/ProfilePlaceholder";
import SurveyPlaceholder from "../pages/SurveyPlaceholder";
import AdminPlaceholder from "../pages/AdminPlaceholder";
import NotFoundPage from "../pages/NotFoundPage";

import RoleGate from "../components/RoleGate";
import ErrorBoundaryView from "../components/ErrorBoundaryView";

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
        <Route path="/auth" element={<AuthPlaceholder />} />
        <Route path="/profile" element={<ProfilePlaceholder />} />
        <Route path="/survey" element={<SurveyPlaceholder />} />
        <Route
          path="/admin"
          element={
            <RoleGate allow={["ADMIN"]}>
              <AdminPlaceholder />
            </RoleGate>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
