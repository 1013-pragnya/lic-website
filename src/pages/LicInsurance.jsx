import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import { Shield, CheckCircle, X, ArrowLeft, ArrowDown } from 'lucide-react';
import './PremiumPartnerPage.css';

export default function LicInsurance() {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Scroll to top on mount and set SEO meta tags
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "LIC Life Insurance Plans | Shamsuddin Ratnani";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Secure your family's future with trusted life insurance plans backed by LIC. Choose reliable protection, long-term savings, and financial security with sovereign guarantee.");
    }
  }, []);

  const plans = (agentConfig?.plans || []).filter(
    plan => !plan.hidden && plan.provider && plan.provider.toLowerCase().includes('lic')
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
    navigate(`/?tab=insurance&plan=life#contact`);
  };

  const scrollToPlans = () => {
    const el = document.getElementById('lic-plans-grid');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="premium-partner-page lic-insurance-page">
      {/* Premium Hero Banner */}
      <section 
        className="partner-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="partner-hero-nav">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>

        <div className="partner-hero-container">
          <div className="partner-hero-content">
            <div className="partner-badge">
              <Shield size={14} /> Sovereign Guarantee
            </div>
            <h1 className="partner-hero-title">
              LIC <span className="highlight-gold">Insurance</span>
            </h1>
            <p className="partner-hero-subtitle">
              Secure your family's future with trusted life insurance plans backed by LIC. Choose reliable protection, long-term savings, and financial security.
            </p>
            <button className="partner-hero-btn" onClick={scrollToPlans}>
              VIEW LIC PLANS <ArrowDown size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="partner-plans-section" id="lic-plans-grid">
        <div className="container">
          <div className="partner-section-header">
            <span className="partner-section-subtitle">Official Partner Products</span>
            <h2 className="partner-section-title">EXCLUSIVE LIC PLANS</h2>
          </div>

          {plans.length === 0 ? (
            <div className="no-results glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
              <Shield size={48} className="text-gold float-animation" style={{ margin: '0 auto 16px' }} />
              <h3>No LIC Plans Loaded</h3>
              <p>Check the administration settings or reload the page.</p>
            </div>
          ) : (
            <div className="partner-plans-grid">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className="plan-card glass-panel glass-panel-hover card-3d partner-card-single"
                  onClick={() => handleOpenModal(plan)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="plan-logo-wrapper">
                    <img src={plan.logo} alt={plan.provider} className="plan-logo-img" loading="lazy" />
                  </div>
                  <span className="plan-provider-name">{plan.provider.toUpperCase()} INSURANCE</span>
                  <h3 className="plan-card-title">{plan.title}</h3>
                  <p className="plan-card-desc">{plan.description}</p>
                  
                  <div className="plan-card-footer" style={{ marginTop: 'auto', width: '100%' }}>
                    <Button 
                      variant="primary" 
                      className="plan-card-view-btn"
                      style={{ width: '100%', borderRadius: '50px' }}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handleOpenModal(plan); 
                      }}
                    >
                      View Details
                    </Button>
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
