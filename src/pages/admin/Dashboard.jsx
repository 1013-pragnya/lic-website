import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiFileText, FiPhoneCall, FiShield, FiHome, 
  FiArrowRight, FiDownload, FiCheckCircle, FiClock, FiPlusCircle 
} from 'react-icons/fi';
import { useConfig } from '../../config/AppContext';

export default function Dashboard() {
  const { agentConfig, quotes, contacts, updateQuoteStatus, updateContactStatus } = useConfig();
  const navigate = useNavigate();

  // Calculations for stats
  const totalQuotes = quotes.length;
  const newQuotes = quotes.filter(q => q.status === 'New').length;
  const resolvedQuotes = quotes.filter(q => q.status === 'Resolved').length;

  const totalContacts = contacts.length;
  const newContacts = contacts.filter(c => c.status === 'New').length;

  const totalPlans = agentConfig?.plans?.length || 0;
  const totalProperties = agentConfig?.realEstate?.length || 0;

  // Combine inquiries for recent activity feed
  const combinedInquiries = [
    ...quotes.map(q => ({ ...q, type: 'Quote' })),
    ...contacts.map(c => ({ ...c, type: 'Contact' }))
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const recentInquiries = combinedInquiries.slice(0, 5);

  const exportLeadsToCSV = () => {
    if (quotes.length === 0) return alert('No quote data to export.');
    
    const headers = ['Timestamp', 'Type', 'Client Name', 'Phone', 'Email', 'Details', 'Message', 'Status'];
    const rows = combinedInquiries.map(l => [
      l.timestamp,
      l.type,
      l.name.replace(/"/g, '""'),
      l.phone,
      l.email,
      l.type === 'Quote' ? `${l.provider} (${l.category})` : `Plan: ${l.plan}, Prop: ${l.propertyInterest}`,
      (l.message || '').replace(/"/g, '""').replace(/\n/g, ' '),
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.map(val => `"${val}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `all_client_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="dashboard-container"
    >
      <style>{`
        .dashboard-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .dashboard-title {
          font-family: var(--font-heading);
          color: var(--admin-white);
          font-size: 1.8rem;
          font-weight: 800;
        }
        .dashboard-subtitle {
          color: var(--admin-text-secondary);
          font-size: 0.9rem;
          margin-top: 4px;
        }
        .stat-icon-wrapper-admin {
          width: 54px;
          height: 54px;
          border-radius: 10px;
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid var(--admin-border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--admin-gold);
          font-size: 1.5rem;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-val-admin {
          color: var(--admin-white);
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1;
        }
        .stat-lbl-admin {
          color: var(--admin-text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .stat-subtext-admin {
          font-size: 0.72rem;
          color: var(--admin-text-muted);
          margin-top: 2px;
        }
        .dashboard-layout-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
          margin-bottom: 40px;
        }
        .quick-actions-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .quick-action-btn {
          width: 100%;
          min-height: 48px;
          padding: 12px 20px;
          background: rgba(13, 24, 49, 0.3);
          border: 1px solid var(--admin-border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--admin-white);
          cursor: pointer;
          transition: var(--admin-transition);
          font-size: 0.9rem;
          font-weight: 600;
        }
        .quick-action-btn:hover {
          background: rgba(212, 175, 55, 0.08);
          border-color: var(--admin-border-gold);
          color: var(--admin-gold);
          transform: translateX(4px) scale(1.02);
        }
        .badge-type {
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .badge-type.quote {
          background: rgba(212, 175, 55, 0.1);
          color: var(--admin-gold);
          border: 1px solid var(--admin-border-gold);
        }
        .badge-type.contact {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        .badge-status {
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }
        .badge-status.new {
          background: rgba(234, 88, 12, 0.1);
          color: #ea580c;
        }
        .badge-status.contacted {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }
        .badge-status.resolved {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }
        @media (max-width: 1024px) {
          .dashboard-layout-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        @media (max-width: 640px) {
          .dashboard-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .dashboard-header-row .admin-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="dashboard-header-row">
        <div>
          <h1 className="dashboard-title">System Overview</h1>
          <p className="dashboard-subtitle">Real-time statistics & customer inquiries management</p>
        </div>
        <button onClick={exportLeadsToCSV} className="admin-btn admin-btn-secondary">
          <FiDownload />
          <span>Export All Leads (CSV)</span>
        </button>
      </div>

      {/* Stats Cards */}
      <motion.div variants={containerVariants} className="stats-grid">
        <motion.div variants={itemVariants} className="stat-card-admin">
          <div className="stat-icon-wrapper-admin">
            <FiFileText />
          </div>
          <div className="stat-info">
            <span className="stat-val-admin">{totalQuotes}</span>
            <span className="stat-lbl-admin">Quote Requests</span>
            <span className="stat-subtext-admin">{newQuotes} new submissions</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="stat-card-admin">
          <div className="stat-icon-wrapper-admin" style={{ color: '#3b82f6', background: 'rgba(59,130,246,0.05)', borderColor: 'rgba(59,130,246,0.2)' }}>
            <FiPhoneCall />
          </div>
          <div className="stat-info">
            <span className="stat-val-admin">{totalContacts}</span>
            <span className="stat-lbl-admin">Contact Requests</span>
            <span className="stat-subtext-admin">{newContacts} active inquiries</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="stat-card-admin">
          <div className="stat-icon-wrapper-admin">
            <FiShield />
          </div>
          <div className="stat-info">
            <span className="stat-val-admin">{totalPlans}</span>
            <span className="stat-lbl-admin">Active Plans</span>
            <span className="stat-subtext-admin">LIC Insurance products</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="stat-card-admin">
          <div className="stat-icon-wrapper-admin" style={{ color: '#22c55e', background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.2)' }}>
            <FiHome />
          </div>
          <div className="stat-info">
            <span className="stat-val-admin">{totalProperties}</span>
            <span className="stat-lbl-admin">Listed Properties</span>
            <span className="stat-subtext-admin">Residential & Commercial</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main dashboard body */}
      <div className="dashboard-layout-grid">
        
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="admin-card">
          <h2 className="admin-card-title">
            <FiClock /> Recent Submissions
          </h2>
          {recentInquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              No inquiries found in database.
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Topic</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInquiries.map((inq) => (
                    <tr key={inq.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/quotes')}>
                      <td>{new Date(inq.timestamp).toLocaleDateString()}<br/>
                      <small style={{ color: 'var(--text-muted)' }}>{new Date(inq.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></td>
                      <td>
                        <span className={`badge-type ${inq.type.toLowerCase()}`}>{inq.type}</span>
                      </td>
                      <td><strong>{inq.name}</strong></td>
                      <td>
                        {inq.type === 'Quote' ? `${inq.provider} - ${inq.category}` : `General Callback`}
                      </td>
                      <td>
                        <span className={`badge-status ${inq.status.toLowerCase()}`}>{inq.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="quick-actions-panel">
          <h3 className="admin-card-title" style={{ border: 'none', marginBottom: '8px' }}>Quick Actions</h3>
          
          <button className="quick-action-btn" onClick={() => navigate('/admin/quotes')}>
            <span>View All Client Inquiries</span>
            <FiArrowRight />
          </button>
          <button className="quick-action-btn" onClick={() => navigate('/admin/plans')}>
            <span>Manage Insurance Plans</span>
            <FiPlusCircle />
          </button>
          <button className="quick-action-btn" onClick={() => navigate('/admin/real-estate')}>
            <span>Add Real Estate Listing</span>
            <FiPlusCircle />
          </button>
          <button className="quick-action-btn" onClick={() => navigate('/admin/settings')}>
            <span>Customize Site Colors & SEO</span>
            <FiArrowRight />
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
