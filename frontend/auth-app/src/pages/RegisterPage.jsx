import { useState } from "react";

import AuthLayout from "../components/AuthLayout";
import AuthSuccessRedirect from "../components/AuthSuccessRedirect";
import RegisterWizard from "../components/RegisterWizard";

import { auth } from "../services/auth.service";
import { TokenSave } from "../utils/tokenSave";

export default function RegisterPage({ onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const completeRegistration = async (payload) => {
    setError(null);
    setLoading(true);
    try {
      const res = await auth.register(payload); // { token, role: "YOUTH" }
      TokenSave(res.token, res.role);
      setSuccess(true);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <AuthSuccessRedirect title="Registration complete" subtitle="Redirecting to Home..." />;
  }

  return (
    <AuthLayout
      title="Youth Registration"
      subtitle="Join the Youth Circles Community"
      markText="NY"
      bottom={
        <div className="bottomInline">
          Already have an account? <a onClick={() => onNavigate("login")}>Sign in here</a>
        </div>
      }
    >
      <RegisterWizard
        loading={loading}
        error={error}
        setError={setError}
        onCancel={() => onNavigate("login")}
        onComplete={completeRegistration}
      />
    </AuthLayout>
  );
}
