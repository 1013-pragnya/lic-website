import React, { useState } from 'react';
import RealEstateScene from '../components/RealEstateScene';
import Button from '../components/Button';
import { MapPin, Building, ArrowUpRight, ShieldAlert, BadgePercent, CheckCircle, Mail } from 'lucide-react';
import { agentConfig } from '../config/agentConfig';
import './RealEstate.css';

export default function RealEstate() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    'All',
    'Residential Properties',
    'Commercial Properties',
    'Land Investment'
  ];

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 75,
        behavior: 'smooth'
      });
    }
  };

  const filteredProperties = activeCategory === 'All' 
    ? agentConfig.realEstate 
    : agentConfig.realEstate.filter(prop => prop.category === activeCategory);

  return (
    <section id="real-estate" className="section real-estate-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Wealth Appreciation</span>
          <h2 className="section-title">Premium Real Estate</h2>
        </div>

        {/* Categories Tab Selector */}
        <div className="category-tabs flex-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Split Grid Layout */}
        <div className="real-estate-grid">
          
          {/* Left Column: Properties list */}
          <div className="properties-list-col">
            <div className="properties-cards-grid">
              {filteredProperties.map((prop) => (
                <div key={prop.id} className="property-card glass-panel glass-panel-hover card-3d">
                  <div className="property-image-wrapper">
                    <img src={prop.image} alt={prop.title} className="property-img" />
                    <div className="property-category-tag">{prop.category}</div>
                    <div className="property-price-tag">{prop.price}</div>
                  </div>
                  
                  <div className="property-details">
                    <h3 className="property-title">{prop.title}</h3>
                    
                    <div className="property-meta">
                      <div className="meta-item">
                        <MapPin size={14} className="text-gold" />
                        <span>{prop.location}</span>
                      </div>
                      <div className="meta-item">
                        <Building size={14} className="text-gold" />
                        <span>{prop.type}</span>
                      </div>
                    </div>

                    <div className="property-benefits">
                      <h4 className="benefits-label text-gold">Investment Benefits:</h4>
                      <p className="benefits-text">{prop.benefits}</p>
                    </div>

                    <Button variant="primary" className="property-btn" onClick={() => handleScrollTo('contact')}>
                      Enquire Now <ArrowUpRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Visualization and Property Growth dashboard */}
          <div className="visuals-dashboard-col">
            
            {/* 3D Visualizer Viewport */}
            <div className="scene-viewport-wrapper glass-panel">
              <div className="viewport-label">
                <span className="live-dot" />
                <span>3D Wealth & Estate Visualizer</span>
              </div>
              <RealEstateScene />
              
              <div className="scene-legend">
                <div className="legend-item"><span className="legend-color gold" /> Luxury High-rise</div>
                <div className="legend-item"><span className="legend-color white" /> Gated Plots</div>
                <div className="legend-item"><span className="legend-color line" /> appreciation path</div>
              </div>
            </div>

            {/* Property Growth Dashboard (Visual CSS representation) */}
            <div className="growth-dashboard-card glass-panel">
              <div className="dashboard-header">
                <BadgePercent className="text-gold" size={22} />
                <h3 className="dashboard-title">10-Year Projected Asset Growth</h3>
              </div>
              
              <p className="dashboard-desc">
                Combined Real Estate appreciation and LIC security yields optimal long-term results.
              </p>

              <div className="graph-bars-container">
                <div className="graph-bar-row">
                  <span className="bar-label">Fixed Deposits</span>
                  <div className="bar-wrapper">
                    <div className="bar bg-muted" style={{ width: '45%' }}>4.5x</div>
                  </div>
                </div>
                <div className="graph-bar-row">
                  <span className="bar-label">Gold Bullion</span>
                  <div className="bar-wrapper">
                    <div className="bar bg-blue" style={{ width: '68%' }}>6.8x</div>
                  </div>
                </div>
                <div className="graph-bar-row">
                  <span className="bar-label text-gold font-bold">LIC + Premium Estate</span>
                  <div className="bar-wrapper">
                    <div className="bar bg-gold animate-glow" style={{ width: '92%' }}>12.4x</div>
                  </div>
                </div>
              </div>

              <div className="dashboard-bullets">
                <div className="bullet-item">
                  <CheckCircle size={14} className="text-gold" />
                  <span>Dual diversification hedges against inflation</span>
                </div>
                <div className="bullet-item">
                  <CheckCircle size={14} className="text-gold" />
                  <span>Licensed documentation & IRDAI clearance guarantee safety</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Real Estate Consultation CTA Banner */}
        <div className="real-estate-cta-banner glass-panel float-animation">
          <div className="cta-banner-content">
            <h3 className="cta-banner-title">
              Looking for a Customized <span className="text-gradient-gold">Property + Insurance</span> Strategy?
            </h3>
            <p className="cta-banner-desc">
              Get an expert advisor audit on property titles, tax-savings under Section 54, and collateralized estate funding.
            </p>
          </div>
          <Button variant="primary" className="cta-banner-btn" onClick={() => handleScrollTo('contact')}>
            Book Private Consultation <Mail size={16} />
          </Button>
        </div>

      </div>
    </section>
  );
}
