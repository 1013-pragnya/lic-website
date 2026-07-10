import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiLayers, FiArrowUp, FiArrowDown, FiEye, FiEyeOff } from 'react-icons/fi';

export default function HeroSection() {
  const { agentConfig, addBanner, updateBanner, deleteBanner, reorderBanners } = useConfig();
  const banners = agentConfig?.banners || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activeBannerId, setActiveBannerId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleCreate = () => {
    reset({
      badge: 'Authorized Advisor: LIC, Tata AIG, Care Health, Star Health',
      title: '',
      description: '',
      primaryButtonText: 'GET FREE QUOTE',
      secondaryButtonText: 'EXPLORE SERVICES',
      familiesCount: '1,200+',
      backgroundImage: '',
      hidden: false
    });
    setView('create');
  };

  const handleEdit = (banner) => {
    setActiveBannerId(banner.id);
    reset({
      badge: banner.badge || '',
      title: banner.title || '',
      description: banner.description || '',
      primaryButtonText: banner.primaryButtonText || '',
      secondaryButtonText: banner.secondaryButtonText || '',
      familiesCount: banner.familiesCount || '',
      backgroundImage: banner.backgroundImage || '',
      hidden: banner.hidden || false
    });
    setView('edit');
  };

  const handleDelete = (id) => {
    if (banners.length <= 1) {
      alert('You must keep at least one hero banner on the website.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this hero banner?')) {
      deleteBanner(id);
    }
  };

  const handleToggleHide = (banner) => {
    const updated = { ...banner, hidden: !banner.hidden };
    updateBanner(updated);
  };

  const handleMove = (index, direction) => {
    const updated = [...banners];
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    
    if (swapWith >= 0 && swapWith < updated.length) {
      const temp = updated[index];
      updated[index] = updated[swapWith];
      updated[swapWith] = temp;
      reorderBanners(updated);
    }
  };

  const onSubmit = (data) => {
    if (view === 'create') {
      addBanner(data);
      alert('Hero banner added successfully!');
    } else {
      updateBanner({
        ...data,
        id: activeBannerId
      });
      alert('Hero banner updated successfully!');
    }
    setView('list');
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="admin-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '4px' }}>
            <FiLayers /> Hero Banners Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Add, update, reorder, or toggle banners that appear in the homepage carousel.
          </p>
        </div>
        {view === 'list' && (
          <button onClick={handleCreate} className="admin-btn admin-btn-primary">
            <FiPlus /> Add New Banner
          </button>
        )}
      </div>

      {view === 'list' ? (
        /* List View */
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Background</th>
                <th>Title</th>
                <th>Sub-badge</th>
                <th>Status</th>
                <th>Reorder</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner.id}>
                  <td>
                    {banner.backgroundImage ? (
                      <img 
                        src={banner.backgroundImage} 
                        alt="Hero background" 
                        style={{ width: '60px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} 
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=200'; }}
                      />
                    ) : (
                      <div style={{ width: '60px', height: '40px', borderRadius: '4px', background: 'linear-gradient(135deg, #091024, #050a17)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                        Gradient
                      </div>
                    )}
                  </td>
                  <td>
                    <strong>{banner.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Primary: {banner.primaryButtonText || 'None'} | Secondary: {banner.secondaryButtonText || 'None'}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {banner.badge}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleHide(banner)}
                      className={`admin-btn ${banner.hidden ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {banner.hidden ? (
                        <>
                          <FiEyeOff /> <span>Hidden</span>
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
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '6px 8px', opacity: index === 0 ? 0.3 : 1 }}
                        title="Move Up"
                      >
                        <FiArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === banners.length - 1}
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '6px 8px', opacity: index === banners.length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <FiArrowDown size={12} />
                      </button>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleEdit(banner)} 
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '8px 12px' }}
                        title="Edit Banner"
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(banner.id)} 
                        className="admin-btn admin-btn-danger"
                        style={{ padding: '8px 12px' }}
                        title="Delete Banner"
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
      ) : (
        /* Create / Edit View */
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="admin-form-group">
            <label className="admin-label">Trust Badge Label</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Authorized Advisor: LIC, Tata AIG..."
              {...register('badge', { required: 'Badge subtitle is required' })}
            />
            {errors.badge && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.badge.message}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Main Heading Title</label>
            <textarea
              className="admin-input"
              style={{ minHeight: '80px' }}
              placeholder="e.g. SECURE YOUR FUTURE WITH INSURANCE & REAL ESTATE"
              {...register('title', { required: 'Main title is required' })}
            />
            {errors.title && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.title.message}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Hero Description Text</label>
            <textarea
              className="admin-input"
              style={{ minHeight: '100px' }}
              placeholder="Provide a detailed subtitle message to show on the slide..."
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.description.message}</span>}
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Primary Button CTA Text</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. GET FREE QUOTE"
                {...register('primaryButtonText')}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Secondary Button CTA Text</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. EXPLORE SERVICES"
                {...register('secondaryButtonText')}
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Families Protected / Live Count Indicator</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. 1,200+"
                {...register('familiesCount')}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Custom Background Image URL</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. https://images.unsplash.com/... (leave blank for space-blue overlay)"
                {...register('backgroundImage')}
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', marginBottom: '24px' }}>
            <input
              type="checkbox"
              id="hidden-check"
              {...register('hidden')}
              style={{ cursor: 'pointer', width: '18px', height: '18px' }}
            />
            <label htmlFor="hidden-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
              Hide this banner (Draft status)
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <FiSave />
              <span>{view === 'create' ? 'Create Banner' : 'Update Banner'}</span>
            </button>
            <button type="button" onClick={() => setView('list')} className="admin-btn admin-btn-secondary">
              <FiX />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
