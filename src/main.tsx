import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Defense against external browser extension injected scripts (e.g. chrome-extension://... ff-content.js)
// that throw "Window message 'chrome: call method' timed out" or similar extension messaging errors
if (typeof window !== 'undefined') {
  const isExtensionError = (errorOrMessage: any, source?: string): boolean => {
    const str = String(
      errorOrMessage?.message ||
      errorOrMessage?.reason?.message ||
      errorOrMessage ||
      ''
    );
    const src = String(source || errorOrMessage?.filename || errorOrMessage?.stack || '');
    return (
      str.includes('chrome: call method') ||
      str.includes('Extension context invalidated') ||
      src.includes('chrome-extension://') ||
      src.includes('moz-extension://') ||
      src.includes('ff-content.js')
    );
  };

  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (isExtensionError(message, source) || isExtensionError(error)) {
      // Suppress external browser extension noise
      return true;
    }
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent) => {
      if (isExtensionError(event.reason)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'error',
    (event: ErrorEvent) => {
      if (isExtensionError(event.error, event.filename) || isExtensionError(event.message, event.filename)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
