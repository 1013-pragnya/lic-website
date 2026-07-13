import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RealEstateScene from '../components/RealEstateScene';
import Button from '../components/Button';
import { MapPin, Building, ArrowUpRight, BadgePercent, CheckCircle, Mail, Shield, X } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import './RealEstate.css';
import '../components/CardSlider.css';
import RealEstateCard from '../components/RealEstateCard';

export default function RealEstate({ onSelectConsultation }) {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Properties');
  const [selectedProperty, setSelectedProperty] = useState(null);

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
            <button className="view-all-btn desktop-only-btn" onClick={() => navigate('/real-estate/projects')}>
              VIEW ALL <span className="arrow">→</span>
            </button>
          </div>

          {/* Category Filter Buttons */}
          <div className="category-tabs">
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
                <RealEstateCard 
                  key={prop.id} 
                  property={prop} 
                  onViewDetails={setSelectedProperty} 
                />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet View All Button */}
          <div className="mobile-view-all-container">
            <button className="view-all-btn mobile-only-btn" onClick={() => navigate('/real-estate/projects')}>
              VIEW ALL <span className="arrow">→</span>
            </button>
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
      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="property-modal-overlay" onClick={() => setSelectedProperty(null)}>
          <div className="property-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="property-modal-close" onClick={() => setSelectedProperty(null)}>
              <X size={20} />
            </button>
            
            <div className="property-modal-grid">
              {/* Left Column: Images Gallery */}
              <div className="property-modal-gallery">
                <div className="modal-main-image">
                  <img src={selectedProperty.image} alt={selectedProperty.title} />
                </div>
                <div className="modal-thumbs-grid">
                  {selectedProperty.priceCardImage && (
                    <div className="modal-thumb-item">
                      <img src={selectedProperty.priceCardImage} alt="Price Card" onClick={() => window.open(selectedProperty.priceCardImage, '_blank')} />
                      <span>{selectedProperty.id === 'bbg-true-highlands-1' ? 'Price Card' : 'QR Codes'}</span>
                    </div>
                  )}
                  {selectedProperty.qrImage && (
                    <div className="modal-thumb-item">
                      <img src={selectedProperty.qrImage} alt="QR Codes" onClick={() => window.open(selectedProperty.qrImage, '_blank')} />
                      <span>QR Codes</span>
                    </div>
                  )}
                  {selectedProperty.mapImage && (
                    <div className="modal-thumb-item">
                      <img src={selectedProperty.mapImage} alt="Location Map" onClick={() => window.open(selectedProperty.mapImage, '_blank')} />
                      <span>Location Advantages</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Column: Specifications */}
              <div className="property-modal-info">
                <span className="property-category-badge">{selectedProperty.category}</span>
                <h2 className="modal-property-title">{selectedProperty.title}</h2>
                <div className="modal-meta-row">
                  <span className="modal-meta-item"><MapPin size={16} className="text-gold" /> {selectedProperty.location}</span>
                  <span className="modal-meta-item"><Building size={16} className="text-gold" /> {selectedProperty.type}</span>
                </div>
                
                <div className="modal-price-box">
                  <span className="price-label">Plot Rate:</span>
                  <span className="price-value">{selectedProperty.price}</span>
                </div>

                {selectedProperty.gift && (
                  <div className="modal-gift-box">
                    <span className="gift-icon">🎁</span>
                    <div>
                      <strong>Special Offer:</strong>
                      <p>{selectedProperty.gift}</p>
                    </div>
                  </div>
                )}

                {selectedProperty.highlights && (
                  <div className="modal-details-section">
                    <h4 className="text-gold">Project Highlights</h4>
                    <ul className="modal-highlights-list">
                      {selectedProperty.highlights.map((hl, i) => (
                        <li key={i}><CheckCircle size={14} className="text-gold" /> {hl}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProperty.locationAdvantages && (
                  <div className="modal-details-section">
                    <h4 className="text-gold">Location Advantages</h4>
                    <ul className="modal-highlights-list">
                      {selectedProperty.locationAdvantages.map((la, i) => (
                        <li key={i}><CheckCircle size={14} className="text-gold" /> {la}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  variant="primary" 
                  className="modal-enquire-btn" 
                  onClick={() => {
                    setSelectedProperty(null);
                    handleScrollTo('contact');
                  }}
                >
                  Schedule Site Visit & Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
