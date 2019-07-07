import React, { Component } from "react";
// import { persistor } from "./state/store";

import Logo from "./assets/images/logo.png";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // persistor.flush();
      // persistor.purge();
      return (
        <div>
          <div className="container text-center">
            <div className="get-started-title">
              <img src={Logo} alt="" />
              <p>Oops, something happened!</p>
              <a href="/">Restart App</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
