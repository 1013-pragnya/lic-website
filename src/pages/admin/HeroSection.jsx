import React from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiSave, FiLayers } from 'react-icons/fi';

export default function HeroSection() {
  const { agentConfig, updateHero } = useConfig();
  const hero = agentConfig?.hero || {};

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      badge: hero.badge || '',
      title: hero.title || '',
      description: hero.description || '',
      primaryButtonText: hero.primaryButtonText || '',
      secondaryButtonText: hero.secondaryButtonText || '',
      familiesCount: hero.familiesCount || '',
      backgroundImage: hero.backgroundImage || ''
    }
  });

  const onSubmit = (data) => {
    try {
      updateHero(data);
      alert('Hero Section updated successfully!');
    } catch (e) {
      alert('Error updating Hero Section: ' + e.message);
    }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">
        <FiLayers /> Hero Section Management
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Configure the main banner text, CTA buttons, background options, and live statistics shown at the top of the homepage.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-form-group">
          <label className="admin-label">Trust Badge Subtitle</label>
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
            placeholder="e.g. Secure Your Future With Insurance & Real Estate Solutions"
            {...register('title', { required: 'Main title is required' })}
          />
          {errors.title && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.title.message}</span>}
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Hero Description Text</label>
          <textarea
            className="admin-input"
            style={{ minHeight: '100px' }}
            placeholder="Introduce your services in 2-3 concise sentences..."
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.description.message}</span>}
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Primary Button Text</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Book Consultation"
              {...register('primaryButtonText')}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Secondary Button Text</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Explore Plans"
              {...register('secondaryButtonText')}
            />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Families Protected Counter</label>
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
              placeholder="Leave blank for space-blue gradient, or enter URL"
              {...register('backgroundImage')}
            />
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button type="submit" className="admin-btn admin-btn-primary">
            <FiSave />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
