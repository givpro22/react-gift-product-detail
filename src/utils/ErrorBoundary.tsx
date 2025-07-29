import React, { Component, type ReactNode } from "react";

interface Props {
  fallback: React.ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      if (typeof this.props.fallback === "function") {
        const fallbackRender = this.props.fallback as (
          error: Error
        ) => ReactNode;
        return fallbackRender(error!);
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}
