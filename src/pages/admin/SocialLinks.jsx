import React from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiSave, FiShare2 } from 'react-icons/fi';

export default function SocialLinks() {
  const { agentConfig, updateSocials } = useConfig();
  const socials = agentConfig?.contact?.social || {};

  const { register, handleSubmit } = useForm({
    defaultValues: {
      instagram: socials.instagram || '',
      facebook: socials.facebook || '',
      linkedin: socials.linkedin || '',
      youtube: socials.youtube || ''
    }
  });

  const onSubmit = (data) => {
    try {
      updateSocials(data);
      alert('Social links updated successfully!');
    } catch (e) {
      alert('Error updating Social links: ' + e.message);
    }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">
        <FiShare2 /> Social Media Management
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Configure the URLs for your professional social handles shown in the site footer and header icons.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-form-group">
          <label className="admin-label">LinkedIn Profile URL</label>
          <input
            type="url"
            className="admin-input"
            placeholder="e.g. https://www.linkedin.com/in/username"
            {...register('linkedin')}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Facebook Profile / Page URL</label>
          <input
            type="url"
            className="admin-input"
            placeholder="e.g. https://www.facebook.com/username"
            {...register('facebook')}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Instagram Handle URL</label>
          <input
            type="url"
            className="admin-input"
            placeholder="e.g. https://instagram.com/username"
            {...register('instagram')}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">YouTube Channel URL</label>
          <input
            type="url"
            className="admin-input"
            placeholder="e.g. https://youtube.com/@channelname"
            {...register('youtube')}
          />
        </div>

        <div style={{ marginTop: '30px' }}>
          <button type="submit" className="admin-btn admin-btn-primary">
            <FiSave />
            <span>Save Links</span>
          </button>
        </div>
      </form>
    </div>
  );
}
