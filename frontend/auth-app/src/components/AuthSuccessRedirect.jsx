import { useEffect, useMemo } from "react";
import { Result } from "antd";

export default function AuthSuccessRedirect({
  title = "Success",
  subtitle = "Redirecting...",
  delayMs = 900,
}) {
  const shellUrl = useMemo(() => import.meta.env.VITE_SHELL_URL || "/", []);

  useEffect(() => {
    const t = setTimeout(() => {
      window.location.assign(shellUrl);
    }, delayMs);
    return () => clearTimeout(t);
  }, [delayMs, shellUrl]);

  return <Result status="success" title={title} subTitle={subtitle} />;
}
