import React from 'react';

class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Admin Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', background: '#fff' }}>
          <h2 style={{ color: '#dc3545' }}>Oops! Something went wrong in this section.</h2>
          <p>This is likely due to a missing dependency or a data loading error.</p>
          <div style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '5px', 
            margin: '20px 0',
            textAlign: 'left',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflowX: 'auto'
          }}>
            {this.state.error && this.state.error.toString()}
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#2c3e50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminErrorBoundary;
