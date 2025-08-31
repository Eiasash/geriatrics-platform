// Error Boundary Component for Graceful Error Handling
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and potentially to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Update state with error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Log to sessionStorage for debugging
    try {
      const errorLog = {
        timestamp: new Date().toISOString(),
        message: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href
      };
      
      const existingLogs = JSON.parse(sessionStorage.getItem('errorLogs') || '[]');
      existingLogs.push(errorLog);
      
      // Keep only last 10 errors
      if (existingLogs.length > 10) {
        existingLogs.shift();
      }
      
      sessionStorage.setItem('errorLogs', JSON.stringify(existingLogs));
    } catch (e) {
      console.error('Failed to log error to sessionStorage:', e);
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback, showDetails = false } = this.props;
      
      // Custom fallback UI if provided
      if (fallback) {
        return fallback(this.state.error, this.handleReset);
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#fff',
          border: '2px solid #ff1744',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#ff1744', marginBottom: '15px' }}>
            ⚠️ Something went wrong
          </h2>
          
          <p style={{ marginBottom: '15px', color: '#666' }}>
            We encountered an unexpected error. The error has been logged and our team will look into it.
          </p>

          {showDetails && this.state.error && (
            <details style={{ marginTop: '15px', marginBottom: '15px' }}>
              <summary style={{ cursor: 'pointer', color: '#667eea' }}>
                Error Details (for developers)
              </summary>
              <div style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                fontSize: '12px',
                fontFamily: 'monospace',
                overflow: 'auto'
              }}>
                <p><strong>Error:</strong> {this.state.error.toString()}</p>
                {this.state.error.stack && (
                  <pre style={{ marginTop: '10px', whiteSpace: 'pre-wrap' }}>
                    {this.state.error.stack}
                  </pre>
                )}
                {this.state.errorInfo && this.state.errorInfo.componentStack && (
                  <div style={{ marginTop: '10px' }}>
                    <strong>Component Stack:</strong>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: '10px 20px',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              Try Again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#48dbfb',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0abde3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#48dbfb'}
            >
              Refresh Page
            </button>
            
            <button
              onClick={() => window.history.back()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#feca57',
                color: '#333',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ff9ff3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#feca57'}
            >
              Go Back
            </button>
          </div>

          {this.state.errorCount > 2 && (
            <p style={{ 
              marginTop: '15px', 
              padding: '10px', 
              backgroundColor: '#fff3cd',
              borderRadius: '4px',
              color: '#856404'
            }}>
              ⚠️ Multiple errors detected. If this persists, please contact support.
            </p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = (Component, options = {}) => {
  return (props) => (
    <ErrorBoundary {...options}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

// Async Error Boundary for handling promise rejections
export class AsyncErrorBoundary extends ErrorBoundary {
  componentDidMount() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
  }

  handleUnhandledRejection = (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Treat it like a regular error
    this.componentDidCatch(
      new Error(event.reason?.message || 'Unhandled promise rejection'),
      { componentStack: 'Async operation' }
    );
    
    this.setState({ hasError: true, error: event.reason });
    
    // Prevent default browser behavior
    event.preventDefault();
  };
}

export default ErrorBoundary;