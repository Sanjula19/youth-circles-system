import React from "react";
import { Result, Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Paragraph, Text } = Typography;

export default class ErrorBoundaryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || "Unknown error" };
  }

  componentDidCatch(error, errorInfo) {
    // Keep it simple: log for dev visibility
    // (No extra features added)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="A page error occurred. Try going back home or reloading."
          extra={[
            <Button key="home" type="primary">
              <Link to="/">Go Home</Link>
            </Button>,
            <Button key="retry" onClick={this.handleReset}>
              Try Again
            </Button>,
          ]}
        >
          <Paragraph>
            <Text strong>Error:</Text> <Text code>{this.state.errorMessage}</Text>
          </Paragraph>
        </Result>
      );
    }

    return this.props.children;
  }
}
