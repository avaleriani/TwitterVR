import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    error: null,
    info: null
  };

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { error, info } = this.state;

    if (!error) {
      return this.props.children;
    }

    return (
      <div>
        <div>Woops : Looks like we have run into troubles</div>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            overflow: "scroll",
            height: 300
          }}
        >
          {info.componentStack}
        </pre>
      </div>
    );
  }
}

export default ErrorBoundary;
