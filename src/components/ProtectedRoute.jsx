import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { mockAuthService } from '../config/api';

export default function ProtectedRoute({ children }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await mockAuthService.verifyToken();
        setIsAuthenticated(result.isValid);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsVerifying(false);
      }
    };
    checkAuth();
  }, [location.pathname]);

  if (isVerifying) {
    // Premium theme-aligned glass spinner
    return (
      <div 
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050a17',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          gap: '16px'
        }}
      >
        <style>{`
          .auth-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.05);
            border-top: 3px solid var(--primary-gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            box-shadow: 0 0 15px rgba(207, 168, 68, 0.15);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div className="auth-spinner" />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', fontWeight: 500 }}>
          VERIFYING ADMNISTRATOR SESSION...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
