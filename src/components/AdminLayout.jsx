import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FiExternalLink, FiCpu, FiWifi, FiMenu } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import '../pages/admin/AdminPanel.css';

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      const activeSession = localStorage.getItem('admin_session_active');
      if (activeSession) {
        setUser(JSON.parse(activeSession));
      }
    } catch (e) {
      console.error('Failed to parse admin session user:', e);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="admin-layout-wrapper">
      {isSidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      <AdminSidebar user={user} isOpen={isSidebarOpen} isMobile={isMobile} onClose={() => setIsSidebarOpen(false)} />

      <main className="admin-main-content" style={{ marginLeft: isMobile ? 0 : '260px' }}>
        <header className="admin-top-bar">
          <button className="mobile-menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Toggle Navigation">
            <FiMenu />
          </button>
          
          <div className="top-bar-stats">
            <div className="status-badge">
              <span className="status-dot-active" />
              <span>SYSTEM OK</span>
            </div>
            <div className="status-badge">
              <FiWifi className="status-icon" />
              <span>SECURE JWT ACTIVE</span>
            </div>
            <div className="status-badge">
              <FiCpu className="status-icon" />
              <span>VITE LIVE DEV</span>
            </div>
          </div>
          
          <Link to="/" className="view-site-btn" target="_blank" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--admin-border)',
            borderRadius: '8px',
            color: 'var(--admin-white)',
            fontSize: '0.85rem',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            height: '40px',
            boxSizing: 'border-box'
          }}>
            <FiExternalLink />
            <span>Open Public Site</span>
          </Link>
        </header>

        <section className="admin-page-viewport">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
