import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import './Testimonials.css';

export default function Testimonials() {
  const { agentConfig } = useConfig();
  const [activeIndex, setActiveIndex] = useState(0);
  const items = agentConfig?.testimonials || [];
  const cardRef = useRef(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    resetCardStyle();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    resetCardStyle();
  };

  const resetCardStyle = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.borderColor = 'var(--border-glass)';
    card.style.boxShadow = 'var(--shadow-premium)';
  };

  // 3D Card Hover Tilt
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = -(y - rect.height / 2) / (rect.height / 2) * 8;
    const rotateY = (x - rect.width / 2) / (rect.width / 2) * 8;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    card.style.borderColor = 'var(--primary-gold)';
    card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.65), var(--shadow-gold)';
  };

  const handleMouseLeave = () => {
    resetCardStyle();
  };

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Client Success</span>
          <h2 className="section-title">Trusted Testimonials</h2>
        </div>

        <div className="testimonials-slider-wrapper card-container-3d">
          
          {/* Quote background decoration */}
          <Quote className="quote-icon-bg text-gold" size={140} />

          <div className="testimonial-slide-viewport">
            {items.map((testimonial, idx) => (
              <div 
                key={idx}
                ref={idx === activeIndex ? cardRef : null}
                className={`testimonial-slide glass-panel card-3d ${idx === activeIndex ? 'active' : ''}`}
                onMouseMove={idx === activeIndex ? handleMouseMove : null}
                onMouseLeave={idx === activeIndex ? handleMouseLeave : null}
              >
                <div className="testimonial-avatar-wrapper">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name} 
                    className="testimonial-avatar" 
                  />
                  <div className="avatar-gold-glow" />
                </div>

                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--primary-gold)" stroke="none" />
                  ))}
                </div>
                
                <p className="testimonial-quote">"{testimonial.text}"</p>
                
                <div className="testimonial-author-box">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <span className="author-details">
                    {testimonial.location} &bull; <span className="text-gold">{testimonial.policy}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Controls Panel */}
          <div className="testimonials-controls">
            <button className="ctrl-btn prev" onClick={handlePrev} aria-label="Previous Testimonial">
              <ChevronLeft size={20} />
            </button>
            
            <div className="slider-dots">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot-btn ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    resetCardStyle();
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button className="ctrl-btn next" onClick={handleNext} aria-label="Next Testimonial">
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
