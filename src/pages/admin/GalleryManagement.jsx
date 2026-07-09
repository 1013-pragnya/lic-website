import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfig } from '../../config/AppContext';
import { FiPlus, FiTrash2, FiImage, FiUpload } from 'react-icons/fi';

export default function GalleryManagement() {
  const { agentConfig, addGalleryImage, deleteGalleryImage } = useConfig();
  const gallery = agentConfig?.gallery || [];

  const [uploadLoading, setUploadLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Convert uploaded file to Base64 to support offline uploads saved in localStorage
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      // Store standard details
      const imgObject = {
        url: reader.result,
        caption: file.name.split('.')[0] || 'Uploaded Office Image'
      };
      addGalleryImage(imgObject);
      setUploadLoading(false);
      alert('Local image uploaded and added to offline gallery successfully!');
    };
    reader.onerror = () => {
      setUploadLoading(false);
      alert('Failed to read local image file.');
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    try {
      addGalleryImage(data);
      reset({ url: '', caption: '' });
      alert('Image URL added to gallery successfully!');
    } catch (e) {
      alert('Error adding gallery image: ' + e.message);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this photo from the gallery?')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-card-title">
        <FiImage /> Gallery Media Management
      </h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
        Manage the photo gallery. Add new photo URLs or upload local images directly (converted to offline Base64 store).
      </p>

      <div className="admin-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Form View to Add Image URL */}
        <div style={{ background: 'rgba(5, 10, 23, 0.2)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Add Image Link
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="admin-form-group">
              <label className="admin-label">Image URL / Path</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. /shamsuddin-office1.jpg"
                {...register('url', { required: 'Image link or path is required' })}
              />
              {errors.url && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.url.message}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Image Caption / Tag</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. MDRT Advisory Meeting"
                {...register('caption', { required: 'Caption is required' })}
              />
              {errors.caption && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.caption.message}</span>}
            </div>

            <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              <FiPlus /> Add Image Link
            </button>
          </form>
        </div>

        {/* Local File Uploader */}
        <div style={{ background: 'rgba(5, 10, 23, 0.2)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-glass)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Upload Local Image File
          </h3>
          <div style={{ padding: '30px 20px', border: '2px dashed var(--border-glass)', borderRadius: '8px', position: 'relative' }}>
            <FiUpload style={{ fontSize: '2.5rem', color: 'var(--text-muted)', marginBottom: '12px' }} />
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {uploadLoading ? 'Processing file...' : 'Choose a JPG, PNG, or WEBP file from your system'}
            </p>
            <input
              type="file"
              accept="image/*"
              disabled={uploadLoading}
              onChange={handleImageUpload}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <button type="button" className="admin-btn admin-btn-secondary" style={{ pointerEvents: 'none' }}>
              Select File
            </button>
          </div>
        </div>

      </div>

      {/* Grid of gallery previews */}
      <h3 style={{ fontSize: '0.9rem', color: 'var(--white)', marginTop: '40px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Current Gallery Media ({gallery.length})
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
        {gallery.map((img) => (
          <div 
            key={img.id} 
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--border-glass)',
              aspectRatio: '4/3',
              group: 'hover'
            }}
          >
            <img 
              src={img.url} 
              alt={img.caption} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div 
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(5, 10, 23, 0.85)',
                padding: '6px 10px',
                fontSize: '0.7rem',
                color: 'var(--white)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'between'
              }}
            >
              <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.caption}</span>
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  marginLeft: 'auto'
                }}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
