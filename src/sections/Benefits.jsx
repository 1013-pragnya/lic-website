import React from 'react';
import { ShieldCheck, TrendingUp, Receipt, Clock, UserCheck, Building } from 'lucide-react';
import './Benefits.css';

export default function Benefits() {
  const benefitsList = [
    {
      icon: ShieldCheck,
      title: "Family Protection",
      desc: "Ensure your loved ones maintain their lifestyle and achieve their dreams even in your absence, with immediate tax-free life cover payouts."
    },
    {
      icon: TrendingUp,
      title: "Wealth Creation",
      desc: "Grow your savings steadily over time. Benefit from declared reversionary bonuses and guaranteed additions that accumulate tax-free."
    },
    {
      icon: Receipt,
      title: "Tax Planning",
      desc: "Optimize your annual tax liabilities legally under Section 80C and Section 10(10D) with guaranteed tax-free returns and savings."
    },
    {
      icon: Clock,
      title: "Retirement Security",
      desc: "Map out a stress-free retirement with customized lifetime guaranteed pension plans and regular annuity payouts."
    },
    {
      icon: UserCheck,
      title: "Professional Financial Guidance",
      desc: "Receive customized portfolio audits and direct assistance. Rajesh manages the entire process so you face zero stress."
    },
    {
      icon: Building,
      title: "Real Estate Investment Support",
      desc: "Diversify your wealth in high-growth luxury residential properties, pre-leased offices, and high-appreciation land investments."
    }
  ];

  return (
    <section id="benefits" className="section benefits-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Why Partner With Us</span>
          <h2 className="section-title">Exclusive Benefits</h2>
        </div>

        <div className="benefits-grid">
          {benefitsList.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="benefit-card glass-panel glass-panel-hover">
                <div className="benefit-icon-wrapper">
                  <IconComponent size={24} className="benefit-card-icon" />
                </div>
                <h3 className="benefit-card-title">{benefit.title}</h3>
                <p className="benefit-card-desc">{benefit.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
