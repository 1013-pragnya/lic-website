import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiMessageSquare } from 'react-icons/fi';

export default function TestimonialsCRUD() {
  const { agentConfig, addTestimonial, updateTestimonial, deleteTestimonial } = useConfig();
  const testimonials = agentConfig?.testimonials || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activeTestId, setActiveTestId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleCreate = () => {
    reset({
      name: '',
      location: 'Hyderabad',
      policy: '',
      avatarUrl: '/avatar1.webp',
      text: ''
    });
    setView('create');
  };

  const handleEdit = (test) => {
    setActiveTestId(test.id);
    reset({
      name: test.name,
      location: test.location,
      policy: test.policy,
      avatarUrl: test.avatarUrl,
      text: test.text
    });
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
    }
  };

  const onSubmit = (data) => {
    if (view === 'create') {
      addTestimonial(data);
      alert('Testimonial added successfully!');
    } else {
      updateTestimonial({
        ...data,
        id: activeTestId
      });
      alert('Testimonial updated successfully!');
    }
    setView('list');
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: '4px', borderBottom: 'none', paddingBottom: 0 }}>
            Client Testimonials Management
          </h2>
          {view === 'list' && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Publish reviews and feedback from secured families and real estate investors.
            </p>
          )}
        </div>
        {view === 'list' && (
          <button onClick={handleCreate} className="admin-btn admin-btn-primary">
            <FiPlus /> Add Testimonial
          </button>
        )}
      </div>

      {view === 'list' ? (
        /* List View */
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Client Name</th>
                <th>Location</th>
                <th>Policy/Asset Purchased</th>
                <th>Review Details</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((test) => (
                <tr key={test.id}>
                  <td>
                    <img 
                      src={test.avatarUrl || '/avatar1.webp'} 
                      alt={test.name} 
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/avatar1.webp'; }}
                    />
                  </td>
                  <td><strong>{test.name}</strong></td>
                  <td>{test.location}</td>
                  <td>{test.policy}</td>
                  <td style={{ maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    "{test.text}"
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleEdit(test)} 
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '8px 12px' }}
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(test.id)} 
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
        /* Create/Edit View */
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Client Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Amit & Priya Sharma"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.name.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Client Location</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Jubilee Hills, Hyderabad"
                {...register('location', { required: 'Location is required' })}
              />
              {errors.location && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.location.message}</span>}
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Policy / Property Purchased</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Child Future Plan & Term Protection"
                {...register('policy', { required: 'Policy details are required' })}
              />
              {errors.policy && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.policy.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Client Avatar Option</label>
              <select className="admin-select" {...register('avatarUrl')}>
                <option value="/avatar1.webp">Avatar 1 (Couple/Male)</option>
                <option value="/avatar2.webp">Avatar 2 (Retiree/Col.)</option>
                <option value="/avatar3.webp">Avatar 3 (Female/IT Specialist)</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Feedback Review Description Text</label>
            <textarea
              className="admin-input"
              placeholder="Provide the client's direct review quotes here..."
              style={{ minHeight: '120px' }}
              {...register('text', { required: 'Review text is required' })}
            />
            {errors.text && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.text.message}</span>}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <FiSave />
              <span>{view === 'create' ? 'Publish Testimonial' : 'Update Testimonial'}</span>
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
