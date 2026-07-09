import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import { Shield, TrendingUp, Coins, Wallet, GraduationCap, Heart, CheckCircle, X, Search, SlidersHorizontal, ArrowLeft, ArrowRight } from 'lucide-react';
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plansList = agentConfig?.plans || [];

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
      {/* Premium Header */}
      <header className="all-header">
        <div className="container header-container">
          <button className="back-home-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          
          <div className="header-title-box">
            <span className="subtitle-gold">Government Approved & Allied Cover</span>
            <h1 className="main-title">HEALTH & LIFE INSURANCE PLANS</h1>
            <p className="description-secondary">
              Compare premium life insurance, comprehensive medical policies, and tax-saving assets under sovereign government guarantees.
            </p>
          </div>
        </div>
      </header>

      {/* Advanced Filter Section */}
      <section className="filter-section">
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
                  const IconComponent = iconMap[plan.icon] || Shield;
                  return (
                    <div 
                      key={plan.id} 
                      className="plan-card glass-panel glass-panel-hover card-3d"
                      onClick={() => handleOpenModal(plan)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="plan-logo-wrapper">
                        <img src={plan.logo} alt={plan.provider} className="plan-logo-img" loading="lazy" />
                      </div>
                      <span className="plan-provider-name">{plan.provider.toUpperCase()} INSURANCE</span>
                      <h3 className="plan-card-title">{plan.title}</h3>
                      <p className="plan-card-desc">{plan.description}</p>
                      
                      <div className="plan-card-footer" style={{ marginTop: 'auto' }}>
                        <span className="plan-card-link-btn">
                          View Details & Benefits <ArrowRight size={14} style={{ display: 'none' }} />
                        </span>
                        <Button 
                          variant="primary" 
                          className="plan-card-quote-btn"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleEnquire(plan.title); 
                          }}
                        >
                          Get Quote
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
