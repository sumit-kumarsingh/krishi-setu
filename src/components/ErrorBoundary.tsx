import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // If the error is from a browser extension (chrome-extension://), do not show crash UI
    if (
      error?.message?.includes('chrome: call method') ||
      error?.stack?.includes('chrome-extension://') ||
      error?.stack?.includes('moz-extension://')
    ) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (
      error?.message?.includes('chrome: call method') ||
      error?.stack?.includes('chrome-extension://') ||
      error?.stack?.includes('moz-extension://')
    ) {
      // Suppress extension errors from polluting application state
      return;
    }
    console.error('Uncaught application error:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-xl p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Application Encountered an Issue</h2>
              <p className="text-xs text-stone-400 mt-1">
                {this.state.error.message || 'An unexpected error occurred while rendering the page.'}
              </p>
            </div>
            <button
              type="button"
              onClick={this.handleReload}
              className="h-9 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
