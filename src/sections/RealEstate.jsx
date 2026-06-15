import React from 'react';
import RealEstateScene from '../components/RealEstateScene';
import Button from '../components/Button';
import { MapPin, Building, ArrowUpRight, BadgePercent, CheckCircle, Mail } from 'lucide-react';
import { agentConfig } from '../config/agentConfig';
import './RealEstate.css';

export default function RealEstate() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 75,
        behavior: 'smooth'
      });
    }
  };

  // Group properties into Residential and Commercial (including land investments)
  const residentialProperties = agentConfig.realEstate.filter(
    (prop) => prop.category === 'Residential Properties'
  );
  
  const commercialProperties = agentConfig.realEstate.filter(
    (prop) => prop.category === 'Commercial Properties' || prop.category === 'Land Investment'
  );

  const renderPropertyGrid = (properties) => (
    <div className="properties-grid">
      {properties.map((prop) => (
        <div key={prop.id} className="property-card glass-panel glass-panel-hover card-3d">
          <div className="property-image-wrapper">
            <img src={prop.image} alt={prop.title} className="property-img" />
            <div className="property-category-badge">{prop.category}</div>
            <div className="property-price-tag">{prop.price}</div>
          </div>
          
          <div className="property-details">
            <h3 className="property-name">{prop.title}</h3>
            
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

            <div className="property-features">
              <h4 className="features-label text-gold">Investment Benefits:</h4>
              <p className="features-text">{prop.benefits}</p>
            </div>

            <Button variant="primary" className="property-btn" onClick={() => handleScrollTo('contact')}>
              Enquire Now <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* SECTION 1: Featured Properties */}
      <section id="real-estate" className="section properties-section">
        <div className="container">
          
          <div className="section-header">
            <span className="section-subtitle">Exclusive Listings</span>
            <h2 className="section-title">Featured Properties</h2>
          </div>

          <div className="properties-category-group">
            <h3 className="category-heading text-gradient-gold">Residential Properties</h3>
            {renderPropertyGrid(residentialProperties)}
          </div>

          <div className="properties-category-group" style={{ marginTop: '60px' }}>
            <h3 className="category-heading text-gradient-gold">Commercial Properties</h3>
            {renderPropertyGrid(commercialProperties)}
          </div>

        </div>
      </section>

      {/* SECTION 2: 3D Wealth & Estate Visualizer */}
      <section id="wealth-visualizer" className="section visualizer-section">
        <div className="container">
          
          <div className="section-header">
            <span className="section-subtitle">Growth Analytics</span>
            <h2 className="section-title">3D Wealth & Estate Visualizer</h2>
            <p className="section-desc">
              Visualize your real estate growth and long-term wealth journey combined with LIC financial planning.
            </p>
          </div>

          {/* Full Width Visualizer Grid */}
          <div className="visualizer-container">
            
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
    </>
  );
}
