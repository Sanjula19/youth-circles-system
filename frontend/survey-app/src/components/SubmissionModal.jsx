import { Modal, Descriptions, Typography, Empty } from "antd";

const { Text } = Typography;

export default function SubmissionModal({ open, onClose, submission, surveyTitle }) {
  return (
    <Modal
      title="Your Submission (mock)"
      open={open}
      onCancel={onClose}
      onOk={onClose}
      okText="Close"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      {!submission ? (
        <Empty description="No stored submission found" />
      ) : (
        <>
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Survey">
              {surveyTitle || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Submitted At">
              {submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Answers (raw)">
              <Text code style={{ whiteSpace: "pre-wrap" }}>
                {JSON.stringify(submission.answers || {}, null, 2)}
              </Text>
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
            This is mock storage from localStorage (will be replaced by backend later).
          </div>
        </>
      )}
    </Modal>
  );
}
