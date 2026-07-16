import React from 'react';
import { useConfig } from '../config/AppContext';
import * as LucideIcons from 'lucide-react';
import './Benefits.css';

export default function Benefits() {
  const { agentConfig } = useConfig();
  const benefits = (agentConfig?.benefits || []).filter(b => !b.hidden);

  return (
    <section id="benefits" className="section benefits-section">
      <div className="container">
        <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title" style={{ marginTop: '10px' }}>Value & Reliability Benefits</h2>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit) => {
            const IconComponent = LucideIcons[benefit.icon] || LucideIcons.Shield;
            return (
              <div key={benefit.id} className="benefit-card glass-panel fade-in">
                <div className="benefit-icon-wrapper">
                  <IconComponent className="benefit-card-icon" size={24} />
                </div>
                <h3 className="benefit-card-title">{benefit.title}</h3>
                <p className="benefit-card-desc">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
