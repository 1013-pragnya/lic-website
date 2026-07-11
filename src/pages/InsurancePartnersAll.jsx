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
                    className="partner-card glass-panel"
                    style={{ 
                      transitionDelay: `${index * 85}ms`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '30px 24px',
                      borderRadius: '18px',
                      boxSizing: 'border-box',
                      minHeight: '320px',
                      opacity: 1,
                      transform: 'none'
                    }}
                  >
                    <div className="partner-logo-container" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '100px',
                      width: '100%',
                      marginBottom: '20px',
                      borderBottom: '1px solid var(--border-glass)',
                      paddingBottom: '12px'
                    }}>
                      {!partner.logo || imageErrors[partner.id] ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <Shield size={28} className="text-gold" />
                          <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-gold)' }}>
                            {partner.name}
                          </span>
                        </div>
                      ) : (
                        <div style={{ background: '#ffffff', width: '100%', height: '100%', padding: '12px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                          <img 
                            src={partner.logo} 
                            alt={partner.name} 
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                            onError={() => setImageErrors(prev => ({ ...prev, [partner.id]: true }))}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                    
                    <span className="partner-name" style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: '700', 
                      color: 'var(--white)',
                      marginBottom: '14px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {partner.name}
                    </span>

                    {partner.description && (
                      <p className="partner-desc" style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5',
                        margin: '0 0 20px 0',
                        textAlign: 'center'
                      }}>
                        {partner.description}
                      </p>
                    )}

                    <button 
                      className="partner-btn"
                      onClick={() => handlePartnerClick(partner.buttonLink)}
                      style={{
                        marginTop: 'auto',
                        width: '100%'
                      }}
                    >
                      {partner.buttonText || 'VIEW PLANS'}
                    </button>
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
