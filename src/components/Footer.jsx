import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import './Footer.css';

export default function Footer({ onOpenAdmin }) {
  const { agentConfig } = useConfig();
  const handleLinkClick = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 75;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Logo & Bio */}
          <div className="footer-col brand-col">
            <div className="logo" onClick={() => handleLinkClick('home')}>
              <div className="logo-image-container">
                <img src={agentConfig?.settings?.logoUrl || "/logo.png"} alt="Logo" className="logo-img-element" style={{ height: '75px', objectFit: 'contain', borderRadius: '4px' }} />
              </div>
              <span className="logo-title text-gradient-gold">{agentConfig?.settings?.logoText || "RRFS ADVISOR"}</span>
            </div>
            <p className="footer-bio">
              Empowering individuals and families to secure their future with custom wealth protection plans and high-appreciation premium property investments.
            </p>
            <div className="badge-glass">
              {agentConfig?.licBadge}
            </div>
            <div className="social-links">
              <a href={agentConfig.contact.social?.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href={agentConfig.contact.social?.facebook || "https://facebook.com"} target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href={agentConfig.contact.social?.instagram || "https://instagram.com"} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href={agentConfig.contact.social?.youtube || "https://youtube.com"} target="_blank" rel="noreferrer" aria-label="YouTube" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleLinkClick('home')}>Home</button></li>
              <li><button onClick={() => handleLinkClick('about')}>About Agent</button></li>
              <li><button onClick={() => handleLinkClick('plans')}>Insurance Plans</button></li>
              <li><button onClick={() => handleLinkClick('benefits')}>Benefits</button></li>
              <li><button onClick={() => handleLinkClick('calculator')}>Premium Calculator</button></li>
              <li><button onClick={() => handleLinkClick('real-estate')}>Real Estate</button></li>
              <li><button onClick={() => handleLinkClick('testimonials')}>Testimonials</button></li>
              <li><button onClick={() => handleLinkClick('quote')}>Get Quote</button></li>
              <li><button onClick={() => handleLinkClick('contact')}>Contact Info</button></li>
            </ul>
          </div>

          {/* Insurance Products */}
          <div className="footer-col">
            <h4 className="footer-title">Insurance Solutions</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleLinkClick('plans')}>Term Protection</button></li>
              <li><button onClick={() => handleLinkClick('plans')}>Endowment Savings</button></li>
              <li><button onClick={() => handleLinkClick('plans')}>Pension Plans</button></li>
              <li><button onClick={() => handleLinkClick('plans')}>Money Back Plan</button></li>
              <li><button onClick={() => handleLinkClick('plans')}>Child Education Fund</button></li>
            </ul>
          </div>

          {/* Real Estate Portfolios */}
          <div className="footer-col">
            <h4 className="footer-title">Real Estate</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleLinkClick('real-estate')}>Residential Villas</button></li>
              <li><button onClick={() => handleLinkClick('real-estate')}>Luxury Apartments</button></li>
              <li><button onClick={() => handleLinkClick('real-estate')}>Commercial Offices</button></li>
              <li><button onClick={() => handleLinkClick('real-estate')}>Plot/Land Investments</button></li>
              <li><button onClick={() => handleLinkClick('real-estate')}>Title & Portfolio Audit</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-title">Get In Touch</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={18} className="contact-icon text-gold" />
                <span>{agentConfig.contact.address}</span>
              </li>
              <li style={{ alignItems: 'flex-start' }}>
                <Phone size={18} className="contact-icon text-gold" style={{ marginTop: '3px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <a href={`tel:${agentConfig.contact.phone}`}>{agentConfig.contact.phone}</a>
                  {agentConfig.contact.phoneSecondary && (
                    <a href={`tel:${agentConfig.contact.phoneSecondary}`}>{agentConfig.contact.phoneSecondary}</a>
                  )}
                </div>
              </li>
              <li>
                <Mail size={18} className="contact-icon text-gold" />
                <a href={`mailto:${agentConfig.contact.email}`}>{agentConfig.contact.email}</a>
              </li>
              <li>
                <Clock size={18} className="contact-icon text-gold" />
                <span>{agentConfig.contact.workingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="footer-bottom">
          <div className="regulatory-disclaimer">
            <p><strong>Disclaimer:</strong> Insurance is the subject matter of solicitation. Real estate yields are subject to market changes. The information provided on this website is for general reference purposes only. Product details and policy terms correspond to official files issued by the Life Insurance Corporation of India (LIC), Tata AIG, Care Health, Star Health, and regional real estate developers. {agentConfig.name} is an independent licensed insurance advisor and professional property consultant.</p>
          </div>
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} {agentConfig.name}. All Rights Reserved. Authorized LIC Advisor & Real Estate Consultant.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
