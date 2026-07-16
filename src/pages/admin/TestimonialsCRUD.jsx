import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { 
  FiPlus, FiEdit, FiTrash2, FiSave, FiX, 
  FiMessageSquare, FiImage, FiUpload, FiFolder,
  FiEye, FiEyeOff
} from 'react-icons/fi';
import MediaLibrary from './MediaLibrary';

export default function TestimonialsCRUD() {
  const { 
    agentConfig, 
    addTestimonial, 
    updateTestimonial, 
    deleteTestimonial,
    addMediaItem
  } = useConfig();
  
  const testimonials = agentConfig?.testimonials || [];
  const mediaList = agentConfig?.media || [];

  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [activeTestId, setActiveTestId] = useState(null);
  
  // Selected Image state
  const [selectedImage, setSelectedImage] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Helper to find media by ID
  const getMediaById = (id) => {
    return mediaList.find(m => m.id === id);
  };

  const handleCreate = () => {
    setSelectedImage(null);
    reset({
      client_name: '',
      client_location: 'Hyderabad',
      policy_name: '',
      review: ''
    });
    setView('create');
  };

  const handleEdit = (test) => {
    setActiveTestId(test.id);
    const media = getMediaById(test.image_id);
    setSelectedImage(media || null);
    
    reset({
      client_name: test.client_name,
      client_location: test.client_location,
      policy_name: test.policy_name,
      review: test.review
    });
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
    }
  };

  const handleToggleHide = (test) => {
    updateTestimonial({
      ...test,
      hidden: !test.hidden
    });
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
    } catch (err) {
      alert(`Upload failed: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Selection from Media Library modal
  const handleSelectFromLibrary = (mediaItem) => {
    setSelectedImage(mediaItem);
    setShowMediaModal(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      image_id: selectedImage ? selectedImage.id : null,
      hidden: data.hidden || false
    };

    if (view === 'create') {
      addTestimonial(payload);
      alert('Testimonial published successfully!');
    } else {
      updateTestimonial({
        ...payload,
        id: activeTestId
      });
      alert('Testimonial updated successfully!');
    }
    setView('list');
  };

  // Simple ref holder since we didn't import it in standard react imports
  const fileInputDummy = React.useRef(null);

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

      {/* Main Panel Header */}
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
                <th>Client Photo</th>
                <th>Client Name</th>
                <th>Location</th>
                <th>Policy/Asset Purchased</th>
                <th>Review Details</th>
                <th>Visibility</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((test) => {
                const media = getMediaById(test.image_id);
                return (
                  <tr key={test.id}>
                    <td>
                      <img 
                        src={media ? media.file_url : '/avatar1.webp'} 
                        alt={test.client_name} 
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-glass)' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/avatar1.webp'; }}
                      />
                    </td>
                    <td><strong>{test.client_name}</strong></td>
                    <td>{test.client_location}</td>
                    <td>{test.policy_name}</td>
                    <td style={{ maxWidth: '350px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      "{test.review}"
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleHide(test)}
                        className="admin-btn"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: test.hidden ? 'var(--text-muted)' : '#10b981',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title={test.hidden ? 'Hidden (Click to Show)' : 'Visible (Click to Hide)'}
                      >
                        {test.hidden ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
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
                );
              })}
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
                placeholder="e.g. Shelina Ratnani"
                {...register('client_name', { required: 'Name is required' })}
              />
              {errors.client_name && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.client_name.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Client Location</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Hyderabad"
                {...register('client_location', { required: 'Location is required' })}
              />
              {errors.client_location && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.client_location.message}</span>}
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Policy / Property Purchased</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Child Future Plan & Term Protection"
                {...register('policy_name', { required: 'Policy details are required' })}
              />
              {errors.policy_name && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.policy_name.message}</span>}
            </div>
          </div>

          <div className="admin-form-row" style={{ marginTop: '12px', marginBottom: '8px' }}>
            <div className="admin-form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}>
              <input
                type="checkbox"
                id="hidden-checkbox"
                {...register('hidden')}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary-gold)', cursor: 'pointer' }}
              />
              <label htmlFor="hidden-checkbox" className="admin-label" style={{ margin: 0, cursor: 'pointer', userSelect: 'none' }}>
                Hide Testimonial (Draft / Inactive)
              </label>
            </div>
          </div>

          {/* New Client Image Selection Section */}
          <div className="admin-form-group" style={{ marginTop: '16px', marginBottom: '20px' }}>
            <label className="admin-label">Client Image</label>
            <div className="media-selector-box" style={{
              background: 'rgba(13, 24, 49, 0.35)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '6px'
            }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowMediaModal(true)} 
                  className="admin-btn admin-btn-secondary"
                  style={{ gap: '8px' }}
                >
                  <FiFolder /> Choose from Media Library
                </button>
                <button 
                  type="button" 
                  onClick={() => fileInputDummy.current.click()} 
                  className="admin-btn admin-btn-secondary"
                  style={{ gap: '8px' }}
                  disabled={isUploading}
                >
                  <FiUpload /> {isUploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <input 
                  type="file"
                  ref={fileInputDummy}
                  onChange={handleDirectUpload}
                  style={{ display: 'none' }}
                  accept=".jpg,.jpeg,.png,.webp"
                />
              </div>

              {selectedImage ? (
                <div className="image-selection-preview-container" style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  background: 'rgba(5, 10, 23, 0.4)',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#050a17',
                    border: '1px solid var(--primary-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img 
                      src={selectedImage.file_url} 
                      alt="Selected Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div><strong style={{ color: 'var(--white)' }}>Image Name:</strong> {selectedImage.file_name}</div>
                      <div><strong>Upload Date:</strong> {selectedImage.uploaded_at ? new Date(selectedImage.uploaded_at).toLocaleDateString() : 'N/A'}</div>
                      <div><strong>File Size:</strong> {selectedImage.file_size}</div>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveImage} 
                      className="admin-btn admin-btn-danger"
                      style={{ marginTop: '12px', padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
                    >
                      <FiTrash2 size={12} /> Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '20px', 
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  border: '1px dashed rgba(255,255,255,0.1)',
                  borderRadius: '6px'
                }}>
                  <FiImage size={24} style={{ marginBottom: '8px', color: 'var(--primary-gold)' }} />
                  <div>No client image selected. Click one of the options above to select a photo.</div>
                </div>
              )}
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Feedback Review Description Text</label>
            <textarea
              className="admin-input"
              placeholder="Provide the client's direct review quotes here..."
              style={{ minHeight: '120px' }}
              {...register('review', { required: 'Review text is required' })}
            />
            {errors.review && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.review.message}</span>}
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
