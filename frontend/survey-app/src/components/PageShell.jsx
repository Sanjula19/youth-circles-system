import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function PageShell({ title, subtitle, extra, children }) {
  return (
    <div className="page">
      <div className="pageHeader">
        <div>
          <Title level={3} className="pageTitle">{title}</Title>
          {subtitle ? (
            <Paragraph type="secondary" className="pageSubtitle">
              {subtitle}
            </Paragraph>
          ) : null}
        </div>

        {extra ? <div className="pageHeaderExtra">{extra}</div> : null}
      </div>

      <div className="pageBody">{children}</div>
    </div>
  );
}
