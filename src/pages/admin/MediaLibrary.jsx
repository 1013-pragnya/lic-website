import React, { useState, useEffect, useRef } from 'react';
import { useConfig } from '../../config/AppContext';
import { 
  FiUploadCloud, FiSearch, FiCopy, FiTrash2, 
  FiEdit3, FiEye, FiCheck, FiX, FiInfo, FiFileText
} from 'react-icons/fi';
import './AdminPanel.css'; // Use existing admin styling

export default function MediaLibrary({ onSelectImage, onClose }) {
  const { agentConfig, addMediaItem, renameMediaItem, deleteMediaItem } = useConfig();
  const mediaList = agentConfig?.media || [];
  
  // Search & view states
  const [searchQuery, setSearchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renamingValue, setRenamingValue] = useState('');
  
  // Upload states
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 0 to 100
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Toast notifications state
  const [toast, setToast] = useState(null);

  // Utility to show toast
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Image Usage Analysis
  const getImageUsage = (item) => {
    const usages = [];
    
    // Check Testimonials
    const testimonials = agentConfig?.testimonials || [];
    testimonials.forEach(t => {
      if (t.image_id === item.id) {
        usages.push(`Testimonial: ${t.client_name}`);
      }
    });

    // Check Hero Section Banners
    const banners = agentConfig?.banners || [];
    banners.forEach((b, index) => {
      const isMatch = b.backgroundImage && (
        b.backgroundImage === item.file_url || 
        b.backgroundImage.includes(item.file_name) ||
        (item.id && b.backgroundImage.includes(item.id))
      );
      if (isMatch) {
        usages.push(`Hero Banner #${index + 1}`);
      }
    });

    // Check Gallery
    const gallery = agentConfig?.gallery || [];
    gallery.forEach(g => {
      const isMatch = g.url && (
        g.url === item.file_url || 
        g.url.includes(item.file_name) ||
        (item.id && g.url.includes(item.id))
      );
      if (isMatch) {
        usages.push(`Gallery: ${g.caption}`);
      }
    });

    // Check Real Estate properties
    const properties = agentConfig?.realEstate || [];
    properties.forEach(p => {
      const inMain = p.image && (p.image === item.file_url || p.image.includes(item.file_name));
      const inPrice = p.priceCardImage && (p.priceCardImage === item.file_url || p.priceCardImage.includes(item.file_name));
      const inMap = p.mapImage && (p.mapImage === item.file_url || p.mapImage.includes(item.file_name));
      
      if (inMain) usages.push(`Property (Cover): ${p.title}`);
      if (inPrice) usages.push(`Property (Pricing): ${p.title}`);
      if (inMap) usages.push(`Property (Map): ${p.title}`);
    });

    return usages;
  };

  // 2. Upload Handler
  const processFiles = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Validations
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showToast('error', 'Only JPG, JPEG, PNG, and WEBP formats are allowed.');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      showToast('error', 'Maximum file size allowed is 5 MB.');
      return;
    }

    // Start simulated upload progress
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 100);

    try {
      const uploadedItem = await addMediaItem(file);
      clearInterval(interval);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        showToast('success', `"${file.name}" uploaded successfully to Media Library!`);
      }, 300);
    } catch (err) {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);
      showToast('error', `Failed to upload image: ${err.message || err}`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  // 3. Delete Handler with Usage Warning Check
  const handleDeleteItem = async (item, e) => {
    e.stopPropagation();
    const usages = getImageUsage(item);
    
    let confirmMsg = `Are you sure you want to delete "${item.file_name}"?`;
    if (usages.length > 0) {
      confirmMsg = `WARNING: "${item.file_name}" is currently used in:\n\n` + 
        usages.map(u => `• ${u}`).join('\n') + 
        `\n\nDeleting this image will cause broken links in these modules. Proceed anyway?`;
    }

    if (window.confirm(confirmMsg)) {
      try {
        await deleteMediaItem(item.id);
        showToast('success', 'Image deleted from Media Library.');
        if (previewItem?.id === item.id) {
          setPreviewItem(null);
        }
      } catch (err) {
        showToast('error', `Failed to delete image: ${err.message || err}`);
      }
    }
  };

  // 4. Rename Handlers
  const handleStartRename = (item, e) => {
    e.stopPropagation();
    setRenamingId(item.id);
    setRenamingValue(item.file_name);
  };

  const handleSaveRename = (id, e) => {
    e.stopPropagation();
    if (!renamingValue.trim()) {
      showToast('error', 'Filename cannot be empty.');
      return;
    }
    renameMediaItem(id, renamingValue.trim());
    setRenamingId(null);
    showToast('success', 'Image renamed successfully.');
  };

  // 5. Helper Actions
  const handleCopyUrl = (url, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(url);
    showToast('success', 'Image URL copied to clipboard!');
  };

  // Filter media items based on search query
  const filteredMedia = mediaList.filter(item => 
    item.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.original_name && item.original_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`media-library-page ${onSelectImage ? 'modal-mode' : ''}`}>
      {/* Toast Alert */}
      {toast && (
        <div className={`media-toast ${toast.type}`}>
          <FiInfo className="toast-icon" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="media-header admin-card-header">
        <div>
          <h2 className="admin-card-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '4px' }}>
            Media Library
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Upload, manage, and reuse premium image assets across all modules.
          </p>
        </div>
        {onSelectImage && (
          <button onClick={onClose} className="media-close-btn">
            <FiX /> Close
          </button>
        )}
      </div>

      {/* Upload Area */}
      <div 
        className={`media-upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileSelect}
          accept=".jpg,.jpeg,.png,.webp"
        />
        <div className="dropzone-content">
          <FiUploadCloud className="dropzone-icon" />
          <h3>Drag & drop your client image here, or <span>browse files</span></h3>
          <p>Allowed extensions: JPG, JPEG, PNG, WEBP (Max size: 5 MB)</p>
        </div>
      </div>

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="media-upload-progress-wrapper">
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
          </div>
          <span className="progress-text">Uploading... {uploadProgress}%</span>
        </div>
      )}

      {/* Controls: Search */}
      <div className="media-controls-row">
        <div className="media-search-wrapper">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search images by name..." 
            className="admin-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="media-empty-state">
          <FiFileText style={{ fontSize: '3rem', color: 'var(--text-secondary)', marginBottom: '16px' }} />
          <h3>No images found in the Media Library</h3>
          <p>Try searching for a different keyword or upload a new image above.</p>
        </div>
      ) : (
        <div className="media-grid">
          {filteredMedia.map((item) => {
            const usages = getImageUsage(item);
            const isSelected = false; // Add border if selected in preview
            
            return (
              <div 
                key={item.id} 
                className={`media-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  if (onSelectImage) {
                    onSelectImage(item);
                  } else {
                    setPreviewItem(item);
                  }
                }}
              >
                <div className="media-thumbnail-wrapper">
                  <img src={item.file_url} alt={item.file_name} className="media-thumbnail" />
                  <div className="media-hover-overlay">
                    {onSelectImage ? (
                      <button className="media-card-action-btn select-btn">
                        <FiCheck /> Select Image
                      </button>
                    ) : (
                      <div className="hover-action-icons">
                        <button 
                          className="action-icon-btn" 
                          onClick={(e) => { e.stopPropagation(); setPreviewItem(item); }}
                          title="Preview"
                        >
                          <FiEye />
                        </button>
                        <button 
                          className="action-icon-btn" 
                          onClick={(e) => handleStartRename(item, e)}
                          title="Rename"
                        >
                          <FiEdit3 />
                        </button>
                        <button 
                          className="action-icon-btn delete" 
                          onClick={(e) => handleDeleteItem(item, e)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="media-card-details">
                  {renamingId === item.id ? (
                    <div className="rename-input-wrapper" onClick={e => e.stopPropagation()}>
                      <input 
                        type="text" 
                        className="admin-input rename-input" 
                        value={renamingValue} 
                        onChange={e => setRenamingValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSaveRename(item.id, e)}
                      />
                      <button className="rename-btn save" onClick={e => handleSaveRename(item.id, e)}>
                        <FiCheck />
                      </button>
                      <button className="rename-btn cancel" onClick={e => { e.stopPropagation(); setRenamingId(null); }}>
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <h4 className="media-filename" title={item.file_name}>{item.file_name}</h4>
                  )}
                  
                  <div className="media-meta-row">
                    <span>{item.file_size}</span>
                    <span>•</span>
                    <span>{item.width && item.height ? `${item.width}x${item.height}` : 'Image'}</span>
                  </div>

                  {usages.length > 0 ? (
                    <span className="media-usage-tag" title={usages.join(', ')}>
                      Used In ({usages.length})
                    </span>
                  ) : (
                    <span className="media-usage-tag unused">Unused</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      {previewItem && (
        <div className="media-modal-backdrop" onClick={() => setPreviewItem(null)}>
          <div className="media-modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <button className="media-modal-close" onClick={() => setPreviewItem(null)}>
              <FiX />
            </button>
            <div className="media-modal-body">
              <div className="modal-preview-image-container">
                <img src={previewItem.file_url} alt={previewItem.file_name} className="modal-preview-image" />
              </div>
              <div className="modal-preview-details">
                <h3 className="modal-details-title">{previewItem.file_name}</h3>
                
                <table className="modal-details-table">
                  <tbody>
                    <tr>
                      <th>Original Name:</th>
                      <td>{previewItem.original_name || previewItem.file_name}</td>
                    </tr>
                    <tr>
                      <th>Dimensions:</th>
                      <td>{previewItem.width && previewItem.height ? `${previewItem.width} x ${previewItem.height} px` : 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>File Size:</th>
                      <td>{previewItem.file_size}</td>
                    </tr>
                    <tr>
                      <th>Mime Type:</th>
                      <td>{previewItem.mime_type || 'image/jpeg'}</td>
                    </tr>
                    <tr>
                      <th>Upload Date:</th>
                      <td>{previewItem.uploaded_at ? new Date(previewItem.uploaded_at).toLocaleString() : 'N/A'}</td>
                    </tr>
                    <tr>
                      <th>Usage Status:</th>
                      <td>
                        {getImageUsage(previewItem).length > 0 ? (
                          <div style={{ color: 'var(--primary-gold)' }}>
                            {getImageUsage(previewItem).map((u, i) => <div key={i}>• {u}</div>)}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)' }}>Unused (safe to delete)</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="modal-actions-row">
                  {onSelectImage ? (
                    <button 
                      className="admin-btn admin-btn-primary" 
                      onClick={() => { onSelectImage(previewItem); setPreviewItem(null); }}
                    >
                      <FiCheck /> Select Image
                    </button>
                  ) : (
                    <button 
                      className="admin-btn admin-btn-primary" 
                      onClick={() => handleCopyUrl(previewItem.file_url)}
                    >
                      <FiCopy /> Copy Image URL
                    </button>
                  )}
                  <button 
                    className="admin-btn admin-btn-danger" 
                    onClick={(e) => handleDeleteItem(previewItem, e)}
                  >
                    <FiTrash2 /> Delete Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styled Embed CSS for Media Library Specific Custom CMS Look */}
      <style>{`
        .media-library-page {
          padding: 24px;
          min-height: 70vh;
          position: relative;
        }
        .media-library-page.modal-mode {
          padding: 0;
          min-height: auto;
          background: transparent;
        }
        .media-close-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          padding: 8px 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .media-close-btn:hover {
          background: #ef4444;
          color: white;
        }
        .media-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 5000;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 8px;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: slideIn 0.3s ease;
        }
        .media-toast.success {
          background: #065f46;
          color: #a7f3d0;
          border: 1px solid #059669;
        }
        .media-toast.error {
          background: #991b1b;
          color: #fca5a5;
          border: 1px solid #dc2626;
        }
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .media-upload-dropzone {
          border: 2px dashed rgba(207, 168, 68, 0.3);
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          background: rgba(13, 24, 49, 0.2);
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }
        .media-upload-dropzone:hover, .media-upload-dropzone.dragging {
          border-color: var(--primary-gold);
          background: rgba(207, 168, 68, 0.05);
        }
        .dropzone-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .dropzone-icon {
          font-size: 2.8rem;
          color: var(--primary-gold);
          margin-bottom: 4px;
          filter: drop-shadow(0 0 8px rgba(207, 168, 68, 0.2));
        }
        .dropzone-content h3 {
          font-size: 1.1rem;
          color: var(--white);
          font-weight: 500;
        }
        .dropzone-content h3 span {
          color: var(--primary-gold);
          text-decoration: underline;
        }
        .dropzone-content p {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .media-upload-progress-wrapper {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .progress-bar-container {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: var(--gold-gradient);
          border-radius: 3px;
          transition: width 0.1s linear;
        }
        .progress-text {
          font-size: 0.8rem;
          color: var(--primary-gold);
          align-self: flex-end;
        }
        .media-controls-row {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .media-search-wrapper {
          position: relative;
          flex: 1;
        }
        .media-search-wrapper .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }
        .media-search-wrapper .admin-input {
          padding-left: 40px;
          width: 100%;
          box-sizing: border-box;
        }
        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }
        .media-card {
          background: rgba(13, 24, 49, 0.45);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .media-card:hover {
          border-color: var(--primary-gold);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 10px rgba(207, 168, 68, 0.1);
        }
        .media-thumbnail-wrapper {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          background: rgba(5,10,23,0.8);
          border-bottom: 1px solid var(--border-glass);
          overflow: hidden;
        }
        .media-thumbnail {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .media-card:hover .media-thumbnail {
          transform: scale(1.05);
        }
        .media-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(5, 10, 23, 0.75);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease;
        }
        .media-card:hover .media-hover-overlay {
          opacity: 1;
        }
        .hover-action-icons {
          display: flex;
          gap: 12px;
        }
        .action-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
        }
        .action-icon-btn:hover {
          background: var(--gold-gradient);
          color: var(--secondary-color);
          border-color: transparent;
        }
        .action-icon-btn.delete:hover {
          background: #ef4444;
          color: white;
          border-color: transparent;
        }
        .media-card-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--gold-gradient);
          color: var(--secondary-color);
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .media-card-action-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(207, 168, 68, 0.4);
        }
        .media-card-details {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .media-filename {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--white);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .media-meta-row {
          display: flex;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .media-usage-tag {
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(207, 168, 68, 0.15);
          color: var(--primary-gold);
          border: 1px solid rgba(207, 168, 68, 0.25);
          align-self: flex-start;
          margin-top: 4px;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .media-usage-tag.unused {
          background: rgba(255,255,255,0.05);
          color: var(--text-secondary);
          border-color: rgba(255,255,255,0.1);
        }
        .rename-input-wrapper {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .rename-input {
          padding: 4px 8px;
          font-size: 0.8rem;
          height: auto;
          flex: 1;
        }
        .rename-btn {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .rename-btn.save {
          background: var(--primary-gold);
          color: var(--secondary-color);
        }
        .rename-btn.cancel {
          background: rgba(255,255,255,0.1);
          color: var(--white);
        }
        .media-empty-state {
          padding: 60px 20px;
          text-align: center;
          color: var(--text-secondary);
          background: rgba(13, 24, 49, 0.25);
          border-radius: 12px;
          border: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .media-empty-state h3 {
          color: var(--white);
          margin-bottom: 8px;
          font-weight: 500;
        }

        /* Modal Preview */
        .media-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(2, 4, 10, 0.85);
          z-index: 4000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(8px);
        }
        .media-modal-content {
          width: 100%;
          max-width: 860px;
          background: #0d1831;
          border: 1px solid var(--primary-gold);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-premium), var(--shadow-gold);
          animation: scaleUp 0.3s ease;
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .media-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .media-modal-close:hover {
          background: #ef4444;
        }
        .media-modal-body {
          display: grid;
          grid-template-columns: 1fr;
          max-height: 85vh;
          overflow-y: auto;
        }
        @media (min-width: 768px) {
          .media-modal-body {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }
        .modal-preview-image-container {
          background: #050a17;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          min-height: 300px;
          border-bottom: 1px solid var(--border-glass);
        }
        @media (min-width: 768px) {
          .modal-preview-image-container {
            border-bottom: none;
            border-right: 1px solid var(--border-glass);
          }
        }
        .modal-preview-image {
          max-width: 100%;
          max-height: 350px;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .modal-preview-details {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .modal-details-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--white);
          margin: 0;
          word-break: break-all;
        }
        .modal-details-table {
          width: 100%;
          font-size: 0.85rem;
          border-collapse: collapse;
        }
        .modal-details-table th {
          text-align: left;
          color: var(--text-secondary);
          font-weight: 500;
          padding: 6px 0;
          width: 110px;
          vertical-align: top;
        }
        .modal-details-table td {
          color: var(--white);
          padding: 6px 0;
          word-break: break-all;
        }
        .modal-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: auto;
        }
        .modal-actions-row .admin-btn {
          flex: 1;
          min-width: 130px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
