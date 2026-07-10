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
              <div className="listing-grid">
                {filteredPlans.slice(0, visibleCount).map((plan) => {
                  return (
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
                        
                        <div className="property-footer flex-between" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="property-price" style={{ display: 'flex', flexDirection: 'column' }}>
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
                            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                          >
                            Get Quote
                          </Button>
                        </div>
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
