import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import { Shield, CheckCircle, X, ArrowLeft, ArrowDown } from 'lucide-react';
import './RealEstateAll.css';
import './PremiumPartnerPage.css';

export default function CareHealthInsurance() {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Scroll to top on mount and set SEO meta tags
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Care Health Insurance Plans | Shamsuddin Ratnani";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Get complete health protection with cashless hospitalization, critical illness cover, and family health plans from Care Health.");
    }
  }, []);

  const plans = (agentConfig?.plans || []).filter(
    plan => !plan.hidden && plan.provider && plan.provider.toLowerCase().includes('care')
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
    const el = document.getElementById('care-plans-grid');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="premium-partner-page care-insurance-page">
      {/* Premium Hero Banner */}
      <section 
        className="partner-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="partner-hero-nav">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>

        <div className="partner-hero-container">
          <div className="partner-hero-content">
            <div className="partner-badge">
              <Shield size={14} /> Comprehensive Health Protection
            </div>
            <h1 className="partner-hero-title">
              CARE HEALTH <span className="highlight-gold">Insurance</span>
            </h1>
            <p className="partner-hero-subtitle">
              Get complete health protection with cashless hospitalization, critical illness cover, and family health plans from Care Health.
            </p>
            <button className="partner-hero-btn" onClick={scrollToPlans}>
              VIEW CARE HEALTH PLANS <ArrowDown size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="partner-plans-section" id="care-plans-grid">
        <div className="container">
          <div className="partner-section-header">
            <span className="partner-section-subtitle">Official Partner Products</span>
            <h2 className="partner-section-title">EXCLUSIVE CARE HEALTH PLANS</h2>
          </div>

          {plans.length === 0 ? (
            <div className="no-results glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
              <Shield size={48} className="text-gold float-animation" style={{ margin: '0 auto 16px' }} />
              <h3>No Care Health Plans Loaded</h3>
              <p>Check the administration settings or reload the page.</p>
            </div>
          ) : (
            <div className="listing-grid">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className="property-card glass-panel glass-panel-hover card-3d"
                  onClick={() => handleOpenModal(plan)}
                  style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="property-image-wrapper" style={{ height: '140px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    {plan.logo ? (
                      <img src={plan.logo} alt={plan.provider} className="property-img" style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }} loading="lazy" />
                    ) : (
                      <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-gold)' }}>
                        {plan.provider}
                      </span>
                    )}
                    <div className="property-category-badge" style={{ background: 'rgba(207, 168, 68, 0.1)', border: '1px solid var(--border-gold)', color: 'var(--primary-gold)' }}>
                      {plan.provider}
                    </div>
                  </div>
                  
                  <div className="property-details" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, width: '100%', boxSizing: 'border-box' }}>
                    <div className="property-location flex-align" style={{ gap: '6px', marginBottom: '8px' }}>
                      <Shield size={14} className="text-gold" />
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-gold)', letterSpacing: '1px' }}>
                        {plan.provider.toUpperCase()} INSURANCE
                      </span>
                    </div>
                    
                    <h3 className="property-title" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--white)', marginBottom: '8px', minHeight: '48px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {plan.title}
                    </h3>
                    
                    <p className="property-type" style={{ fontSize: '0.82rem', color: 'var(--primary-gold)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                      {plan.tagline}
                    </p>
                    
                    <div className="property-highlights" style={{ marginBottom: '16px', flex: 1 }}>
                      <p className="highlight-text" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {plan.description}
                      </p>
                    </div>
                    
                    <div className="property-footer" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                      <div className="property-price" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <span className="price-label" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Min Sum Assured</span>
                        <span className="price-value" style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--white)', marginTop: '2px' }}>{plan.eligibility?.minSumAssured || 'N/A'}</span>
                      </div>
                      <Button 
                        variant="primary" 
                        className="property-btn" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          handleEnquire(plan.title); 
                        }}
                        style={{ width: '100%', padding: '10px 16px', fontSize: '0.85rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
