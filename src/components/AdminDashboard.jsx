import React, { useState, useEffect } from 'react';
import { X, Search, Trash2, Calendar, FileDown, CheckCircle2, RefreshCw, Lock, MessageSquare, PhoneCall, Mail } from 'lucide-react';
import { agentConfig } from '../config/agentConfig';
import Button from './Button';
import './AdminDashboard.css';

export default function AdminDashboard({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProvider, setFilterProvider] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  // Load leads from localStorage
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadLeads();
    }
  }, [isOpen, isAuthenticated]);

  const loadLeads = () => {
    try {
      const data = JSON.parse(localStorage.getItem('rrfs_quotes') || '[]');
      setLeads(data);
    } catch (err) {
      console.error('Failed to load leads:', err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '1234') {
      setIsAuthenticated(true);
      setLoginError('');
      setPasscode('');
    } else {
      setLoginError('Invalid passcode. Hint: Use 1234');
      setPasscode('');
    }
  };

  const handleStatusChange = (leadId, newStatus) => {
    const updated = leads.map(l => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('rrfs_quotes', JSON.stringify(updated));
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const filtered = leads.filter(l => l.id !== leadId);
      setLeads(filtered);
      localStorage.setItem('rrfs_quotes', JSON.stringify(filtered));
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return alert('No lead data to export.');
    
    // Build CSV content
    const headers = ['Timestamp', 'Full Name', 'Phone', 'Email', 'Provider', 'Category', 'Message', 'Status'];
    const rows = filteredLeads.map(l => [
      l.timestamp,
      l.name.replace(/"/g, '""'),
      l.phone,
      l.email,
      l.provider,
      l.category,
      (l.message || '').replace(/"/g, '""').replace(/\n/g, ' '),
      l.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(r => r.map(val => `"${val}"`).join(','))].join('\n');
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `quotes_leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startWhatsAppChat = (lead) => {
    const text = encodeURIComponent(`Hi ${lead.name}, I am ${agentConfig.name}. I received your request for a ${lead.category} quote. Let's connect.`);
    window.open(`https://wa.me/91${lead.phone}?text=${text}`, '_blank');
  };

  // Filter logic
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesProvider = filterProvider === 'All' || lead.provider === filterProvider;
    const matchesCategory = filterCategory === 'All' || lead.category === filterCategory;
    
    return matchesSearch && matchesProvider && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="admin-dashboard-backdrop" onClick={onClose}>
      <div className="admin-dashboard-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header bar */}
        <div className="dashboard-header">
          <div className="dashboard-title-box">
            <Lock className="text-gold" size={22} />
            <h3>Lead Database & Inquiry Manager</h3>
          </div>
          <button className="dashboard-close-btn" onClick={onClose} aria-label="Close dashboard">
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="lockscreen-wrapper fade-in">
            <form onSubmit={handleLogin} className="lockscreen-card glass-panel">
              <div className="lock-icon-circle float-animation">
                <Lock size={32} className="text-gold" />
              </div>
              <h4>Administrator Sign In</h4>
              <p>Enter the admin passcode to access your client inquiries.</p>
              
              <div className="form-group">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (1234)"
                  required
                  autoFocus
                  className="form-input glass-input text-center"
                />
              </div>
              
              {loginError && <span className="auth-error-msg">{loginError}</span>}
              
              <Button type="submit" variant="primary" className="w-100">
                Unlock Leads
              </Button>
            </form>
          </div>
        ) : (
          /* Leads List Screen */
          <div className="dashboard-content fade-in">
            
            {/* Filter and search toolbar */}
            <div className="dashboard-toolbar">
              <div className="search-bar-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search name, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input glass-input"
                />
              </div>
              
              <div className="filters-box">
                <select
                  value={filterProvider}
                  onChange={(e) => setFilterProvider(e.target.value)}
                  className="filter-select glass-input"
                >
                  <option value="All">All Providers</option>
                  <option value="LIC">LIC</option>
                  <option value="Tata AIG">Tata AIG</option>
                  <option value="Care Health Insurance">Care Health</option>
                  <option value="Star Health Insurance">Star Health</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="filter-select glass-input"
                >
                  <option value="All">All Categories</option>
                  <option value="Life Insurance">Life Insurance</option>
                  <option value="Health Insurance">Health Insurance</option>
                  <option value="Motor Insurance">Motor Insurance</option>
                  <option value="Investment Plans">Investment Plans</option>
                </select>
              </div>

              <div className="toolbar-actions">
                <Button variant="outline" onClick={exportLeadsToCSV} className="export-btn">
                  <FileDown size={16} /> Export CSV
                </Button>
                <Button variant="secondary" onClick={loadLeads} className="refresh-btn">
                  <RefreshCw size={14} />
                </Button>
              </div>
            </div>

            {/* Table Area */}
            <div className="table-responsive">
              {filteredLeads.length === 0 ? (
                <div className="empty-leads-view">
                  <ClipboardCheck size={48} className="text-muted mb-3" />
                  <p>No customer inquiries match your current filters.</p>
                </div>
              ) : (
                <table className="leads-table">
                  <thead>
                    <tr>
                      <th>Time Received</th>
                      <th>Client Name</th>
                      <th>Inquiry For</th>
                      <th>Contact Info</th>
                      <th>Requirements</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <div className="td-time">
                            <Calendar size={13} className="text-gold" />
                            <span>{new Date(lead.timestamp).toLocaleDateString()}<br/>
                            <small>{new Date(lead.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small></span>
                          </div>
                        </td>
                        <td>
                          <strong className="lead-name">{lead.name}</strong>
                        </td>
                        <td>
                          <div className="td-plans">
                            <span className="badge-provider">{lead.provider}</span>
                            <span className="badge-category">{lead.category}</span>
                          </div>
                        </td>
                        <td>
                          <div className="td-contact">
                            <a href={`tel:${lead.phone}`} className="contact-item"><PhoneCall size={12} /> {lead.phone}</a>
                            <a href={`mailto:${lead.email}`} className="contact-item"><Mail size={12} /> {lead.email}</a>
                          </div>
                        </td>
                        <td>
                          <div className="td-message" title={lead.message}>
                            {lead.message}
                          </div>
                        </td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`status-indicator status-${lead.status.toLowerCase()}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </td>
                        <td>
                          <div className="td-actions">
                            <button
                              onClick={() => startWhatsAppChat(lead)}
                              className="act-btn btn-wa"
                              title="Message via WhatsApp"
                            >
                              <MessageSquare size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="act-btn btn-del"
                              title="Delete Record"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            
            <div className="dashboard-footer">
              <span>Showing {filteredLeads.length} of {leads.length} stored quote enquiries. Passcode locked.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
