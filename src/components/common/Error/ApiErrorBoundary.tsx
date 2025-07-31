import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorInfoT from "./ErrorInfoT";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ApiErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary가 잡은 에러:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorInfoT error={this.state.error} />;
    }

    // 에러가 없으면, 자식 컴포넌트를 그대로 렌더링합니다.
    return this.props.children;
  }
}

export default ApiErrorBoundary;
