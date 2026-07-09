import React from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiSave, FiPhoneCall } from 'react-icons/fi';

export default function ContactInfo() {
  const { agentConfig, updateContact } = useConfig();
  const contact = agentConfig?.contact || {};

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phone: contact.phone || '',
      phoneSecondary: contact.phoneSecondary || '',
      email: contact.email || '',
      address: contact.address || '',
      whatsapp: contact.whatsapp || '',
      workingHours: contact.workingHours || ''
    }
  });

  const onSubmit = (data) => {
    try {
      updateContact(data);
      alert('Contact Information updated successfully!');
    } catch (e) {
      alert('Error updating Contact Info: ' + e.message);
    }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">
        <FiPhoneCall /> Contact Information Management
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Modify phone lines, email addresses, office map coordinates, and standard consulting availability.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Primary Hotline Phone</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. +91 63024 92168"
              {...register('phone', { required: 'Primary phone is required' })}
            />
            {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.phone.message}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Secondary Hotline Phone</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. +91 98664 92168"
              {...register('phoneSecondary')}
            />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Direct Email Address</label>
            <input
              type="email"
              className="admin-input"
              placeholder="e.g. rrfsshams@gmail.com"
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email structure' }
              })}
            />
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.email.message}</span>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Direct WhatsApp Trigger Phone (No + or spaces)</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. 916302492168"
              {...register('whatsapp', { required: 'WhatsApp number is required' })}
            />
            {errors.whatsapp && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.whatsapp.message}</span>}
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Office Operating Hours</label>
          <input
            type="text"
            className="admin-input"
            placeholder="e.g. Mon - Sat: 9:00 AM - 7:00 PM"
            {...register('workingHours')}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Physical Office Address Text</label>
          <textarea
            className="admin-input"
            style={{ minHeight: '80px' }}
            placeholder="Complete address including state and zip code..."
            {...register('address', { required: 'Office address is required' })}
          />
          {errors.address && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.address.message}</span>}
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
