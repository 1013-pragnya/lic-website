import React, { Component } from 'react';
import { ShieldAlert } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050a17',
          color: 'white',
          padding: '24px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid #D4AF37',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <ShieldAlert size={60} color="#D4AF37" style={{ marginBottom: '24px', display: 'inline-block' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Admin Module Error</h2>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Something went wrong while rendering this admin screen. If you recently modified the site configuration or added corrupted files, please check your entries.
            </p>
            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#f87171',
              textAlign: 'left',
              marginBottom: '24px',
              wordBreak: 'break-all'
            }}>
              {this.state.error?.toString() || 'Unknown Runtime Exception'}
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  background: '#D4AF37',
                  color: '#050a17',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Reload Page
              </button>
              <button 
                onClick={() => window.location.href = '/admin'} 
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
