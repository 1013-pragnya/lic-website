import React, { useState, useEffect, useRef } from 'react';
import { Shield, TrendingUp, Coins, Wallet, GraduationCap, Heart, ArrowRight, X, CheckCircle } from 'lucide-react';
import { agentConfig } from '../config/agentConfig';
import Button from '../components/Button';
import './Plans.css';

const iconMap = {
  Shield: Shield,
  TrendingUp: TrendingUp,
  Coins: Coins,
  Wallet: Wallet,
  GraduationCap: GraduationCap,
  Heart: Heart
};

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    const firstName = agentConfig.name.split(' ')[0];
    const text = encodeURIComponent(`Hi ${firstName}, I'm interested in the LIC policy plan: "${title}". Please share details and premium options.`);
    window.open(`https://wa.me/${agentConfig.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="plans" ref={sectionRef} className="section plans-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Secure & Grow</span>
          <h2 className="section-title">LIC Insurance Plans</h2>
        </div>

        <div className={`plans-grid card-container-3d ${isVisible ? 'revealed' : ''}`}>
          {agentConfig.plans.map((plan) => {
            const IconComponent = iconMap[plan.icon];
            const cardRef = useRef(null);

            const handleMouseMove = (e) => {
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
                <div className="plan-card-icon-box">
                  {IconComponent && <IconComponent size={28} className="plan-card-icon" />}
                </div>
                <h3 className="plan-card-title">{plan.title}</h3>
                <span className="plan-card-tagline">{plan.tagline}</span>
                <p className="plan-card-desc">{plan.description}</p>
                
                <div className="plan-card-footer">
                  <span className="plan-card-link-btn">
                    View Details & Benefits <ArrowRight size={14} />
                  </span>
                  <Button 
                    variant="primary" 
                    className="plan-card-quote-btn"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      openWhatsAppPlan(plan.title); 
                    }}
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            );
          })}
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
                {React.createElement(iconMap[selectedPlan.icon], { size: 30, className: 'modal-icon' })}
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
