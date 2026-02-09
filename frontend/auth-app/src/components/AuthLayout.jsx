import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function AuthLayout({
  title = "Youth Circles",
  subtitle = "National Youth Services Council",
  markText = "NY",
  children,
  bottom,
}) {
  return (
    <div className="authWrap">
      <div className="authInner">
        <div className="authHeader">
          <div className="authMark" aria-label="Brand">
            {markText}
          </div>
          <Title level={2} className="authAppTitle">
            {title}
          </Title>
          <Paragraph className="authAppSubtitle" type="secondary">
            {subtitle}
          </Paragraph>
        </div>

        {children}

        {bottom ? <div className="authBottom">{bottom}</div> : null}
      </div>
    </div>
  );
}
