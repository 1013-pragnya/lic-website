import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiSave, FiUser, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function AboutSection() {
  const { agentConfig, updateAbout } = useConfig();

  // State to manage achievement bullets list dynamically
  const [achievementsList, setAchievementsList] = useState(
    agentConfig?.achievements || [
      "M.Com Post-Graduate - Financial Planning Expert",
      "Elite Insurance Advisor: LIC, Tata AIG, Care & Star Health",
      "Secured 1,200+ Families & Handled Multi-Crore Portfolios"
    ]
  );
  
  const [newAchievement, setNewAchievement] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: agentConfig?.name || '',
      title: agentConfig?.title || '',
      experience: agentConfig?.experience || '',
      aboutText: agentConfig?.aboutText || '',
      photoUrl: agentConfig?.photoUrl || '',
      familiesSecured: agentConfig?.familiesSecured || '',
      claimsSettled: agentConfig?.claimsSettled || ''
    }
  });

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievementsList([...achievementsList, newAchievement.trim()]);
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setAchievementsList(achievementsList.filter((_, idx) => idx !== index));
  };

  const onSubmit = (data) => {
    try {
      updateAbout({
        ...data,
        achievements: achievementsList
      });
      alert('About Section updated successfully!');
    } catch (e) {
      alert('Error updating About Section: ' + e.message);
    }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">
        <FiUser /> About Advisor Management
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Manage the personal biography, credentials, experiences, portrait image, and key trust statistics.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Full Name</label>
            <input
              type="text"
              className="admin-input"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.name.message}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Professional Subtitle Title</label>
            <input
              type="text"
              className="admin-input"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.title.message}</span>}
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Experience Summary</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. 18+ Years of Trust & Financial Services"
              {...register('experience', { required: 'Experience summary is required' })}
            />
            {errors.experience && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.experience.message}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Portrait Photo URL / Path</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. /shamsuddin-suit1.jpg"
              {...register('photoUrl', { required: 'Photo URL is required' })}
            />
            {errors.photoUrl && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.photoUrl.message}</span>}
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Families Secured Count</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. 1,200+"
              {...register('familiesSecured', { required: 'Families Secured is required' })}
            />
            {errors.familiesSecured && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.familiesSecured.message}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Claims Settled Percentage</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. 99.2%"
              {...register('claimsSettled', { required: 'Claims Settled is required' })}
            />
            {errors.claimsSettled && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.claimsSettled.message}</span>}
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Bio / Detailed Introduction Narrative</label>
          <textarea
            className="admin-input"
            style={{ minHeight: '120px' }}
            {...register('aboutText', { required: 'Biography text is required' })}
          />
          {errors.aboutText && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.aboutText.message}</span>}
        </div>

        {/* Dynamic Achievements Management */}
        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
          <label className="admin-label" style={{ display: 'block', marginBottom: '12px' }}>Professional Achievements</label>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="admin-input"
              style={{ flex: 1 }}
              placeholder="e.g. MDRT Life Member - Financial Planning Expert"
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              className="admin-btn admin-btn-secondary"
              style={{ padding: '12px' }}
            >
              <FiPlus /> Add
            </button>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {achievementsList.map((item, index) => (
              <li 
                key={index} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'between',
                  background: 'rgba(5, 10, 23, 0.4)',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAchievement(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    marginLeft: 'auto'
                  }}
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
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
