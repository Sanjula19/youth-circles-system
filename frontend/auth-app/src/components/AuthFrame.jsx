import { Typography } from "antd";

const { Title, Paragraph } = Typography;

export default function AuthFrame({ title, subtitle, children, footer }) {
  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authBrand">
          <div className="authMark" aria-label="NYSC">
            NYSC
          </div>
        </div>

        <Title level={2} className="authTitle">
          {title}
        </Title>
        {subtitle ? (
          <Paragraph className="authSubtitle" type="secondary">
            {subtitle}
          </Paragraph>
        ) : null}

        <div className="authBody">{children}</div>

        {footer ? <div className="authFooter">{footer}</div> : null}
      </div>
    </div>
  );
}
