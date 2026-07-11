import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, TrendingUp, Coins, Wallet, GraduationCap, Heart, ArrowRight, X, CheckCircle } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import './Plans.css';
import '../components/CardSlider.css';
import licLogo from '../assets/lic-logo.png';
import tataLogo from '../assets/tata-logo.png';
import hdfcLogo from '../assets/hdfc-logo.png';
import careLogo from '../assets/care-logo.png';
import starLogo from '../assets/star-logo.png';

const iconMap = {
  Shield: Shield,
  TrendingUp: TrendingUp,
  Coins: Coins,
  Wallet: Wallet,
  GraduationCap: GraduationCap,
  Heart: Heart
};

function CardBanner({ src, alt, provider }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const getProviderLogo = (prov) => {
    switch (prov?.toUpperCase()) {
      case 'LIC':
        return licLogo;
      case 'TATA AIG':
        return tataLogo;
      case 'HDFC ERGO':
        return hdfcLogo;
      case 'CARE HEALTH':
      case 'CARE':
        return careLogo;
      case 'STAR HEALTH':
      case 'STAR':
        return starLogo;
      default:
        return null;
    }
  };

  const logoUrl = getProviderLogo(provider);

  if (error || !src) {
    return (
      <div className="fallback-banner">
        {logoUrl ? (
          <div className="fallback-banner-logo-wrapper">
            <img src={logoUrl} alt={provider} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        ) : (
          <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-gold)' }}>
            {provider}
          </span>
        )}
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
      {!loaded && (
        <div 
          className="skeleton-banner" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} 
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block'
        }}
      />
    </div>
  );
}

export default function Plans({ onGetQuote }) {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);

  // Slider Mouse Drag State
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = [
    { id: 'All', label: 'All Plans' },
    { id: 'LIC', label: 'LIC Insurance' },
    { id: 'Tata AIG', label: 'Tata AIG Insurance' },
    { id: 'Care Health', label: 'Care Health Insurance' },
    { id: 'HDFC ERGO', label: 'HDFC ERGO Insurance' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    document.body.style.overflow = 'auto';
  };

  const openWhatsAppPlan = (title) => {
    const firstName = agentConfig?.name.split(' ')[0] || "Advisor";
    const text = encodeURIComponent(`Hi ${firstName}, I'm interested in the LIC policy plan: "${title}". Please share details and premium options.`);
    window.open(`https://wa.me/${agentConfig?.contact?.whatsapp}?text=${text}`, '_blank');
  };

  // Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeaveTrack = () => {
    setIsDragging(false);
  };

  const handleMouseUpTrack = () => {
    setIsDragging(false);
  };

  const handleMouseMoveTrack = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const plansList = (agentConfig?.plans || []).filter(plan => !plan.hidden);
  const filteredPlans = activeCategory === 'All'
    ? plansList
    : plansList.filter(plan => plan.provider && plan.provider.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]));

  return (
    <section id="plans" ref={sectionRef} className="section plans-section">
      <div className="container">
        
        <div className="section-header-split">
          <div className="section-header-left">
            <span className="section-subtitle">Secure & Grow</span>
            <h2 className="section-title">HEALTH & LIFE INSURANCE PLANS</h2>
          </div>
          <button className="view-all-btn desktop-only-btn" onClick={() => navigate('/health-insurance/plans')}>
            VIEW ALL <span className="arrow">→</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Keyed grid container to trigger CSS mount fade-in animation on transition */}
        <div className="plans-container-grid" key={activeCategory} style={{ width: '100%', marginTop: '40px' }}>
          <div className="premium-insurance-grid-slider">
            {filteredPlans.map((plan) => {
              // Truncate description at 95 characters without appending "..."
              const truncateDesc = (text) => {
                if (text && text.length > 95) {
                  const cleanText = text.substring(0, 95);
                  const lastSpace = cleanText.lastIndexOf(" ");
                  return cleanText.substring(0, lastSpace > 0 ? lastSpace : 95);
                }
                return text;
              };

              // Show only first 4 benefits on the card
              const cardBenefits = (plan.benefits || []).slice(0, 4);

              return (
                <div 
                  key={plan.id}
                  className="premium-insurance-card premium-insurance-card-slider"
                  onClick={() => handleOpenModal(plan)}
                >
                  <div className="card-image-wrapper">
                    <CardBanner src={plan.image} alt={plan.title} provider={plan.provider} />
                  </div>
                  
                  <div className="card-details-wrapper">
                    <span className="card-product-category">
                      {plan.category || `${plan.provider} Insurance`}
                    </span>
                    <h3 className="card-product-title">
                      {plan.title}
                    </h3>
                    
                    <p className="card-product-desc">
                      {truncateDesc(plan.description)}
                    </p>
                    
                    <ul className="card-benefits-list">
                      {cardBenefits.map((benefit, idx) => (
                        <li key={idx} className="card-benefit-item">
                          <CheckCircle size={14} className="text-gold" style={{ flexShrink: 0 }} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      variant="primary" 
                      className="card-cta-btn"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleOpenModal(plan); 
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet View All Button */}
        <div className="mobile-view-all-container">
          <button className="view-all-btn mobile-only-btn" onClick={() => navigate('/health-insurance/plans')}>
            VIEW ALL <span className="arrow">→</span>
          </button>
        </div>

      </div>

      {/* Modal Dialog Sheet */}
      {selectedPlan && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
              <X size={20} />
            </button>
            
            <div className="modal-header">
              <div className="modal-icon-box">
                {React.createElement(iconMap[selectedPlan.icon] || Shield, { size: 30, className: 'modal-icon' })}
              </div>
            </div>

            {selectedPlan.image && (
              <div className="modal-flyer-wrapper" style={{ padding: '0 24px 16px', borderBottom: '1px solid var(--border-glass)', marginBottom: '16px' }}>
                <img 
                  src={selectedPlan.image} 
                  alt={selectedPlan.title} 
                  style={{ width: '100%', maxHeight: '320px', objectFit: 'contain', borderRadius: '8px', cursor: 'zoom-in', display: 'block', margin: '0 auto' }} 
                  onClick={() => window.open(selectedPlan.image, '_blank')}
                  title="Click to view full flyer"
                />
              </div>
            )}

            <div className="modal-body-grid">
              
              {/* Benefits */}
              <div className="modal-col benefits-col">
                <h4 className="modal-col-title">Key Policy Benefits</h4>
                <ul className="modal-benefits-list">
                  {selectedPlan.benefits.map((benefit, index) => (
                    <li key={index} className="modal-benefit-item">
                      <CheckCircle size={16} className="benefit-check" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div className="modal-col eligibility-col">
                <h4 className="modal-col-title">Eligibility Criteria</h4>
                <div className="eligibility-table">
                  <div className="eligibility-row">
                    <span className="label">Entry Age:</span>
                    <span className="val">Min: {selectedPlan.eligibility.minAge} / Max: {selectedPlan.eligibility.maxAge}</span>
                  </div>
                  <div className="eligibility-row">
                    <span className="label">Policy Term:</span>
                    <span className="val">{selectedPlan.eligibility.term}</span>
                  </div>
                  <div className="eligibility-row">
                    <span className="label">Min Sum Assured:</span>
                    <span className="val">{selectedPlan.eligibility.minSumAssured}</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <Button variant="primary" onClick={() => openWhatsAppPlan(selectedPlan.title)}>
                    Consult About This Plan
                  </Button>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
