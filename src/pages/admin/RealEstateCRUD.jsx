import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { 
  FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiHome, 
  FiArrowUp, FiArrowDown, FiEye, FiEyeOff, FiStar,
  FiUpload, FiFolder, FiImage
} from 'react-icons/fi';
import MediaLibrary from './MediaLibrary';

export default function RealEstateCRUD() {
  const { 
    agentConfig, 
    addRealEstate, 
    updateRealEstate, 
    deleteRealEstate, 
    reorderProperties,
    addMediaItem 
  } = useConfig();
  const realEstateList = agentConfig?.realEstate || [];
  const mediaList = agentConfig?.media || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activePropId, setActivePropId] = useState(null);

  // Media Selector States & Refs
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleCreate = () => {
    setSelectedImage(null);
    reset({
      title: '',
      category: 'Residential Property',
      location: 'Hyderabad',
      type: '',
      benefits: '',
      price: '',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      status: 'Available',
      featured: false,
      hidden: false
    });
    setView('create');
  };

  const handleEdit = (prop) => {
    setActivePropId(prop.id);
    const matchingMedia = mediaList.find(m => m.file_url === prop.image);
    setSelectedImage(matchingMedia || { file_url: prop.image, file_name: 'External URL / Default' });

    reset({
      title: prop.title,
      category: prop.category,
      location: prop.location,
      type: prop.type,
      benefits: prop.benefits,
      price: prop.price,
      image: prop.image,
      status: prop.status || 'Available',
      featured: prop.featured || false,
      hidden: prop.hidden || false
    });
    setView('edit');
  };

  // Direct upload handler inside form
  const handleDirectUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    // Basic validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, JPEG, PNG, and WEBP formats are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Maximum file size allowed is 5 MB.');
      return;
    }

    setIsUploading(true);
    try {
      const mediaItem = await addMediaItem(file);
      setSelectedImage(mediaItem);
      setValue('image', mediaItem.file_url); // Update React Hook Form value
    } catch (err) {
      alert(`Upload failed: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Selection from Media Library modal
  const handleSelectFromLibrary = (mediaItem) => {
    setSelectedImage(mediaItem);
    setValue('image', mediaItem.file_url); // Update React Hook Form value
    setShowMediaModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this property listing?')) {
      deleteRealEstate(id);
    }
  };

  const handleToggleFeatured = (prop) => {
    updateRealEstate({
      ...prop,
      featured: !prop.featured
    });
  };

  const handleToggleHide = (prop) => {
    updateRealEstate({
      ...prop,
      hidden: !prop.hidden
    });
  };

  const handleMove = (index, direction) => {
    const updated = [...realEstateList];
    const swapWith = direction === 'up' ? index - 1 : index + 1;
    if (swapWith >= 0 && swapWith < updated.length) {
      const temp = updated[index];
      updated[index] = updated[swapWith];
      updated[swapWith] = temp;
      reorderProperties(updated);
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
      {/* Media Library Modal */}
      {showMediaModal && (
        <div className="media-modal-backdrop" onClick={() => setShowMediaModal(false)}>
          <div 
            className="media-modal-content glass-panel" 
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '900px', width: '90%' }}
          >
            <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '80vh' }}>
              <MediaLibrary 
                onSelectImage={handleSelectFromLibrary} 
                onClose={() => setShowMediaModal(false)} 
              />
            </div>
          </div>
        </div>
      )}
      <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 className="admin-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '4px' }}>
            <FiHome /> Real Estate Listing Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Add, update, reorder, or toggle premium villas, IT offices, and land assets listed in Hyderabad.
          </p>
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
                <th>Price Range</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Visibility</th>
                <th>Order</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {realEstateList.map((prop, index) => (
                <tr key={prop.id}>
                  <td>
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      style={{ width: '48px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'; }}
                    />
                  </td>
                  <td>
                    <strong>{prop.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{prop.location}</div>
                  </td>
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
                  <td><strong style={{ color: 'var(--primary-gold)' }}>{prop.price}</strong></td>
                  <td>
                    <button
                      onClick={() => handleToggleFeatured(prop)}
                      className="admin-btn"
                      style={{
                        padding: '6px 8px',
                        background: 'none',
                        border: 'none',
                        color: prop.featured ? 'var(--primary-gold)' : 'var(--text-muted)'
                      }}
                      title={prop.featured ? 'Featured Property' : 'Make Featured'}
                    >
                      <FiStar fill={prop.featured ? 'var(--primary-gold)' : 'none'} size={16} />
                    </button>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: prop.status === 'Available' ? '#22c55e' : '#ef4444'
                    }}>
                      {prop.status || 'Available'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleHide(prop)}
                      className={`admin-btn ${prop.hidden ? 'admin-btn-secondary' : 'admin-btn-primary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      {prop.hidden ? (
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
                        disabled={index === realEstateList.length - 1}
                        className="admin-btn admin-btn-secondary"
                        style={{ padding: '6px 8px', opacity: index === realEstateList.length - 1 ? 0.3 : 1 }}
                        title="Move Down"
                      >
                        <FiArrowDown size={12} />
                      </button>
                    </div>
                  </td>
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
              <label className="admin-label">Property Image Upload / Selection</label>
              <div className="media-selector-box" style={{
                background: 'rgba(13, 24, 49, 0.35)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowMediaModal(true)} 
                    className="admin-btn admin-btn-secondary"
                    style={{ gap: '8px', padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <FiFolder /> Choose from Library
                  </button>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current.click()} 
                    className="admin-btn admin-btn-secondary"
                    style={{ gap: '8px', padding: '6px 12px', fontSize: '0.8rem' }}
                    disabled={isUploading}
                  >
                    <FiUpload /> {isUploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleDirectUpload}
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png,.webp"
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(5, 10, 23, 0.4)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{
                    width: '60px',
                    height: '45px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    background: '#050a17',
                    border: '1px solid var(--primary-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img 
                      src={selectedImage ? selectedImage.file_url : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'} 
                      alt="Selected Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'; }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      <strong>Active file/path:</strong> {selectedImage ? (selectedImage.file_name || selectedImage.file_url) : 'Default Unsplash cover'}
                    </div>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ height: '24px', padding: '2px 6px', fontSize: '0.75rem', marginTop: '4px', width: '100%' }}
                      placeholder="Or paste external image path directly here..."
                      {...register('image', { required: 'Image path or link is required' })}
                      onChange={(e) => {
                        setValue('image', e.target.value);
                        setSelectedImage({ file_url: e.target.value, file_name: 'Custom path / external URL' });
                      }}
                    />
                  </div>
                </div>
              </div>
              {errors.image && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.image.message}</span>}
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Availability Status</label>
              <select className="admin-select" {...register('status', { required: true })}>
                <option value="Available">Available</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>

            <div className="admin-form-group" style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '100%', paddingTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="featured-check"
                  {...register('featured')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
                <label htmlFor="featured-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
                  Mark as Featured Property
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="hidden-check"
                  {...register('hidden')}
                  style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                />
                <label htmlFor="hidden-check" className="admin-label" style={{ margin: 0, cursor: 'pointer' }}>
                  Hide listing (Draft status)
                </label>
              </div>
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
