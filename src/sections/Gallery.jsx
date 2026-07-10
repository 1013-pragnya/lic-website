import React, { useState, useEffect } from 'react';
import { useConfig } from '../config/AppContext';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

export default function Gallery() {
  const { agentConfig } = useConfig();
  const gallery = agentConfig?.gallery || [];

  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // If no images, hide the section entirely
  if (gallery.length === 0) {
    return null;
  }

  const handleOpen = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        
        {/* Section Header */}
        <div className="gallery-header text-center">
          <span className="gallery-subtitle">Glimpses of Trust</span>
          <h2 className="gallery-title">ADVISOR PHOTO GALLERY</h2>
          <div className="gold-divider"></div>
          <p className="gallery-desc">
            Visual milestones, professional training seminars, client advisory meets, and honorary recognitions.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid">
          {gallery.map((img, idx) => (
            <motion.div 
              key={img.id || idx}
              className="gallery-item-wrapper"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => handleOpen(idx)}
            >
              <div className="gallery-image-box">
                <img src={img.url} alt={img.caption} className="gallery-img-preview" loading="lazy" />
                <div className="gallery-image-hover-overlay">
                  <div className="gallery-hover-icon">
                    <ImageIcon size={24} />
                  </div>
                  <span className="gallery-image-caption">{img.caption}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Sheet */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <button className="lightbox-close-btn" onClick={handleClose} aria-label="Close Lightbox">
              <X size={24} />
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              
              {/* Prev Button */}
              <button className="lightbox-arrow prev" onClick={handlePrev} aria-label="Previous Image">
                <ChevronLeft size={30} />
              </button>

              <div className="lightbox-image-stage">
                <motion.img 
                  key={lightboxIndex}
                  src={gallery[lightboxIndex].url} 
                  alt={gallery[lightboxIndex].caption} 
                  className="lightbox-main-img"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="lightbox-caption-panel">
                  <span className="lightbox-counter">Image {lightboxIndex + 1} of {gallery.length}</span>
                  <p className="lightbox-caption">{gallery[lightboxIndex].caption}</p>
                </div>
              </div>

              {/* Next Button */}
              <button className="lightbox-arrow next" onClick={handleNext} aria-label="Next Image">
                <ChevronRight size={30} />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
