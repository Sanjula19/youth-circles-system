import { Result, Button, Space } from "antd";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <Result
      status="403"
      title="Access Denied"
      subTitle="You don’t have permission to view this page."
      extra={
        <Space>
          <Button type="primary">
            <Link to="/">Go Home</Link>
          </Button>
        </Space>
      }
    />
  );
}
