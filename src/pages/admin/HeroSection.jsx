import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { 
  FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiLayers, 
  FiArrowUp, FiArrowDown, FiEye, FiEyeOff, FiSliders, FiMonitor, FiSmartphone 
} from 'react-icons/fi';

export default function HeroSection() {
  const { 
    agentConfig, addBanner, updateBanner, deleteBanner, reorderBanners, updateSliderSettings 
  } = useConfig();
  
  const banners = agentConfig?.banners || [];
  const sliderSettings = agentConfig?.sliderSettings || {
    autoPlay: true,
    duration: 5000,
    transitionSpeed: 0.8,
    animationType: 'fade',
    infiniteLoop: true,
    showDots: true,
    showArrows: true
  };

  const [activeTab, setActiveTab] = useState('banners'); // 'banners', 'settings'
  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activeBannerId, setActiveBannerId] = useState(null);

  // Live Previews state
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop', 'mobile'
  const [logoPreviewDesktop, setLogoPreviewDesktop] = useState('');
  const [logoPreviewMobile, setLogoPreviewMobile] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Live fields
  const [liveTitle, setLiveTitle] = useState('');
  const [liveSubtitle, setLiveSubtitle] = useState('');
  const [liveBadge, setLiveBadge] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  
  // Slider Settings Form
  const { register: registerSettings, handleSubmit: handleSubmitSettings } = useForm({
    defaultValues: sliderSettings
  });

  const handleCreate = () => {
    reset({
      badge: 'Authorized Advisor: LIC, Tata AIG, Care Health, Star Health',
      title: '',
      description: '',
      primaryButtonText: 'GET FREE QUOTE',
      primaryButtonLink: '#contact',
      secondaryButtonText: 'EXPLORE SERVICES',
      secondaryButtonLink: '#plans',
      familiesCount: '1,200+',
      backgroundImage: '',
      mobileImage: '',
      hidden: false
    });
    setLogoPreviewDesktop('');
    setLogoPreviewMobile('');
    setLiveBadge('Authorized Advisor: LIC, Tata AIG, Care Health, Star Health');
    setLiveTitle('');
    setLiveSubtitle('');
    setView('create');
  };

  const handleEdit = (banner) => {
    setActiveBannerId(banner.id);
    reset({
      badge: banner.badge || '',
      title: banner.title || '',
      description: banner.description || '',
      primaryButtonText: banner.primaryButtonText || '',
      primaryButtonLink: banner.primaryButtonLink || '',
      secondaryButtonText: banner.secondaryButtonText || '',
      secondaryButtonLink: banner.secondaryButtonLink || '',
      familiesCount: banner.familiesCount || '',
      backgroundImage: banner.backgroundImage || '',
      mobileImage: banner.mobileImage || '',
      hidden: banner.hidden || false
    });
    setLogoPreviewDesktop(banner.backgroundImage || '');
    setLogoPreviewMobile(banner.mobileImage || '');
    setLiveBadge(banner.badge || '');
    setLiveTitle(banner.title || '');
    setLiveSubtitle(banner.description || '');
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

  // Convert uploaded image to Base64
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(field, reader.result);
      if (field === 'backgroundImage') {
        setLogoPreviewDesktop(reader.result);
      } else {
        setLogoPreviewMobile(reader.result);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Failed to read image.');
    };
    reader.readAsDataURL(file);
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

  const onSubmitSettings = (data) => {
    // Convert text parameters to numbers
    const formatted = {
      ...data,
      duration: Number(data.duration),
      transitionSpeed: Number(data.transitionSpeed)
    };
    updateSliderSettings(formatted);
    alert('Carousel settings updated successfully!');
  };

  return (
    <div className="admin-card">
      <style>{`
        .cms-tab-nav {
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--border-glass);
          margin-bottom: 24px;
          padding-bottom: 2px;
        }
        .cms-tab-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 10px 18px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .cms-tab-btn.active {
          color: var(--primary-gold);
          border-bottom-color: var(--primary-gold);
        }
        .live-preview-box {
          background: #050a17;
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .device-selector {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .device-btn {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-glass);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .device-btn.active {
          background: var(--primary-gold);
          color: #050a17;
          border-color: var(--primary-gold);
        }
        .desktop-preview-viewport {
          width: 100%;
          aspect-ratio: 16/9;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.06);
          background-size: cover;
          background-position: center;
        }
        .mobile-preview-viewport {
          width: 260px;
          height: 480px;
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 4px solid #222;
          background-size: cover;
          background-position: center;
        }
        .preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 45%, rgba(15, 23, 42, 0.2) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
          color: white;
        }
        .preview-overlay-mobile {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.9) 70%, rgba(15, 23, 42, 0.98) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          box-sizing: border-box;
          color: white;
        }
      `}</style>

      <div className="cms-tab-nav">
        <button 
          onClick={() => { setActiveTab('banners'); setView('list'); }} 
          className={`cms-tab-btn ${activeTab === 'banners' ? 'active' : ''}`}
        >
          <FiLayers /> Homepage Banners
        </button>
        <button 
          onClick={() => setActiveTab('settings')} 
          className={`cms-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
        >
          <FiSliders /> Carousel Settings
        </button>
      </div>

      {activeTab === 'banners' ? (
        /* Tab 1: Manage Banners */
        <>
          <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 className="admin-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '4px' }}>
                Manage Slides
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Add, edit, reorder, or enable/disable banners displayed in the homepage slideshow.
              </p>
            </div>
            {view === 'list' && (
              <button onClick={handleCreate} className="admin-btn admin-btn-primary">
                <FiPlus /> Add Slide
              </button>
            )}
          </div>

          {view === 'list' ? (
            /* Banners List Table */
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Desktop Preview</th>
                    <th>Mobile Preview</th>
                    <th>Heading</th>
                    <th>Status</th>
                    <th>Display Order</th>
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
                            alt="Desktop Banner" 
                            style={{ width: '60px', height: '36px', borderRadius: '4px', objectFit: 'cover' }} 
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=200'; }}
                          />
                        ) : (
                          <div style={{ width: '60px', height: '36px', borderRadius: '4px', background: 'linear-gradient(135deg, #091024, #050a17)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                            Gradient
                          </div>
                        )}
                      </td>
                      <td>
                        {banner.mobileImage ? (
                          <img 
                            src={banner.mobileImage} 
                            alt="Mobile Banner" 
                            style={{ width: '30px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} 
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=150'; }}
                          />
                        ) : (
                          <div style={{ width: '30px', height: '40px', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                            Same
                          </div>
                        )}
                      </td>
                      <td>
                        <strong>{banner.title}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Primary: <code>{banner.primaryButtonLink}</code> | Secondary: <code>{banner.secondaryButtonLink || 'None'}</code>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleHide(banner)}
                          className={`admin-btn ${banner.hidden ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                          style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          {banner.hidden ? (
                            <>
                              <FiEyeOff /> <span>Disabled</span>
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
                          >
                            <FiEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(banner.id)} 
                            className="admin-btn admin-btn-danger"
                            style={{ padding: '8px 12px' }}
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
            /* Add / Edit Slide + Live Preview Panel */
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="admin-form-group">
                  <label className="admin-label">Highlight Badge Text</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Authorized Advisor: LIC, Tata AIG..."
                    {...register('badge')}
                    onChange={(e) => setLiveBadge(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Main Heading Title</label>
                  <textarea
                    className="admin-input"
                    style={{ minHeight: '60px' }}
                    placeholder="e.g. Secure Your Future With Insurance & Real Estate"
                    {...register('title', { required: 'Heading is required' })}
                    onChange={(e) => setLiveTitle(e.target.value)}
                  />
                  {errors.title && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.title.message}</span>}
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Sub Heading / Highlight Text</label>
                  <textarea
                    className="admin-input"
                    style={{ minHeight: '80px' }}
                    placeholder="Provide a detailed subtitle description..."
                    {...register('description', { required: 'Sub Heading is required' })}
                    onChange={(e) => setLiveSubtitle(e.target.value)}
                  />
                  {errors.description && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.description.message}</span>}
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Primary Button Text</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Get Quote"
                      {...register('primaryButtonText', { required: 'Primary button text is required' })}
                    />
                    {errors.primaryButtonText && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.primaryButtonText.message}</span>}
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Primary Button Redirect Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. #contact or /health-insurance/plans"
                      {...register('primaryButtonLink', { required: 'Primary button link is required' })}
                    />
                    {errors.primaryButtonLink && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.primaryButtonLink.message}</span>}
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Secondary Button Text (Optional)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Explore Plans"
                      {...register('secondaryButtonText')}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Secondary Button Redirect Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. #plans or /real-estate/projects"
                      {...register('secondaryButtonLink')}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Families Protected Count</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. 1,200+"
                      {...register('familiesCount')}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Desktop Background Image URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Enter Unsplash URL or image path"
                      {...register('backgroundImage')}
                      onChange={(e) => setLogoPreviewDesktop(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Upload Desktop Banner Image (16:9)</label>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      className="admin-input"
                      onChange={(e) => handleImageUpload(e, 'backgroundImage')}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Upload Mobile Banner Image (Dedicated Mobile View)</label>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      className="admin-input"
                      onChange={(e) => handleImageUpload(e, 'mobileImage')}
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
                    <span>{view === 'create' ? 'Publish Slide' : 'Update Slide'}</span>
                  </button>
                  <button type="button" onClick={() => setView('list')} className="admin-btn admin-btn-secondary">
                    <FiX />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>

              {/* Preview Panel */}
              <div>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Device Preview
                </h3>
                <div className="live-preview-box">
                  <div className="device-selector">
                    <button 
                      type="button" 
                      className={`device-btn ${previewDevice === 'desktop' ? 'active' : ''}`}
                      onClick={() => setPreviewDevice('desktop')}
                    >
                      <FiMonitor /> Desktop (16:9)
                    </button>
                    <button 
                      type="button" 
                      className={`device-btn ${previewDevice === 'mobile' ? 'active' : ''}`}
                      onClick={() => setPreviewDevice('mobile')}
                    >
                      <FiSmartphone /> Mobile
                    </button>
                  </div>

                  {previewDevice === 'desktop' ? (
                    <div 
                      className="desktop-preview-viewport"
                      style={{ backgroundImage: `url(${logoPreviewDesktop || '/hero-bg.png'})` }}
                    >
                      <div className="preview-overlay">
                        <span style={{ fontSize: '0.45rem', padding: '2px 6px', background: 'rgba(212,175,55,0.1)', color: 'var(--primary-gold)', border: '1px solid var(--border-gold)', borderRadius: '50px', width: 'fit-content', marginBottom: '6px', fontWeight: 600 }}>
                          {liveBadge || 'badge'}
                        </span>
                        <h1 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.2, color: '#fff', maxWidth: '80%' }}>
                          {liveTitle || 'Heading Title'}
                        </h1>
                        <p style={{ fontSize: '0.5rem', margin: 0, opacity: 0.8, color: '#ddd', maxWidth: '80%', lineHeight: 1.4 }}>
                          {liveSubtitle || 'Sub Heading'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="mobile-preview-viewport"
                      style={{ backgroundImage: `url(${logoPreviewMobile || logoPreviewDesktop || '/hero-bg.png'})` }}
                    >
                      <div className="preview-overlay-mobile">
                        <span style={{ fontSize: '0.4rem', padding: '2px 6px', background: 'rgba(212,175,55,0.1)', color: 'var(--primary-gold)', border: '1px solid var(--border-gold)', borderRadius: '50px', width: 'fit-content', marginBottom: '6px', fontWeight: 600 }}>
                          {liveBadge || 'badge'}
                        </span>
                        <h1 style={{ fontSize: '0.8rem', fontWeight: 800, margin: '0 0 6px 0', lineHeight: 1.2, color: '#fff' }}>
                          {liveTitle || 'Heading Title'}
                        </h1>
                        <p style={{ fontSize: '0.45rem', margin: 0, opacity: 0.8, color: '#ddd', lineHeight: 1.4 }}>
                          {liveSubtitle || 'Sub Heading'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Tab 2: Slider Settings */
        <>
          <div className="admin-card-header" style={{ marginBottom: '24px' }}>
            <h2 className="admin-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '4px' }}>
              Carousel Settings
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Control global parameters for the homepage slider like autoplay status, speeds, dots, and arrows.
            </p>
          </div>

          <form onSubmit={handleSubmitSettings(onSubmitSettings)}>
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Slide Auto Play</label>
                <select className="admin-select" {...registerSettings('autoPlay')}>
                  <option value={true}>Auto Play ON</option>
                  <option value={false}>Auto Play OFF</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Animation Transition Style</label>
                <select className="admin-select" {...registerSettings('animationType')}>
                  <option value="fade">Cross Fade</option>
                  <option value="slide">Slide Transition</option>
                </select>
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-label">Slide Duration Display Time (ms)</label>
                <input
                  type="number"
                  className="admin-input"
                  placeholder="e.g. 5000"
                  {...registerSettings('duration', { required: true })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Transition Animation Speed (seconds)</label>
                <input
                  type="number"
                  step="0.1"
                  className="admin-input"
                  placeholder="e.g. 0.8"
                  {...registerSettings('transitionSpeed', { required: true })}
                />
              </div>
            </div>

            <div className="admin-form-row" style={{ marginTop: '16px' }}>
              <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="infinite-check"
                  {...registerSettings('infiniteLoop')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
                <label htmlFor="infinite-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
                  Enable Infinite Loop Scrolling
                </label>
              </div>

              <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="dots-check"
                  {...registerSettings('showDots')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
                <label htmlFor="dots-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
                  Show Slider Navigation Dots
                </label>
              </div>

              <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="arrows-check"
                  {...registerSettings('showArrows')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
                <label htmlFor="arrows-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
                  Show Slider Previous/Next Arrows
                </label>
              </div>
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ marginTop: '30px' }}>
              <FiSave /> Save Global Slider Settings
            </button>
          </form>
        </>
      )}
    </div>
  );
}
