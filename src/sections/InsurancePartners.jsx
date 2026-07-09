import React, { useState, useEffect, useRef } from 'react';
import './InsurancePartners.css';

// Custom inline SVG logos to maintain the premium Dark Navy + Gold luxury aesthetic
const Logos = {
  LIC: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <path d="M60 12C54 12 50 17 50 23C50 31 60 38 60 38C60 38 70 31 70 23C70 17 66 12 60 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60 20C57.5 20 56 22 56 24.5C56 27.5 60 31 60 31C60 31 64 27.5 64 24.5C64 22 62.5 20 60 20Z" fill="currentColor"/>
      <path d="M42 32C46 36 52 38 58 39" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M78 32C74 36 68 38 62 39" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <text x="60" y="52" fontSize="9" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="2" fill="currentColor">LIC</text>
    </svg>
  ),
  TataAig: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <text x="60" y="24" fontSize="16" fontFamily="Poppins" fontWeight="900" textAnchor="middle" letterSpacing="1" fill="currentColor">TATA</text>
      <line x1="30" y1="32" x2="90" y2="32" stroke="currentColor" strokeWidth="1.5"/>
      <text x="60" y="48" fontSize="13" fontFamily="Poppins" fontWeight="700" textAnchor="middle" letterSpacing="3" fill="currentColor">AIG</text>
    </svg>
  ),
  StarHealth: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <polygon points="60,8 64,20 77,20 66,28 70,40 60,32 50,40 54,28 43,20 56,20" fill="currentColor"/>
      <circle cx="60" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
      <text x="60" y="54" fontSize="8" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="1.5" fill="currentColor">STAR HEALTH</text>
    </svg>
  ),
  CareHealth: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <path d="M60 14C54 7 42 7 42 19C42 30 60 41 60 41C60 41 78 30 78 19C78 7 66 7 60 14Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M57 24C51 20 46 22 46 24C46 27 60 36 60 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="60" y="52" fontSize="10" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="2" fill="currentColor">CARE</text>
    </svg>
  ),
  HdfcErgo: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <text x="60" y="24" fontSize="14" fontFamily="Poppins" fontWeight="900" textAnchor="middle" fill="currentColor">HDFC</text>
      <rect x="25" y="30" width="70" height="2" fill="currentColor"/>
      <text x="60" y="47" fontSize="12" fontFamily="Poppins" fontWeight="700" textAnchor="middle" letterSpacing="3" fill="currentColor">ERGO</text>
    </svg>
  ),
  IciciLombard: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <path d="M35 12V48M35 30L52 12M35 30L52 48" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="80" y="26" fontSize="12" fontFamily="Poppins" fontWeight="800" textAnchor="middle" fill="currentColor">ICICI</text>
      <text x="80" y="44" fontSize="8" fontFamily="Poppins" fontWeight="700" textAnchor="middle" letterSpacing="1" fill="currentColor">LOMBARD</text>
    </svg>
  ),
  NivaBupa: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <circle cx="50" cy="22" r="14" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="70" cy="22" r="14" stroke="currentColor" strokeWidth="2.5"/>
      <text x="60" y="50" fontSize="9" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="1" fill="currentColor">NIVA BUPA</text>
    </svg>
  ),
  BajajAllianz: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <text x="60" y="23" fontSize="14" fontFamily="Poppins" fontWeight="900" textAnchor="middle" letterSpacing="0.5" fill="currentColor">BAJAJ</text>
      <line x1="30" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="1"/>
      <text x="60" y="47" fontSize="11" fontFamily="Poppins" fontWeight="600" textAnchor="middle" letterSpacing="1.5" fill="currentColor">Allianz</text>
    </svg>
  ),
  SbiLife: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <circle cx="60" cy="20" r="13" stroke="currentColor" strokeWidth="3"/>
      <rect x="58.5" y="20" width="3" height="14" fill="currentColor"/>
      <text x="60" y="50" fontSize="10" fontFamily="Poppins" fontWeight="900" textAnchor="middle" letterSpacing="2" fill="currentColor">SBI LIFE</text>
    </svg>
  ),
  MaxLife: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <path d="M40 12L52 34L64 12L76 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="60,24 62,29 67,29 63,32 65,37 60,34 55,37 57,32 53,29 58,29" fill="currentColor"/>
      <text x="60" y="51" fontSize="9" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="1.5" fill="currentColor">MAX LIFE</text>
    </svg>
  ),
  AdityaBirla: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <circle cx="60" cy="25" r="9" fill="currentColor"/>
      <path d="M60 5V13M38 25H46M82 25H74M44 9L50 15M76 9L70 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="60" y="50" fontSize="8" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="0.5" fill="currentColor">ADITYA BIRLA</text>
    </svg>
  ),
  PnbMetlife: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <text x="42" y="24" fontSize="16" fontFamily="Poppins" fontWeight="900" fill="currentColor">pnb</text>
      <circle cx="80" cy="19" r="11" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M74 19C77 15.5 83 15.5 86 19" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <text x="60" y="47" fontSize="10" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="2.5" fill="currentColor">METLIFE</text>
    </svg>
  ),
  RelianceGeneral: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <text x="60" y="23" fontSize="13" fontFamily="Poppins" fontWeight="900" textAnchor="middle" fill="currentColor">RELIANCE</text>
      <line x1="20" y1="28" x2="100" y2="28" stroke="currentColor" strokeWidth="1"/>
      <text x="60" y="44" fontSize="10" fontFamily="Poppins" fontWeight="700" textAnchor="middle" letterSpacing="3" fill="currentColor">GENERAL</text>
    </svg>
  ),
  IffcoTokio: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <path d="M48 12C37 18 37 32 48 37C59 32 59 18 48 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M72 12C61 18 61 32 72 37C83 32 83 18 72 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="60" y="52" fontSize="9" fontFamily="Poppins" fontWeight="800" textAnchor="middle" fill="currentColor">IFFCO-TOKIO</text>
    </svg>
  ),
  NewIndia: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <path d="M60 7L84 14V27C84 37 60 43 60 43C60 43 36 37 36 27V14L60 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="60" y="21" fontSize="8" fontFamily="Poppins" fontWeight="900" textAnchor="middle" fill="currentColor">NEW INDIA</text>
      <text x="60" y="31" fontSize="6.5" fontFamily="Poppins" fontWeight="800" textAnchor="middle" fill="currentColor">ASSURANCE</text>
    </svg>
  ),
  OrientalInsurance: () => (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg">
      <circle cx="60" cy="20" r="14" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M51 20H69M60 11V29" stroke="currentColor" strokeWidth="1.5"/>
      <text x="60" y="49" fontSize="9" fontFamily="Poppins" fontWeight="800" textAnchor="middle" letterSpacing="1" fill="currentColor">ORIENTAL</text>
    </svg>
  )
};

const partners = [
  { name: "LIC", logo: Logos.LIC },
  { name: "TATA AIG", logo: Logos.TataAig },
  { name: "STAR HEALTH", logo: Logos.StarHealth },
  { name: "CARE HEALTH", logo: Logos.CareHealth },
  { name: "HDFC ERGO", logo: Logos.HdfcErgo },
  { name: "ICICI LOMBARD", logo: Logos.IciciLombard },
  { name: "NIVA BUPA", logo: Logos.NivaBupa },
  { name: "BAJAJ ALLIANZ", logo: Logos.BajajAllianz },
  { name: "SBI LIFE", logo: Logos.SbiLife },
  { name: "MAX LIFE", logo: Logos.MaxLife },
  { name: "ADITYA BIRLA SUN LIFE", logo: Logos.AdityaBirla },
  { name: "PNB METLIFE", logo: Logos.PnbMetlife },
  { name: "RELIANCE GENERAL", logo: Logos.RelianceGeneral },
  { name: "IFFCO TOKIO", logo: Logos.IffcoTokio },
  { name: "NEW INDIA ASSURANCE", logo: Logos.NewIndia },
  { name: "ORIENTAL INSURANCE", logo: Logos.OrientalInsurance }
];

export default function InsurancePartners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const handleViewPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      const offsetTop = plansSection.offsetTop - 75;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
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
          {partners.map((partner, index) => {
            const LogoComponent = partner.logo;
            return (
              <div 
                key={partner.name} 
                className="partner-card glass-panel"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="partner-logo-container">
                  <LogoComponent />
                </div>
                <span className="partner-name">{partner.name}</span>
                <button 
                  className="partner-btn"
                  onClick={handleViewPlans}
                >
                  VIEW PLANS
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
