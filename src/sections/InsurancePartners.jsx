import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import './InsurancePartners.css';

export default function InsurancePartners() {
  const navigate = useNavigate();
  const { agentConfig } = useConfig();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Load from database partners list and filter out hidden partners
  const activePartners = (agentConfig?.partners || []).filter(p => !p.hidden);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handlePartnerClick = (buttonLink) => {
    if (!buttonLink) return;
    if (buttonLink.startsWith('http') || buttonLink.startsWith('https')) {
      window.open(buttonLink, '_blank');
    } else {
      navigate(buttonLink);
    }
  };

  return (
    <section 
      id="partners" 
      ref={sectionRef} 
      className={`section partners-section ${isVisible ? 'revealed' : ''}`}
    >
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">WE OFFER POLICIES FROM INDIA'S LEADING INSURANCE COMPANIES</span>
          <h2 className="section-title">OUR TRUSTED INSURANCE PARTNERS</h2>
        </div>

        <div className="partners-grid">
          {activePartners.map((partner, index) => {
            return (
              <div 
                key={partner.id} 
                className="partner-card glass-panel"
                style={{ 
                  transitionDelay: `${index * 80}ms`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '24px',
                  borderRadius: '18px',
                  boxSizing: 'border-box',
                  minHeight: '280px'
                }}
              >
                <div className="partner-logo-container" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '70px',
                  width: '100%',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-glass)',
                  paddingBottom: '10px'
                }}>
                  {partner.logo ? (
                    <div style={{ background: '#ffffff', width: '100%', height: '100%', padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                      <img 
                        src={partner.logo} 
                        alt={partner.name} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-gold)' }}>
                      {partner.name}
                    </span>
                  )}
                </div>
                
                <span className="partner-name" style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '700', 
                  color: 'var(--white)',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {partner.name}
                </span>

                {partner.description && (
                  <p className="partner-desc" style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    margin: '0 0 16px 0',
                    textAlign: 'center',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
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
    </section>
  );
}
