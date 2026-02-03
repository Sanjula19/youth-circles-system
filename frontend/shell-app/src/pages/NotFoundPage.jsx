import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="Page Not Found"
      subTitle="The page you’re looking for doesn’t exist."
      extra={
        <Button type="primary">
          <Link to="/">Back to Home</Link>
        </Button>
      }
    />
  );
}
