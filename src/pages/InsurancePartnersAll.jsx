import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import { Shield, ArrowLeft } from 'lucide-react';
import './PremiumPartnerPage.css';
import '../sections/InsurancePartners.css';

export default function InsurancePartnersAll() {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState({});

  // Scroll to top and set SEO titles
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Our Trusted Insurance Partners | Shamsuddin Ratnani";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "View all our trusted insurance partners including LIC, Tata AIG, HDFC ERGO, Care Health, and Star Health. Compare policies and choose the best cover.");
    }
  }, []);

  const getShortName = (name) => {
    if (name.includes('LIC')) return 'LIC';
    if (name.includes('Tata AIG')) return 'Tata AIG';
    if (name.includes('HDFC ERGO')) return 'HDFC ERGO';
    if (name.includes('Care Health')) return 'Care Health';
    if (name.includes('Star Health')) return 'Star Health';
    return name;
  };

  const activePartners = (agentConfig?.partners || []).filter(p => !p.hidden);

  const handlePartnerClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  return (
    <div className="premium-partner-page partners-view-all">
      {/* Hero Banner */}
      <section 
        className="partner-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="partner-hero-nav">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>

        <div className="partner-hero-container">
          <div className="partner-hero-content">
            <div className="partner-badge">
              India's Top-Tier Insurance Carriers
            </div>
            <h1 className="partner-hero-title">
              OUR TRUSTED <span className="highlight-gold">PARTNERS</span>
            </h1>
            <p className="partner-hero-subtitle">
              We collaborate with premier national and multinational insurance institutions to bring you sovereign-backed assets, cashless medical facilities, and comprehensive property protections.
            </p>
          </div>
        </div>
      </section>

      {/* Grid listing section */}
      <section className="partner-plans-section">
        <div className="container">
          
          <div className="partner-section-header">
            <span className="partner-section-subtitle">AUTHORIZED COVERS</span>
            <h2 className="partner-section-title">ALL INSURANCE CARRIERS</h2>
          </div>

          <div className="partners-section revealed" style={{ background: 'none', padding: 0 }}>
            <div className="partners-grid">
              {activePartners.map((partner, index) => {
                return (
                  <div 
                    key={partner.id} 
                    className="partner-card"
                    onClick={() => handlePartnerClick(partner.buttonLink)}
                    style={{ 
                      transitionDelay: `${index * 60}ms`,
                      opacity: 1,
                      transform: 'none'
                    }}
                  >
                    <div className="partner-logo-container">
                      {!partner.logo || imageErrors[partner.id] ? (
                        <div className="partner-logo-fallback">
                          <Shield size={28} className="text-gold" />
                          <span className="partner-fallback-name">{getShortName(partner.name)}</span>
                        </div>
                      ) : (
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="partner-logo-img"
                          onError={() => setImageErrors(prev => ({ ...prev, [partner.id]: true }))}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      )}
                    </div>
                    
                    <h3 className="partner-card-name">{getShortName(partner.name)}</h3>
                    <span className="partner-card-category">{partner.category || 'Insurance'}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
