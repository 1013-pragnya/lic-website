import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RealEstateScene from '../components/RealEstateScene';
import Button from '../components/Button';
import { MapPin, Building, ArrowUpRight, BadgePercent, CheckCircle, Mail, Shield } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import './RealEstate.css';
import '../components/CardSlider.css';

export default function RealEstate({ onSelectConsultation }) {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Properties');

  // Slider Mouse Drag State
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = [
    'All Properties',
    'Residential Property',
    'Commercial Property',
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

  const handleBookConsultation = (type) => {
    if (onSelectConsultation) {
      onSelectConsultation(type);
    }
    handleScrollTo('contact');
  };

  // Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const propertiesList = (agentConfig?.realEstate || []).filter(prop => !prop.hidden);

  // Filter properties based on active category tab
  const filteredProperties = activeCategory === 'All Properties'
    ? propertiesList
    : propertiesList.filter(prop => prop.category === activeCategory);

  return (
    <>
      {/* SECTION 1: Featured Properties */}
      <section id="real-estate" className="section properties-section">
        <div className="container">
          
          <div className="section-header-split">
            <div className="section-header-left">
              <span className="section-subtitle">Exclusive Listings</span>
              <h2 className="section-title">REAL ESTATE PROJECTS</h2>
            </div>
            <button className="view-all-btn" onClick={() => navigate('/real-estate/projects')}>
              VIEW ALL <span className="arrow">→</span>
            </button>
          </div>

          {/* Category Filter Buttons */}
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

          {/* Keyed slider container to trigger CSS mount fade-in animation on transition */}
          <div className="slider-container" key={activeCategory}>
            <div 
              ref={sliderRef}
              className={`slider-track ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {filteredProperties.map((prop) => (
                <div key={prop.id} className="property-card glass-panel glass-panel-hover card-3d">
                  <div className="property-image-wrapper">
                    <img src={prop.image} alt={prop.title} className="property-img" loading="lazy" />
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
                      <h4 className="features-label text-gold">Property Highlights:</h4>
                      <p className="features-text">{prop.benefits}</p>
                    </div>

                    <Button variant="primary" className="property-btn" onClick={() => handleScrollTo('contact')}>
                      Enquire Now <ArrowUpRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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

          {/* Consultation CTA Section */}
          <div className="consultation-cta-section">
            <div className="section-header consultation-header">
              <h3 className="section-title consultation-title">Choose Your Consultation</h3>
            </div>
            
            <div className="consultation-cards-grid">
              {/* Card 1: Property Consultation */}
              <div className="consultation-premium-card glass-panel">
                <div className="consultation-card-icon-wrapper">
                  <Building className="consultation-card-icon text-gold" size={32} />
                </div>
                <h3 className="consultation-card-title">Property Consultation</h3>
                <p className="consultation-card-desc">
                  Get expert guidance on residential properties, commercial properties, land investment opportunities, property verification, and wealth-building through real estate.
                </p>
                <Button variant="primary" className="consultation-card-btn" onClick={() => handleBookConsultation('property')}>
                  Book Property Consultation
                </Button>
              </div>

              {/* Card 2: Insurance Consultation */}
              <div className="consultation-premium-card glass-panel">
                <div className="consultation-card-icon-wrapper">
                  <Shield className="consultation-card-icon text-gold" size={32} />
                </div>
                <h3 className="consultation-card-title">Insurance Consultation</h3>
                <p className="consultation-card-desc">
                  Plan your family's financial security with expert LIC guidance, life insurance plans, retirement planning, child future plans, and savings solutions.
                </p>
                <Button variant="primary" className="consultation-card-btn" onClick={() => handleBookConsultation('insurance')}>
                  Book Insurance Consultation
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
