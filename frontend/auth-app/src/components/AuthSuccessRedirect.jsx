import { useEffect } from "react";
import { Result } from "antd";

export default function AuthSuccessRedirect({ title = "Success", subtitle = "Redirecting..." }) {
  useEffect(() => {
    const shellUrl = import.meta.env.VITE_SHELL_URL || "/";

    const t = setTimeout(() => {
      window.location.assign(shellUrl);
    }, 600);

    return () => clearTimeout(t);
  }, []);

  return <Result status="success" title={title} subTitle={subtitle} />;
}
