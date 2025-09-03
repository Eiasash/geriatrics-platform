import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import App from './ui/App';
import './index.css';

// Initialize Sentry for error tracking (only if DSN is provided)
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    environment: import.meta.env.MODE,
  });
}

// Set language and RTL at runtime
const lang = (localStorage.getItem('lang') as 'en' | 'he') || 'en';
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

const ErrorBoundary = import.meta.env.VITE_SENTRY_DSN ? Sentry.ErrorBoundary : React.Fragment;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>An error has occurred. Please refresh the page.</div>} showDialog>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);