import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiGrid, FiLayers, FiUser, FiShield, FiAward, 
  FiMessageSquare, FiHome, FiImage, FiPhone, 
  FiShare2, FiFileText, FiSettings, FiLogOut, FiActivity
} from 'react-icons/fi';
import { mockAuthService } from '../config/api';

export default function AdminSidebar({ user, isOpen, onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
    { name: 'Hero Section', path: '/admin/hero', icon: FiLayers },
    { name: 'About', path: '/admin/about', icon: FiUser },
    { name: 'Insurance Plans', path: '/admin/plans', icon: FiShield },
    { name: 'Insurance Partners', path: '/admin/partners', icon: FiActivity },
    { name: 'Benefits', path: '/admin/benefits', icon: FiAward },
    { name: 'Media Library', path: '/admin/media', icon: FiImage },
    { name: 'Testimonials', path: '/admin/testimonials', icon: FiMessageSquare },
    { name: 'Real Estate', path: '/admin/real-estate', icon: FiHome },
    { name: 'Gallery', path: '/admin/gallery', icon: FiImage },
    { name: 'Contact', path: '/admin/contact', icon: FiPhone },
    { name: 'Social Links', path: '/admin/socials', icon: FiShare2 },
    { name: 'Quotes', path: '/admin/quotes', icon: FiFileText },
    { name: 'Settings', path: '/admin/settings', icon: FiSettings }
  ];

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await mockAuthService.logout();
      navigate('/admin/login');
    }
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`} style={{
      boxSizing: 'border-box'
    }}>
      <style>{`
        .sidebar-brand {
          padding: 24px;
          border-bottom: 1px solid var(--admin-border);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-icon {
          font-size: 1.6rem;
          color: var(--admin-gold);
        }
        .brand-name {
          font-family: 'Poppins', sans-serif;
          color: var(--admin-white);
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }
        .brand-badge {
          font-size: 0.65rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--admin-border-gold);
          color: var(--admin-gold);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          margin-left: auto;
        }
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          scrollbar-width: none;
        }
        .sidebar-nav::-webkit-scrollbar {
          display: none;
        }
        .nav-item-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: var(--admin-text-secondary);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          border-radius: 8px;
          transition: var(--admin-transition);
        }
        .nav-item-link:hover {
          color: var(--admin-white);
          background: rgba(255, 255, 255, 0.03);
        }
        .nav-item-link.active {
          color: var(--admin-white);
          background: rgba(212, 175, 55, 0.12);
          border-left: 3px solid var(--admin-gold);
          font-weight: 600;
        }
        .nav-icon {
          font-size: 1.1rem;
        }
        .sidebar-user {
          padding: 16px 20px;
          border-top: 1px solid var(--admin-border);
          background: rgba(5, 11, 20, 0.4);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #08111f 0%, #d4af37 100%);
          color: var(--admin-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
        }
        .user-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
        }
        .user-name {
          color: var(--admin-white);
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .user-role {
          color: var(--admin-text-muted);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .logout-btn {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--admin-text-muted);
          cursor: pointer;
          font-size: 1.1rem;
          padding: 6px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--admin-transition);
        }
        .logout-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }
        @media (max-width: 1023px) {
          .brand-name, .brand-badge, .nav-item-link span, .user-details, .logout-btn {
            display: flex !important;
          }
          .sidebar-nav {
            padding: 16px 12px;
          }
          .nav-item-link {
            justify-content: flex-start;
          }
        }
      `}</style>

      <div className="sidebar-brand">
        <FiActivity className="brand-icon" />
        <span className="brand-name">SR PANEL</span>
        <span className="brand-badge">ADMIN</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon className="nav-icon" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
        </div>
        <div className="user-details">
          <span className="user-name">{user?.name || 'Administrator'}</span>
          <span className="user-role">{user?.role || 'Super Admin'}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn" title="Log Out">
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
}
