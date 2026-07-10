import React from 'react';
import './ScrollingBanner.css';

export default function ScrollingBanner() {
  const content = "🔔 LATEST NEWS ★ NEW ATTRACTIVE RATES FOR CHILD SECURE PLANS ★ 0% GST AVAILABLE ON CHILD SECURE PLAN ★ LIC LIFE INSURANCE PLANS AVAILABLE ★ TATA AIG GENERAL INSURANCE NOW AVAILABLE ★ CARE HEALTH INSURANCE WITH CASHLESS HOSPITALIZATION ★ HDFC ERGO HEALTH INSURANCE PLANS AVAILABLE ★ PREMIUM VEHICLE INSURANCE AVAILABLE ★ FIRE INSURANCE FOR HOME & BUSINESS ★ TRAVEL INSURANCE FOR DOMESTIC & INTERNATIONAL TRAVEL ★ RETIREMENT PLANNING SOLUTIONS AVAILABLE ★ CHILD EDUCATION & FUTURE PLANS AVAILABLE ★ INVEST IN PREMIUM REAL ESTATE PROJECTS ★ OPEN PLOTS • VILLAS • APARTMENTS • COMMERCIAL PROPERTIES AVAILABLE ★ CONTACT RRFS ADVISOR FOR A FREE CONSULTATION ★";

  return (
    <div className="scrolling-banner">
      <div className="news-label-badge">
        <span>🔔 LATEST NEWS</span>
      </div>
      <div className="scrolling-banner-track">
        <div className="scrolling-banner-content">
          <span>{content}</span>
        </div>
        <div className="scrolling-banner-content" aria-hidden="true">
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
}
