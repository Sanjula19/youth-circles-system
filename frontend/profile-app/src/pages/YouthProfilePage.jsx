import { Typography } from "antd";
import { useEffect, useState } from "react";

import ProfileForm from "../components/ProfileForm";
import YouthCircleView from "../components/YouthCircleView";
import ProfileSaveSuccess from "../components/ProfileSaveSuccess";
import ProfileSaveError from "../components/ProfileSaveError";
import ProfileSkeletonLoading from "../components/ProfileSkeletonLoading";

import { profile } from "../services/profile.service";

const { Title, Paragraph } = Typography;

export default function YouthProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saveOk, setSaveOk] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [data, setData] = useState({ profile: null, youthCircle: null });

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await profile.getMyProfile();
        if (!alive) return;
        setData({ profile: res.profile, youthCircle: res.youthCircle });
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onSave = async (values) => {
    setSaveOk(false);
    setSaveError(null);

    try {
      await profile.updateMyProfile(values);
      setSaveOk(true);
    } catch (e) {
      setSaveError(e);
    }
  };

  if (loading) return <ProfileSkeletonLoading />;

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <div style={{ width: 560 }}>
        <Title level={3}>YOUTH Profile</Title>
        <Paragraph type="secondary">profile-app (dummy stage)</Paragraph>

        <ProfileSaveSuccess visible={saveOk} />
        <ProfileSaveError error={saveError} />

        <ProfileForm initialValues={data.profile} onSave={onSave} />
        <YouthCircleView youthCircle={data.youthCircle} />
      </div>
    </div>
  );
}
