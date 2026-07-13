import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiSave, FiSettings } from 'react-icons/fi';

export default function Settings() {
  const { agentConfig, updateSettings } = useConfig();
  const settings = agentConfig?.settings || {};

  const [adminEmail, setAdminEmail] = useState(localStorage.getItem('admin_email') || 'admin@rrfs.com');
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem('admin_password') || 'adminpassword');
  const [adminPasscode, setAdminPasscode] = useState(localStorage.getItem('admin_passcode') || '1234');

  const handleSaveCredentials = (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword || !adminPasscode) {
      alert('All credentials fields are required.');
      return;
    }
    localStorage.setItem('admin_email', adminEmail);
    localStorage.setItem('admin_password', adminPassword);
    localStorage.setItem('admin_passcode', adminPasscode);
    alert('Admin login credentials updated successfully!');
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      logoText: settings.logoText || '',
      logoUrl: settings.logoUrl || '',
      primaryColor: settings.primaryColor || '#cfa844',
      secondaryColor: settings.secondaryColor || '#050a17',
      faviconUrl: settings.faviconUrl || '',
      seoTitle: settings.seoTitle || '',
      seoDescription: settings.seoDescription || '',
      seoKeywords: settings.seoKeywords || ''
    }
  });

  const onSubmit = (data) => {
    try {
      updateSettings(data);
      alert('Global settings and SEO metadata saved successfully!');
    } catch (e) {
      alert('Error updating Settings: ' + e.message);
    }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">
        <FiSettings /> Website Customization & Settings
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Configure the global branding, theme colors, SEO meta descriptions, and keywords for search engine indexing.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Logo & Branding */}
        <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Global Branding
        </h3>
        
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Logo Header Text</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. RR INSURANCE & FINANCIAL SERVICE"
              {...register('logoText')}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Logo Image URL / Path</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. /logo.png (leave blank for default)"
              {...register('logoUrl')}
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Favicon Shortcut Icon URL</label>
          <input
            type="text"
            className="admin-input"
            placeholder="e.g. data:image/svg+xml,... or url path"
            {...register('faviconUrl')}
          />
        </div>

        {/* Theme Settings */}
        <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginTop: '30px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
          Theme Palette
        </h3>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Primary Accent Color (Gold)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="color"
                style={{ width: '45px', height: '42px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                {...register('primaryColor')}
              />
              <input
                type="text"
                className="admin-input"
                style={{ flex: 1 }}
                placeholder="#cfa844"
                {...register('primaryColor')}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Secondary Background Color (Space Blue)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="color"
                style={{ width: '45px', height: '42px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                {...register('secondaryColor')}
              />
              <input
                type="text"
                className="admin-input"
                style={{ flex: 1 }}
                placeholder="#050a17"
                {...register('secondaryColor')}
              />
            </div>
          </div>
        </div>

        {/* Search Engine Optimization */}
        <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginTop: '30px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
          SEO Metadata (Google Search Ready)
        </h3>

        <div className="admin-form-group">
          <label className="admin-label">Global Page Title Tag (&lt;title&gt;)</label>
          <input
            type="text"
            className="admin-input"
            placeholder="Descriptive title appearing in browser tabs..."
            {...register('seoTitle')}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Global Meta Description (Google snippet)</label>
          <textarea
            className="admin-input"
            style={{ minHeight: '80px' }}
            placeholder="A compelling, short summary explaining the page content..."
            {...register('seoDescription')}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Search Keywords (Comma-separated)</label>
          <input
            type="text"
            className="admin-input"
            placeholder="e.g. LIC agent, wealth advisor, term insurance"
            {...register('seoKeywords')}
          />
        </div>

        <div style={{ marginTop: '30px' }}>
          <button type="submit" className="admin-btn admin-btn-primary">
            <FiSave />
            <span>Save Customization</span>
          </button>
        </div>
      </form>

      {/* Change Admin Credentials */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
        Change Administrator Credentials
      </h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.82rem' }}>
        Update the secure email address, password, and passcode used to access this Admin Panel.
      </p>

      <form onSubmit={handleSaveCredentials}>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Login Email Address</label>
            <input
              type="email"
              className="admin-input"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@rrfs.com"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Login Passcode (Numeric)</label>
            <input
              type="text"
              className="admin-input"
              value={adminPasscode}
              onChange={(e) => setAdminPasscode(e.target.value)}
              placeholder="1234"
              required
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">New Password</label>
          <input
            type="password"
            className="admin-input"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" className="admin-btn admin-btn-primary">
            <FiSave />
            <span>Update Credentials</span>
          </button>
        </div>
      </form>
    </div>
  );
}
