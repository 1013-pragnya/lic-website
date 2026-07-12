import React from 'react';
import { 
  MapPin, 
  Building, 
  ArrowRight, 
  Download, 
  Check, 
  Award, 
  Gift, 
  Landmark, 
  TrendingUp, 
  FileText, 
  Globe 
} from 'lucide-react';
import Button from './Button';
import './RealEstateCard.css';

export default function RealEstateCard({ property, onViewDetails }) {
  if (!property) return null;

  const handleDownloadBrochure = (e) => {
    e.stopPropagation();
    const brochureText = `
==================================================
        HITEK PARK BALANAGAR BROCHURE
==================================================
Category: ${property.category || 'LAND INVESTMENT'}
Project Name: ${property.title || 'Hitek Park Balanagar'}
Location: ${property.location || 'Balanagar, Shadnagar, Hyderabad'}
Property Type: ${property.type || 'Premium Open Plots'}
Price: ${property.price || 'Starting from ₹16,999 / Sq.Yd*'}
Developer: ${property.developer || 'BBG (Building Blocks Group)'}

--------------------------------------------------
APPROVALS:
--------------------------------------------------
${(property.approvals || ["MUDA Approved", "RERA Certified"]).map(app => `✓ ${app}`).join('\n')}

--------------------------------------------------
PROJECT HIGHLIGHTS:
--------------------------------------------------
${(property.highlights || []).map(hl => `• ${hl}`).join('\n')}

--------------------------------------------------
INVESTMENT BENEFITS:
--------------------------------------------------
${(property.investmentBenefits || []).map(ib => `• ${ib}`).join('\n')}

--------------------------------------------------
LOCATION ADVANTAGES:
--------------------------------------------------
${(property.locationAdvantages || []).map(la => `• ${la}`).join('\n')}

--------------------------------------------------
TRUST & EXCELLENCE:
--------------------------------------------------
${(property.trustBadges || []).map(tb => `• ${tb}`).join('\n')}

==================================================
Contact: rrfsshams@gmail.com | +91 63024 92168
Authorized LIC & Real Estate Consultant
==================================================
`;
    
    const element = document.createElement("a");
    const file = new Blob([brochureText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${(property.title || 'Project').replace(/\s+/g, '_')}_Brochure.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper icons for investment benefits
  const getBenefitIcon = (benefit) => {
    const text = benefit.toLowerCase();
    if (text.includes('loan') || text.includes('idbi') || text.includes('bank')) {
      return <Landmark size={14} className="text-gold" />;
    }
    if (text.includes('voucher') || text.includes('gift') || text.includes('grt')) {
      return <Gift size={14} className="text-gold" />;
    }
    if (text.includes('appreciation') || text.includes('potential')) {
      return <TrendingUp size={14} className="text-gold" />;
    }
    if (text.includes('registration') || text.includes('ready')) {
      return <FileText size={14} className="text-gold" />;
    }
    return <Check size={14} className="text-gold" />;
  };

  // Helper icons for trust badges
  const getTrustIcon = (badge) => {
    const text = badge.toLowerCase();
    if (text.includes('developer') || text.includes('largest')) {
      return <Award size={14} className="text-gold" />;
    }
    if (text.includes('project') || text.includes('delivered')) {
      return <Building size={14} className="text-gold" />;
    }
    if (text.includes('year') || text.includes('excellence')) {
      return <Award size={14} className="text-gold" />;
    }
    if (text.includes('document') || text.includes('clear')) {
      return <FileText size={14} className="text-gold" />;
    }
    if (text.includes('international') || text.includes('presence') || text.includes('world')) {
      return <Globe size={14} className="text-gold" />;
    }
    return <Award size={14} className="text-gold" />;
  };

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
            <span className="location-text">📍 {property.location}</span>
          </div>
          <div className="premium-meta-item">
            <Building size={14} className="text-gold" />
            <span className="type-text">{property.type || 'Premium Open Plots'}</span>
          </div>
        </div>

        {/* Approval Badges */}
        <div className="premium-approval-row">
          {(property.approvals || ["MUDA Approved", "RERA Certified"]).map((app, i) => (
            <span key={i} className="approval-badge">
              <Check size={12} className="text-gold" /> {app}
            </span>
          ))}
        </div>

        {/* Highlights Section */}
        {property.highlights && property.highlights.length > 0 && (
          <div className="premium-section-block">
            <h4 className="premium-section-label">Project Highlights</h4>
            <div className="premium-highlights-grid">
              {property.highlights.map((hl, i) => (
                <div key={i} className="highlight-item">
                  <span className="dot-bullet">•</span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investment Benefits Section */}
        {property.investmentBenefits && property.investmentBenefits.length > 0 && (
          <div className="premium-section-block">
            <h4 className="premium-section-label">Investment Benefits</h4>
            <div className="premium-benefits-list">
              {property.investmentBenefits.map((benefit, i) => (
                <div key={i} className="benefit-item">
                  {getBenefitIcon(benefit)}
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Advantages Section */}
        {property.locationAdvantages && property.locationAdvantages.length > 0 && (
          <div className="premium-section-block">
            <h4 className="premium-section-label">Location Advantages</h4>
            <div className="premium-advantages-list">
              {property.locationAdvantages.map((advantage, i) => (
                <div key={i} className="advantage-item">
                  <span className="dot-bullet">•</span>
                  <span>{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Badges Section */}
        {property.trustBadges && property.trustBadges.length > 0 && (
          <div className="premium-section-block">
            <h4 className="premium-section-label">Trust & Excellence</h4>
            <div className="premium-trust-row">
              {property.trustBadges.map((badge, i) => (
                <div key={i} className="trust-badge-item" title={badge}>
                  {getTrustIcon(badge)}
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button Actions */}
        <div className="premium-actions-row">
          <Button 
            variant="primary" 
            className="premium-btn-gold" 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails && onViewDetails(property);
            }}
          >
            View Details <ArrowRight size={14} style={{ marginLeft: '4px' }} />
          </Button>
          <Button 
            variant="outline" 
            className="premium-btn-outline" 
            onClick={handleDownloadBrochure}
          >
            <Download size={14} style={{ marginRight: '6px' }} /> Brochure
          </Button>
        </div>
      </div>
    </div>
  );
}
