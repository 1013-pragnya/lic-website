import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { agentConfig } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Insurance Plans', id: 'plans' },
    { label: 'Benefits', id: 'benefits' },
    { label: 'Calculator', id: 'calculator' },
    { label: 'Real Estate', id: 'real-estate' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Get Quote', id: 'quote' },
    { label: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active link tracker based on section positions
      const scrollPos = window.scrollY + 100;
      
      for (let i = 0; i < navLinks.length; i++) {
        const section = document.getElementById(navLinks[i].id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navLinks[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 75; // accounts for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo" onClick={() => handleLinkClick('home')}>
          <div className="logo-image-container">
            <img src={agentConfig?.settings?.logoUrl || "/logo.png"} alt="Logo" className="logo-img-element" />
            <span className="logo-image-subtext">INSURANCE &<br />FINANCIAL SERVICE</span>
          </div>
          <div className="logo-text">
            <span className="logo-title text-gradient-gold">{agentConfig?.settings?.logoText || "RRFS ADVISOR"}</span>
            <span className="logo-subtitle">{agentConfig?.name}</span>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-btn ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => handleLinkClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Drawer Menu */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`mobile-nav-btn ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Backdrop Overlay */}
        {isOpen && (
          <div className="mobile-overlay" onClick={toggleMenu} />
        )}
      </div>
    </nav>
  );
}
