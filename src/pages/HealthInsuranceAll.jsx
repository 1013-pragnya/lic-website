import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import { Shield, TrendingUp, Coins, Wallet, GraduationCap, Heart, CheckCircle, X, Search, SlidersHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
import './RealEstateAll.css';
import './PremiumPartnerPage.css';
import './HealthInsuranceAll.css';

const iconMap = {
  Shield: Shield,
  TrendingUp: TrendingUp,
  Coins: Coins,
  Wallet: Wallet,
  GraduationCap: GraduationCap,
  Heart: Heart
};

export default function HealthInsuranceAll() {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();

  // Selected plan modal
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');

  // Pagination states
  const [visibleCount, setVisibleCount] = useState(8);

  // Scroll to top on mount and set SEO metadata
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Compare Health & Life Insurance Plans | RRFS";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Compare and choose from top-rated life and health insurance plans. Secure your family's future with sovereign guarantee options and premium health covers.");
    }
  }, []);

  const plansList = (agentConfig?.plans || []).filter(plan => !plan.hidden);

  // Extract unique providers for the dropdown
  const uniqueProviders = ['All', ...new Set(plansList.map(p => p.provider).filter(Boolean))];

  // Filter plans dynamically
  const filteredPlans = plansList.filter(plan => {
    const matchesSearch = 
      plan.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plan.benefits && plan.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesProvider = selectedProvider === 'All' || plan.provider === selectedProvider;

    return matchesSearch && matchesProvider;
  });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

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
    let planParam = 'life';
    if (title.toLowerCase().includes('care') || title.toLowerCase().includes('mediclaim')) planParam = 'health';
    else if (title.toLowerCase().includes('ergo') || title.toLowerCase().includes('health cover')) planParam = 'health';
    else if (title.toLowerCase().includes('general') || title.toLowerCase().includes('asset')) planParam = 'consult';
    
    navigate(`/?tab=insurance&plan=${planParam}#contact`);
  };

  return (
    <div className="view-all-page health-insurance-all">
      {/* Premium Hero Banner */}
      <section 
        className="partner-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="partner-hero-nav">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>

        <div className="partner-hero-container">
          <div className="partner-hero-content">
            <div className="partner-badge">
              Government Approved & Allied Cover
            </div>
            <h1 className="partner-hero-title">
              HEALTH & <span className="highlight-gold">LIFE PLANS</span>
            </h1>
            <p className="partner-hero-subtitle">
              Compare premium life insurance, comprehensive medical policies, and tax-saving assets under sovereign government guarantees.
            </p>
            <button className="partner-hero-btn" onClick={() => {
              const el = document.getElementById('plans-filter-section');
              if (el) {
                window.scrollTo({
                  top: el.offsetTop - 100,
                  behavior: 'smooth'
                });
              }
            }}>
              EXPLORE PLANS
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Filter Section */}
      <section className="filter-section" id="plans-filter-section">
        <div className="container">
          <div className="filter-bar glass-panel">
            
            {/* Search Input */}
            <div className="search-group">
              <Search className="search-icon text-gold" size={18} />
              <input 
                type="text" 
                placeholder="Search by policy name, coverage benefits, keywords..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(8); }}
                className="search-input"
              />
            </div>

            {/* Select Dropdown Filters */}
            <div className="select-filters">
              {/* Provider selector */}
              <div className="filter-item">
                <label className="filter-label"><Shield size={14} /> Provider</label>
                <select 
                  value={selectedProvider} 
                  onChange={(e) => { setSelectedProvider(e.target.value); setVisibleCount(8); }}
                  className="filter-select"
                >
                  <option value="All">All Providers</option>
                  {uniqueProviders.map(prov => (
                    prov !== 'All' && <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid Listing Section */}
      <main className="listing-main">
        <div className="container">
          
          {filteredPlans.length === 0 ? (
            <div className="no-results glass-panel">
              <SlidersHorizontal size={48} className="text-gold float-animation" />
              <h3>No Plans Found</h3>
              <p>Try refining your search terms or resetting the provider filters.</p>
              <button 
                className="reset-btn" 
                onClick={() => { setSearchQuery(''); setSelectedProvider('All'); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="premium-insurance-grid">
                {filteredPlans.slice(0, visibleCount).map((plan) => {
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

              {/* Load More Pagination */}
              {visibleCount < filteredPlans.length && (
                <div className="pagination-box flex-center">
                  <button className="load-more-btn" onClick={handleLoadMore}>
                    LOAD MORE
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </main>

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
