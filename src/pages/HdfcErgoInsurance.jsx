import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import { Shield, CheckCircle, X, ArrowLeft, ArrowDown } from 'lucide-react';
import './RealEstateAll.css';
import './PremiumPartnerPage.css';

export default function HdfcErgoInsurance() {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Scroll to top on mount and set SEO meta tags
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "HDFC ERGO Health Insurance Plans | Shamsuddin Ratnani";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Comprehensive health and general insurance plans from HDFC ERGO with cashless benefits and extensive coverage across India.");
    }
  }, []);

  const plans = (agentConfig?.plans || []).filter(
    plan => !plan.hidden && plan.provider && plan.provider.toLowerCase().includes('hdfc')
  );

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    document.body.style.overflow = 'auto';
  };

  const handleEnquire = (title) => {
    handleCloseModal();
    navigate(`/?tab=insurance&plan=health#contact`);
  };

  const scrollToPlans = () => {
    const el = document.getElementById('hdfc-plans-grid');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="premium-partner-page hdfc-insurance-page">
      {/* Premium Hero Banner */}
      <section 
        className="partner-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="partner-hero-nav">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>

        <div className="partner-hero-container">
          <div className="partner-hero-content">
            <div className="partner-badge">
              <Shield size={14} /> Cashless Hospitalization
            </div>
            <h1 className="partner-hero-title">
              HDFC ERGO <span className="highlight-gold">Insurance</span>
            </h1>
            <p className="partner-hero-subtitle">
              Comprehensive health and general insurance plans with cashless benefits and extensive coverage across India.
            </p>
            <button className="partner-hero-btn" onClick={scrollToPlans}>
              VIEW HDFC ERGO PLANS <ArrowDown size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="partner-plans-section" id="hdfc-plans-grid">
        <div className="container">
          <div className="partner-section-header">
            <span className="partner-section-subtitle">Official Partner Products</span>
            <h2 className="partner-section-title">EXCLUSIVE HDFC ERGO PLANS</h2>
          </div>

          {plans.length === 0 ? (
            <div className="no-results glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
              <Shield size={48} className="text-gold float-animation" style={{ margin: '0 auto 16px' }} />
              <h3>No HDFC ERGO Plans Loaded</h3>
              <p>Check the administration settings or reload the page.</p>
            </div>
          ) : (
            <div className="premium-insurance-grid">
              {plans.map((plan) => {
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
                    className="premium-insurance-card"
                    onClick={() => handleOpenModal(plan)}
                  >
                    <div className="card-image-wrapper">
                      <img src={plan.image} alt={plan.title} loading="lazy" />
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
          )}
        </div>
      </section>

      {/* Plan Details Modal Sheet */}
      {selectedPlan && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
              <X size={20} />
            </button>
            
            <div className="modal-header">
              <div className="modal-icon-box">
                <Shield size={30} className="modal-icon" />
              </div>
              <div className="modal-title-wrapper">
                <span className="modal-provider-label text-gold">{selectedPlan.provider}</span>
                <h3 className="modal-title">{selectedPlan.title}</h3>
                <span className="modal-tagline">{selectedPlan.tagline}</span>
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
                  {selectedPlan.benefits?.map((benefit, index) => (
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
                    <span className="val">Min: {selectedPlan.eligibility?.minAge || 'N/A'} / Max: {selectedPlan.eligibility?.maxAge || 'N/A'}</span>
                  </div>
                  <div className="eligibility-row">
                    <span className="label">Policy Term:</span>
                    <span className="val">{selectedPlan.eligibility?.term || 'N/A'}</span>
                  </div>
                  <div className="eligibility-row">
                    <span className="label">Min Sum Assured:</span>
                    <span className="val">{selectedPlan.eligibility?.minSumAssured || 'N/A'}</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <Button variant="primary" onClick={() => handleEnquire(selectedPlan.title)}>
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
    </div>
  );
}
