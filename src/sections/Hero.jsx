import React from 'react';
import FamilyProtectionScene from '../components/FamilyProtectionScene';
import Button from '../components/Button';
import { ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { agentConfig } from '../config/agentConfig';
import './Hero.css';

export default function Hero() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 75,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        
        {/* Content Side */}
        <div className="hero-content">
          <div className="trust-badge">
            <ShieldCheck size={16} className="badge-icon" />
            <span>{agentConfig.licBadge}</span>
          </div>
          
          <h1 className="hero-title">
            Secure Your Future With <span className="text-gradient-gold">Insurance & Real Estate</span> Solutions
          </h1>
          
          <p className="hero-description">
            Protect your family today and build wealth for tomorrow through trusted financial and property guidance.
          </p>

          <div className="hero-actions">
            <Button variant="primary" onClick={() => handleScrollTo('contact')}>
              Book Consultation <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" onClick={() => handleScrollTo('plans')}>
              Explore Plans
            </Button>
          </div>
        </div>

        {/* Visual Side (3D Interactive Protective Scene) */}
        <div className="hero-visual">
          <div className="scene-viewport-wrapper">
            <FamilyProtectionScene />
            
            {/* Quick floating trust stat overlay */}
            <div className="quick-stat-badge glass-panel float-animation">
              <span className="stat-num text-gradient-gold">{agentConfig.familiesSecured}</span>
              <span className="stat-lbl">Families Protected</span>
            </div>
          </div>
        </div>

      </div>
      <div className="hero-bottom-fade" />
    </section>
  );
}

