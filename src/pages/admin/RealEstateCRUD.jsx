import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiHome } from 'react-icons/fi';

export default function RealEstateCRUD() {
  const { agentConfig, addRealEstate, updateRealEstate, deleteRealEstate } = useConfig();
  const realEstateList = agentConfig?.realEstate || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activePropId, setActivePropId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleCreate = () => {
    reset({
      title: '',
      category: 'Residential Property',
      location: 'Hyderabad',
      type: '',
      benefits: '',
      price: '',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    });
    setView('create');
  };

  const handleEdit = (prop) => {
    setActivePropId(prop.id);
    reset({
      title: prop.title,
      category: prop.category,
      location: prop.location,
      type: prop.type,
      benefits: prop.benefits,
      price: prop.price,
      image: prop.image
    });
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property listing?')) {
      deleteRealEstate(id);
    }
  };

  const onSubmit = (data) => {
    if (view === 'create') {
      addRealEstate(data);
      alert('Property listing created successfully!');
    } else {
      updateRealEstate({
        ...data,
        id: activePropId
      });
      alert('Property listing updated successfully!');
    }
    setView('list');
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: '4px', borderBottom: 'none', paddingBottom: 0 }}>
            Real Estate Listing Management
          </h2>
          {view === 'list' && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Add, update, or remove premium villas, commercial offices, and land assets listed in Hyderabad.
            </p>
          )}
        </div>
        {view === 'list' && (
          <button onClick={handleCreate} className="admin-btn admin-btn-primary">
            <FiPlus /> Add New Listing
          </button>
        )}
      </div>

      {view === 'list' ? (
        /* List View */
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Preview</th>
                <th>Property Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Type</th>
                <th>Price Range</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {realEstateList.map((prop) => (
                <tr key={prop.id}>
                  <td>
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      style={{ width: '48px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'; }}
                    />
                  </td>
                  <td><strong>{prop.title}</strong></td>
                  <td>
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '4px',
                      color: '#3b82f6',
                      fontWeight: 700
                    }}>
                      {prop.category}
                    </span>
                  </td>
                  <td>{prop.location}</td>
                  <td>{prop.type}</td>
                  <td><strong style={{ color: 'var(--primary-gold)' }}>{prop.price}</strong></td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleEdit(prop)} 
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '8px 12px' }}
                      >
                        <FiEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(prop.id)} 
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
              <label className="admin-label">Property Title Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Vastu-Compliant Sky Residences"
                {...register('title', { required: 'Property title is required' })}
              />
              {errors.title && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.title.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Category Sector</label>
              <select className="admin-select" {...register('category', { required: true })}>
                <option value="Residential Property">Residential Property (Villas/Apts)</option>
                <option value="Commercial Property">Commercial Property (IT Parks/Offices)</option>
                <option value="Land Investment">Land Investment (Plots/Farm Land)</option>
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Property Location</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Kokapet, Hyderabad"
                {...register('location', { required: 'Location is required' })}
              />
              {errors.location && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.location.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Subtype Specifics</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Gated Villa Plots, Sky Lounge Access"
                {...register('type', { required: 'Property type is required' })}
              />
              {errors.type && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.type.message}</span>}
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Listing Price Range Indicator</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Starting from ₹2.8 Cr*"
                {...register('price', { required: 'Price range details are required' })}
              />
              {errors.price && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.price.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Property Image Path / Unsplash URL</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. https://images.unsplash.com/..."
                {...register('image', { required: 'Image path or link is required' })}
              />
              {errors.image && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.image.message}</span>}
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Property Highlights Benefits</label>
            <textarea
              className="admin-input"
              placeholder="e.g. Pre-leased corporate clients, 100% boundary clear title, double-digit ROI yields..."
              style={{ minHeight: '100px' }}
              {...register('benefits', { required: 'Highlights are required' })}
            />
            {errors.benefits && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.benefits.message}</span>}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <FiSave />
              <span>{view === 'create' ? 'Create Listing' : 'Update Listing'}</span>
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
