import React, { useState } from 'react';
import { useConfig } from '../../config/AppContext';
import { 
  FiFileText, FiPhoneCall, FiTrash2, FiMessageSquare, 
  FiPhone, FiMail, FiCalendar, FiClock, FiSearch, FiRefreshCw 
} from 'react-icons/fi';

export default function QuotesList() {
  const { 
    quotes, contacts, 
    updateQuoteStatus, deleteQuote, 
    updateContactStatus, deleteContact,
    agentConfig
  } = useConfig();

  const [activeTab, setActiveTab] = useState('quotes'); // 'quotes' or 'contacts'
  const [searchQuery, setSearchQuery] = useState('');

  // 1. WhatsApp launcher helpers
  const startWhatsAppChat = (lead, type) => {
    const firstName = agentConfig?.name?.split(' ')[0] || 'Advisor';
    let text = '';
    
    if (type === 'Quote') {
      text = `Hi ${lead.name}, I am ${agentConfig?.name}. I received your request for a ${lead.category} quote on my website. Let's connect.`;
    } else {
      text = `Hi ${lead.name}, I am ${agentConfig?.name}. I received your callback request regarding properties/policies. Let's schedule a call.`;
    }
    
    window.open(`https://wa.me/91${lead.phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // 2. Filter logic
  const filteredQuotes = quotes.filter(q => 
    q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.phone.includes(searchQuery) ||
    q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.message && c.message.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">
        <FiFileText /> Client Form Submissions
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Review and manage leads, change pipeline status, and contact clients directly via Phone, Email, or WhatsApp.
      </p>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '30px',
        background: 'rgba(5, 10, 23, 0.3)',
        padding: '16px 20px',
        borderRadius: '8px',
        border: '1px solid var(--border-glass)'
      }}>
        
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('quotes')}
            className="admin-btn"
            style={{
              background: activeTab === 'quotes' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'quotes' ? '#050a17' : 'var(--text-primary)',
              border: activeTab === 'quotes' ? 'none' : '1px solid var(--border-glass)'
            }}
          >
            <FiFileText /> Quotes ({quotes.length})
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className="admin-btn"
            style={{
              background: activeTab === 'contacts' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.03)',
              color: activeTab === 'contacts' ? '#050a17' : 'var(--text-primary)',
              border: activeTab === 'contacts' ? 'none' : '1px solid var(--border-glass)'
            }}
          >
            <FiPhoneCall /> Callbacks ({contacts.length})
          </button>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', minWidth: '280px' }}>
          <FiSearch style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="admin-input"
            style={{ paddingLeft: '36px', width: '100%' }}
            placeholder="Search by name, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Lists */}
      {activeTab === 'quotes' ? (
        /* Quotes Submissions */
        filteredQuotes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            No quote submissions found matching search.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Client</th>
                  <th>Contact Info</th>
                  <th>Inquiry Details</th>
                  <th>Message</th>
                  <th>Pipeline Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.85rem' }}>{new Date(lead.timestamp).toLocaleDateString()}</span>
                        <small style={{ color: 'var(--text-muted)' }}>
                          {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                    </td>
                    <td><strong>{lead.name}</strong></td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem' }}>
                        <a href={`tel:${lead.phone}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiPhone size={12} className="text-gold" /> {lead.phone}
                        </a>
                        <a href={`mailto:${lead.email}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiMail size={12} /> {lead.email}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          background: 'rgba(207, 168, 68, 0.1)',
                          border: '1px solid var(--border-gold)',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          color: 'var(--primary-gold)',
                          fontWeight: 700,
                          alignSelf: 'start'
                        }}>
                          {lead.provider}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lead.category}</span>
                      </div>
                    </td>
                    <td style={{ maxWidth: '240px', fontSize: '0.85rem' }}>{lead.message}</td>
                    <td>
                      <select 
                        value={lead.status}
                        onChange={(e) => updateQuoteStatus(lead.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-glass)',
                          background: 'rgba(5, 10, 23, 0.8)',
                          color: lead.status === 'New' ? '#ea580c' : lead.status === 'Contacted' ? '#3b82f6' : '#22c55e',
                          fontWeight: 600,
                          fontSize: '0.82rem'
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => startWhatsAppChat(lead, 'Quote')}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '8px 12px', color: '#22c55e', borderColor: 'rgba(34,197,94,0.2)' }}
                          title="Message on WhatsApp"
                        >
                          <FiMessageSquare />
                        </button>
                        <button 
                          onClick={() => deleteQuote(lead.id)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '8px 12px' }}
                          title="Delete Submission"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Callback Submissions */
        filteredContacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            No callback submissions found matching search.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Client</th>
                  <th>Contact Info</th>
                  <th>Interest Parameters</th>
                  <th>Message</th>
                  <th>Pipeline Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.85rem' }}>{new Date(contact.timestamp).toLocaleDateString()}</span>
                        <small style={{ color: 'var(--text-muted)' }}>
                          {new Date(contact.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </div>
                    </td>
                    <td><strong>{contact.name}</strong></td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.82rem' }}>
                        <a href={`tel:${contact.phone}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiPhone size={12} className="text-gold" /> {contact.phone}
                        </a>
                        <a href={`mailto:${contact.email}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <FiMail size={12} /> {contact.email}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.8rem' }}>
                        <span>Plan: <strong style={{ textTransform: 'capitalize' }}>{contact.plan}</strong></span>
                        <span>Property: <strong style={{ textTransform: 'capitalize' }}>{contact.propertyInterest}</strong></span>
                      </div>
                    </td>
                    <td style={{ maxWidth: '240px', fontSize: '0.85rem' }}>{contact.message}</td>
                    <td>
                      <select 
                        value={contact.status}
                        onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-glass)',
                          background: 'rgba(5, 10, 23, 0.8)',
                          color: contact.status === 'New' ? '#ea580c' : contact.status === 'Contacted' ? '#3b82f6' : '#22c55e',
                          fontWeight: 600,
                          fontSize: '0.82rem'
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button 
                          onClick={() => startWhatsAppChat(contact, 'Contact')}
                          className="admin-btn admin-btn-secondary"
                          style={{ padding: '8px 12px', color: '#22c55e', borderColor: 'rgba(34,197,94,0.2)' }}
                          title="Message on WhatsApp"
                        >
                          <FiMessageSquare />
                        </button>
                        <button 
                          onClick={() => deleteContact(contact.id)}
                          className="admin-btn admin-btn-danger"
                          style={{ padding: '8px 12px' }}
                          title="Delete Submission"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
