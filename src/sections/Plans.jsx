import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, TrendingUp, Coins, Wallet, GraduationCap, Heart, ArrowRight, X, CheckCircle } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import './Plans.css';
import '../components/CardSlider.css';

const iconMap = {
  Shield: Shield,
  TrendingUp: TrendingUp,
  Coins: Coins,
  Wallet: Wallet,
  GraduationCap: GraduationCap,
  Heart: Heart
};

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

        {/* Keyed slider container to trigger CSS mount fade-in animation on transition */}
        <div className="slider-container" key={activeCategory}>
          <div 
            ref={sliderRef}
            className={`slider-track ${isDragging ? 'dragging' : ''} ${isVisible ? 'revealed' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveTrack}
            onMouseUp={handleMouseUpTrack}
            onMouseMove={handleMouseMoveTrack}
          >
            {filteredPlans.map((plan) => {
              const cardRef = useRef(null);

              const handleMouseMove = (e) => {
                if (isDragging) return;
                const card = cardRef.current;
                if (!card) return;
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const rotateX = -(y - rect.height / 2) / (rect.height / 2) * 10;
                const rotateY = (x - rect.width / 2) / (rect.width / 2) * 10;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                card.style.borderColor = 'rgba(207, 168, 68, 0.45)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.55), 0 0 25px rgba(207, 168, 68, 0.15)';
              };

              const handleMouseLeave = () => {
                const card = cardRef.current;
                if (!card) return;
                card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
                card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                card.style.boxShadow = 'var(--shadow-glass)';
              };

            return (
              <div 
                key={plan.id}
                ref={cardRef}
                className="plan-card glass-panel card-3d"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleOpenModal(plan)}
              >
                <div className="property-image-wrapper">
                  <div className="plan-logo-wrapper">
                    <img src={plan.logo} alt={plan.provider} className="plan-logo-img" loading="lazy" />
                  </div>
                  <div className="property-category-badge">{plan.provider}</div>
                </div>
                
                <div className="property-details">
                  <span className="plan-provider-name">
                    {plan.provider.toUpperCase()} INSURANCE
                  </span>
                  <h3 className="plan-card-title">
                    {plan.title}
                  </h3>
                  
                  <p className="plan-card-desc">
                    {plan.description}
                  </p>
                  
                  <div className="property-features">
                    <h4 className="features-label text-gold">
                      Key Benefits:
                    </h4>
                    <ul className="card-benefits-list-preview">
                      {plan.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx}>
                          <CheckCircle size={12} className="text-gold" style={{ flexShrink: 0 }} />
                          <span>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="primary" 
                    className="plan-card-view-btn property-btn"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      handleOpenModal(plan); 
                    }}
                  >
                    View Plans
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
              <div className="modal-title-wrapper">
                <h3 className="modal-title">{selectedPlan.title}</h3>
                <span className="modal-tagline">{selectedPlan.tagline}</span>
              </div>
            </div>

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
