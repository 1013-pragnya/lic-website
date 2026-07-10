import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import { MapPin, Building, ArrowUpRight, Search, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import './RealEstateAll.css';
import './PremiumPartnerPage.css';

export default function RealEstateAll() {
  const { agentConfig } = useConfig();
  const navigate = useNavigate();

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Pagination states
  const [visibleCount, setVisibleCount] = useState(8);

  // Scroll to top on mount and set SEO meta tags
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Premium Real Estate Investments | Hyderabad Properties";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Explore premium villas, apartments, gated communities, commercial spaces, and investment properties in prime locations across Hyderabad.");
    }
  }, []);

  const propertiesList = (agentConfig?.realEstate || []).filter(prop => !prop.hidden);

  // Extract unique locations for the dropdown
  const uniqueLocations = ['All', ...new Set(propertiesList.map(p => p.location).filter(Boolean))];

  // Filter properties dynamically
  const filteredProperties = propertiesList.filter(prop => {
    const matchesSearch = 
      prop.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.benefits?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || prop.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || prop.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const handleEnquire = (id) => {
    const prop = propertiesList.find(p => p.id === id);
    let propInterest = 'residential';
    if (prop) {
      if (prop.category?.toLowerCase().includes('commercial')) propInterest = 'commercial';
      else if (prop.category?.toLowerCase().includes('land')) propInterest = 'land';
    }
    // Navigate to homepage, selecting property tab and scrolling to contact form
    navigate(`/?tab=property&propertyInterest=${propInterest}#contact`);
  };

  return (
    <div className="view-all-page real-estate-all">
      {/* Premium Hero Banner */}
      <section 
        className="partner-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="partner-hero-nav">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>

        <div className="partner-hero-container">
          <div className="partner-hero-content">
            <div className="partner-badge">
              Exclusive Portfolio
            </div>
            <h1 className="partner-hero-title">
              REAL <span className="highlight-gold">ESTATE</span>
            </h1>
            <p className="partner-hero-subtitle">
              Explore premium villas, apartments, gated communities, commercial spaces, and investment properties in prime locations.
            </p>
            <button className="partner-hero-btn" onClick={() => {
              const el = document.getElementById('real-estate-filter-section');
              if (el) {
                window.scrollTo({
                  top: el.offsetTop - 100,
                  behavior: 'smooth'
                });
              }
            }}>
              EXPLORE PROPERTIES
            </button>
          </div>
        </div>
      </section>

      {/* Advanced Filter Section */}
      <section className="filter-section" id="real-estate-filter-section">
        <div className="container">
          <div className="filter-bar glass-panel">
            
            {/* Search Input */}
            <div className="search-group">
              <Search className="search-icon text-gold" size={18} />
              <input 
                type="text" 
                placeholder="Search by project name, location, keyword..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(8); }}
                className="search-input"
              />
            </div>

            {/* Select Dropdown Filters */}
            <div className="select-filters">
              {/* Category selector */}
              <div className="filter-item">
                <label className="filter-label"><Building size={14} /> Category</label>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => { setSelectedCategory(e.target.value); setVisibleCount(8); }}
                  className="filter-select"
                >
                  <option value="All">All Categories</option>
                  <option value="Residential Property">Residential Property</option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="Land Investment">Land Investment</option>
                </select>
              </div>

              {/* Location selector */}
              <div className="filter-item">
                <label className="filter-label"><MapPin size={14} /> Location</label>
                <select 
                  value={selectedLocation} 
                  onChange={(e) => { setSelectedLocation(e.target.value); setVisibleCount(8); }}
                  className="filter-select"
                >
                  {uniqueLocations.map(loc => (
                    <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid Listing Section */}
      <main className="listing-main">
        <div className="container">
          
          {filteredProperties.length === 0 ? (
            <div className="no-results glass-panel">
              <SlidersHorizontal size={48} className="text-gold float-animation" />
              <h3>No Properties Found</h3>
              <p>Try refining your search terms or resetting the location and category filters.</p>
              <button 
                className="reset-btn" 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLocation('All'); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="listing-grid">
                {filteredProperties.slice(0, visibleCount).map((prop) => (
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

                      <Button 
                        variant="primary" 
                        className="property-btn" 
                        onClick={() => handleEnquire(prop.id)}
                      >
                        Enquire Now <ArrowUpRight size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Pagination */}
              {visibleCount < filteredProperties.length && (
                <div className="pagination-box flex-center">
                  <button className="load-more-btn" onClick={handleLoadMore}>
                    LOAD MORE
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  );
}
