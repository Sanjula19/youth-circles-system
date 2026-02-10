import { Alert, Button, Col, Row, Space } from "antd";
import { useEffect, useState } from "react";

import PageShell from "../components/PageShell";
import AgentProfileForm from "../components/AgentProfileForm";
import AccountStatusCard from "../components/AccountStatusCard";
import ProfileSkeletonLoading from "../components/ProfileSkeletonLoading";

import { profile } from "../services/profile.service";

export default function AgentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [saveOk, setSaveOk] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [data, setData] = useState({ profile: null, account: null });
  const [loadError, setLoadError] = useState(null);

  const load = async () => {
    setLoadError(null);
    setLoading(true);
    try {
      const res = await profile.getMyProfile();
      setData({ profile: res.profile, account: res.account });
    } catch (e) {
      setLoadError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = async (values) => {
    setSaveOk(false);
    setSaveError(null);
    setSaving(true);
    try {
      await profile.updateMyProfile(values);
      setSaveOk(true);
      await load();
      setTimeout(() => setSaveOk(false), 2500);
    } catch (e) {
      setSaveError(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ProfileSkeletonLoading />;

  return (
    <PageShell
      title="Agent Profile"
      subtitle="Your district & office details help manage Youth Circles."
      extra={
        <Space>
          <Button onClick={load} disabled={loading || saving}>Refresh</Button>
        </Space>
      }
    >
      {loadError ? (
        <Alert
          type="error"
          showIcon
          message="Failed to load profile"
          description={loadError?.message || "Please try again."}
          action={<Button size="small" onClick={load}>Retry</Button>}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {saveOk ? (
        <Alert
          type="success"
          showIcon
          message="Profile updated successfully"
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {saveError ? (
        <Alert
          type="error"
          showIcon
          message="Update failed"
          description={saveError?.message || "Please check your details and try again."}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <AgentProfileForm initialValues={data.profile} onSave={onSave} saving={saving} />
        </Col>
        <Col xs={24} lg={8}>
          <AccountStatusCard account={data.account} />
        </Col>
      </Row>
    </PageShell>
  );
}
