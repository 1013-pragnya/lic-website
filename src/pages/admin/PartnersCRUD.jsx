import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { 
  FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiActivity, 
  FiEye, FiEyeOff, FiArrowUp, FiArrowDown, FiSearch, FiCheck, FiAlertCircle 
} from 'react-icons/fi';

export default function PartnersCRUD() {
  const { agentConfig, addPartner, updatePartner, deletePartner, reorderPartners } = useConfig();
  const partners = agentConfig?.partners || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activePartnerId, setActivePartnerId] = useState(null);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // File Upload states
  const [logoPreview, setLogoPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // Real-time Preview Form State
  const [previewName, setPreviewName] = useState('');
  const [previewDesc, setPreviewDesc] = useState('');
  const [previewButtonText, setPreviewButtonText] = useState('VIEW PLANS');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleCreate = () => {
    reset({
      name: '',
      logo: '',
      description: '',
      buttonText: 'VIEW PLANS',
      buttonLink: '',
      hidden: false
    });
    setLogoPreview('');
    setPreviewName('');
    setPreviewDesc('');
    setPreviewButtonText('VIEW PLANS');
    setView('create');
  };

  const handleEdit = (partner) => {
    setActivePartnerId(partner.id);
    reset({
      name: partner.name || '',
      logo: partner.logo || '',
      description: partner.description || '',
      buttonText: partner.buttonText || 'VIEW PLANS',
      buttonLink: partner.buttonLink || '',
      hidden: partner.hidden || false
    });
    setLogoPreview(partner.logo || '');
    setPreviewName(partner.name || '');
    setPreviewDesc(partner.description || '');
    setPreviewButtonText(partner.buttonText || 'VIEW PLANS');
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this insurance partner listing? This will immediately remove it from the homepage.')) {
      deletePartner(id);
    }
  };

  const handleToggleHide = (partner) => {
    updatePartner({
      ...partner,
      hidden: !partner.hidden
    });
  };

  const handleMove = (index, direction) => {
    const updated = [...partners];
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    if (swapWith >= 0 && swapWith < updated.length) {
      const temp = updated[index];
      updated[index] = updated[swapWith];
      updated[swapWith] = temp;
      reorderPartners(updated);
    }
  };

  // Convert uploaded logo to Base64
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('logo', reader.result);
      setLogoPreview(reader.result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Failed to read logo image.');
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    if (view === 'create') {
      addPartner(data);
      alert('Insurance partner added successfully!');
    } else {
      updatePartner({
        ...data,
        id: activePartnerId
      });
      alert('Insurance partner updated successfully!');
    }
    setView('list');
  };

  // Search and status filter logic
  const filtered = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'active' ? !p.hidden :
      p.hidden;
    return matchesSearch && matchesStatus;
  });

  // Paginated List
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedList = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-card">
      <style>{`
        .partner-preview-container {
          background: rgba(5, 10, 23, 0.4);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 250px;
        }
        .partner-preview-card {
          width: 100%;
          max-width: 220px;
          background: var(--bg-card);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          min-height: 240px;
          position: relative;
        }
        .partner-preview-logo-wrapper {
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border-glass);
          padding-bottom: 10px;
        }
        .partner-preview-logo {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
        }
      `}</style>

      <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="admin-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '4px' }}>
            <FiActivity /> Insurance Partners CMS
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Manage the carousel grid of trusted insurance providers. Update logos, names, button parameters, and reorder listings dynamically.
          </p>
        </div>
        {view === 'list' && (
          <button onClick={handleCreate} className="admin-btn admin-btn-primary">
            <FiPlus /> Add Partner Partner
          </button>
        )}
      </div>

      {view === 'list' ? (
        <>
          {/* Filtering & Search toolbar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            background: 'rgba(5, 10, 23, 0.3)',
            padding: '12px 20px',
            borderRadius: '8px',
            border: '1px solid var(--border-glass)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', minWidth: '260px' }}>
              <FiSearch style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="admin-input"
                style={{ paddingLeft: '36px', width: '100%', minHeight: '38px' }}
                placeholder="Search partners by name..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Status:</span>
              <select 
                className="admin-select" 
                style={{ minHeight: '38px', padding: '0 12px' }}
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Partners</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>

          {/* List View */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              No insurance partners found matching the filter criteria.
            </div>
          ) : (
            <>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Partner Name</th>
                      <th>Short Description</th>
                      <th>Button Link</th>
                      <th>Status</th>
                      <th>Display Order</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedList.map((partner) => {
                      const absoluteIndex = partners.findIndex(p => p.id === partner.id);
                      return (
                        <tr key={partner.id}>
                          <td>
                            {partner.logo ? (
                              <img 
                                src={partner.logo} 
                                alt={`${partner.name} logo`} 
                                style={{ width: '48px', height: '36px', objectFit: 'contain', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '4px' }} 
                              />
                            ) : (
                              <div style={{ width: '48px', height: '36px', background: 'rgba(212,175,55,0.1)', color: 'var(--primary-gold)', border: '1px solid var(--border-gold)', borderRadius: '4px', display: 'flex', alignItems: 'center', justify_content: 'center', fontSize: '0.6rem', fontWeight: '800' }}>
                                SVG
                              </div>
                            )}
                          </td>
                          <td>
                            <strong>{partner.name}</strong>
                          </td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {partner.description || <em style={{ color: 'var(--text-muted)' }}>No description</em>}
                          </td>
                          <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <code>{partner.buttonLink || '/'}</code>
                          </td>
                          <td>
                            <button
                              onClick={() => handleToggleHide(partner)}
                              className={`admin-btn ${partner.hidden ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                              style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              {partner.hidden ? (
                                <>
                                  <FiEyeOff /> <span>Inactive</span>
                                </>
                              ) : (
                                <>
                                  <FiEye /> <span>Active</span>
                                </>
                              )}
                            </button>
                          </td>
                          <td>
                            <div style={{ display: 'inline-flex', gap: '4px' }}>
                              <button
                                onClick={() => handleMove(absoluteIndex, 'up')}
                                disabled={absoluteIndex === 0}
                                className="admin-btn admin-btn-secondary"
                                style={{ padding: '6px 8px', opacity: absoluteIndex === 0 ? 0.3 : 1 }}
                                title="Move Up"
                              >
                                <FiArrowUp size={12} />
                              </button>
                              <button
                                onClick={() => handleMove(absoluteIndex, 'down')}
                                disabled={absoluteIndex === partners.length - 1}
                                className="admin-btn admin-btn-secondary"
                                style={{ padding: '6px 8px', opacity: absoluteIndex === partners.length - 1 ? 0.3 : 1 }}
                                title="Move Down"
                              >
                                <FiArrowDown size={12} />
                              </button>
                            </div>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button 
                                onClick={() => handleEdit(partner)} 
                                className="admin-btn admin-btn-secondary"
                                style={{ padding: '8px 12px' }}
                              >
                                <FiEdit />
                              </button>
                              <button 
                                onClick={() => handleDelete(partner.id)} 
                                className="admin-btn admin-btn-danger"
                                style={{ padding: '8px 12px' }}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="admin-btn admin-btn-secondary"
                  >
                    Previous
                  </button>
                  <span style={{ display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="admin-btn admin-btn-secondary"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        /* Create / Edit View + Live Preview Panel */
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="admin-form-group">
              <label className="admin-label">Company Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Star Health Insurance"
                {...register('name', { required: 'Company name is required' })}
                onChange={(e) => setPreviewName(e.target.value)}
              />
              {errors.name && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.name.message}</span>}
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Logo URL (Alternative)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. /logos/star.png (or upload below)"
                  {...register('logo')}
                  onChange={(e) => setLogoPreview(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Upload Company Logo (PNG/JPG)</label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  className="admin-input"
                  onChange={handleLogoUpload}
                />
                <small style={{ color: 'var(--text-muted)' }}>Auto-converts to offline local storage payload</small>
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">"View Plans" Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. VIEW PLANS"
                  {...register('buttonText')}
                  onChange={(e) => setPreviewButtonText(e.target.value || 'VIEW PLANS')}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Button Redirect Link</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. /insurance/star-health or #plans"
                  {...register('buttonLink', { required: 'Button redirect link is required' })}
                />
                {errors.buttonLink && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.buttonLink.message}</span>}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Optional Short Description</label>
              <textarea
                className="admin-input"
                style={{ minHeight: '80px' }}
                placeholder="Briefly summarize coverage specialties..."
                {...register('description')}
                onChange={(e) => setPreviewDesc(e.target.value)}
              />
            </div>

            <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="hidden-check"
                {...register('hidden')}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <label htmlFor="hidden-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
                Hide partner card (Inactive status)
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="admin-btn admin-btn-primary">
                <FiSave />
                <span>{view === 'create' ? 'Publish Partner' : 'Update Partner'}</span>
              </button>
              <button type="button" onClick={() => setView('list')} className="admin-btn admin-btn-secondary">
                <FiX />
                <span>Cancel</span>
              </button>
            </div>
          </form>

          {/* Real-time Preview Block */}
          <div>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Live Homepage Preview
            </h3>
            <div className="partner-preview-container">
              <div className="partner-preview-card">
                <div className="partner-preview-logo-wrapper">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="partner-preview-logo" />
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>[ No Logo Added ]</span>
                  )}
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--white)' }}>
                  {previewName || 'Company Name'}
                </span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', minHeight: '36px', margin: 0, lineHeight: '1.4' }}>
                  {previewDesc || 'Short description will appear here...'}
                </p>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-primary" 
                  style={{ width: '100%', fontSize: '0.78rem', padding: '8px 12px', marginTop: 'auto', pointerEvents: 'none' }}
                >
                  {previewButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
