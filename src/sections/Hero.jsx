import React from 'react';
import Button from '../components/Button';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import './Hero.css';

export default function Hero() {
  const { agentConfig } = useConfig();
  const hero = agentConfig?.hero || {
    badge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
    title: "Secure Your Future With Insurance & Real Estate Solutions",
    description: "Protect your family today and build wealth for tomorrow through trusted financial and property guidance.",
    primaryButtonText: "Book Consultation",
    secondaryButtonText: "Explore Plans",
    familiesCount: "1,200+"
  };

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
    <section id="home" className="hero-section" style={hero.backgroundImage ? { backgroundImage: `url(${hero.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      <div className="container hero-container">
        
        {/* Content Side */}
        <div className="hero-content">
          <div className="trust-badge">
            <ShieldCheck size={16} className="badge-icon" />
            <span>{hero.badge}</span>
          </div>
          
          <h1 className="hero-title">
            {hero.title.split('Insurance & Real Estate')[0]}
            <span className="text-gradient-gold">Insurance & Real Estate</span>
            {hero.title.split('Insurance & Real Estate')[1] || ' Solutions'}
          </h1>
          
          <p className="hero-description">
            {hero.description}
          </p>

          <div className="hero-actions">
            <Button variant="primary" onClick={() => handleScrollTo('contact')}>
              {hero.primaryButtonText || 'Book Consultation'} <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" onClick={() => handleScrollTo('plans')}>
              {hero.secondaryButtonText || 'Explore Plans'}
            </Button>
          </div>

          {/* Quick trust stat badge */}
          <div className="hero-stat-badge glass-panel">
            <span className="stat-num text-gradient-gold">{hero.familiesCount}</span>
            <span className="stat-lbl">Families Protected & Guided</span>
          </div>
        </div>

      </div>
      <div className="hero-bottom-fade" />
    </section>
  );
}
