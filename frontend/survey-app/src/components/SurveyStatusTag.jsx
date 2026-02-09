import { Tag } from "antd";

export default function SurveyStatusTag({ status }) {
  if (status === "COMPLETED") return <Tag color="green">COMPLETED</Tag>;
  if (status === "CLOSED") return <Tag color="red">CLOSED</Tag>;
  return <Tag color="blue">AVAILABLE</Tag>;
}
