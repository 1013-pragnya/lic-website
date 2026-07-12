import React from 'react';
import { 
  MapPin, 
  Building, 
  ArrowRight, 
  Check 
} from 'lucide-react';
import Button from './Button';
import './RealEstateCard.css';

export default function RealEstateCard({ property, onViewDetails }) {
  if (!property) return null;



  return (
    <div 
      className="premium-property-card"
      onClick={() => onViewDetails && onViewDetails(property)}
    >
      {/* Top Image & Badge section */}
      <div className="premium-image-wrapper">
        <img 
          src={property.image} 
          alt={property.title} 
          className="premium-img animate-zoom" 
          loading="lazy" 
        />
        <div className="premium-category-badge">{property.category || 'LAND INVESTMENT'}</div>
        <div className="premium-price-tag">{property.price || 'Starting from ₹16,999 / Sq.Yd*'}</div>
      </div>
      
      {/* Content section */}
      <div className="premium-details">
        <h3 className="premium-name">{property.title}</h3>
        
        <div className="premium-meta">
          <div className="premium-meta-item">
            <MapPin size={14} className="text-gold" />
            <span className="location-text">{property.location}</span>
          </div>
          <div className="premium-meta-item">
            <Building size={14} className="text-gold" />
            <span className="type-text">{property.type || 'Premium Open Plots'}</span>
          </div>
        </div>

        {/* Clean, single-row tag badges */}
        <div className="premium-tags-row">
          {(property.approvals || ["MUDA Approved", "RERA Certified"]).map((app, i) => (
            <span key={i} className="premium-tag-pill">
              <Check size={10} className="text-gold" /> {app}
            </span>
          ))}
          {property.developer && (
            <span className="premium-tag-pill developer-pill">
              {property.developer.split(' ')[0]}
            </span>
          )}
        </div>

        {/* Button Actions - Aligned at the bottom via CSS margin-top: auto */}
        <div className="premium-actions-row">
          <Button 
            variant="primary" 
            className="premium-btn-gold" 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails && onViewDetails(property);
            }}
          >
            View Details <ArrowRight size={13} style={{ marginLeft: '4px' }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
