import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import { Shield } from 'lucide-react';
import Button from '../components/Button';
import './InsurancePartners.css';

export default function InsurancePartners() {
  const navigate = useNavigate();
  const { agentConfig } = useConfig();
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
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

  const getShortName = (name) => {
    if (name.includes('LIC')) return 'LIC';
    if (name.includes('Tata AIG')) return 'Tata AIG';
    if (name.includes('HDFC ERGO')) return 'HDFC ERGO';
    if (name.includes('Care Health')) return 'Care Health';
    if (name.includes('Star Health')) return 'Star Health';
    return name;
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
                className="partner-card"
                onClick={() => handlePartnerClick(partner.buttonLink)}
                style={{ 
                  transitionDelay: `${index * 80}ms`
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
    </section>
  );
}
