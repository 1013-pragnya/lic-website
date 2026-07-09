import React from 'react';
import './ScrollingBanner.css';

export default function ScrollingBanner() {
  const content = "LIC INSURANCE ★ HEALTH INSURANCE ★ LIFE INSURANCE ★ VEHICLE INSURANCE ★ MOTOR INSURANCE ★ HOME INSURANCE ★ TRAVEL INSURANCE ★ TATA AIG ★ STAR HEALTH ★ HDFC ERGO ★ CARE HEALTH ★ ICICI LOMBARD ★ NIVA BUPA ★ BAJAJ ALLIANZ ★ SBI LIFE ★ MAX LIFE ★ ADITYA BIRLA SUN LIFE ★ PNB METLIFE ★ NEW INDIA ASSURANCE ★ ORIENTAL INSURANCE ★ RELIANCE GENERAL ★ REAL ESTATE ★ OPEN PLOTS ★ DTCP PLOTS ★ HMDA PLOTS ★ FARMLANDS ★ APARTMENTS ★ VILLAS ★ COMMERCIAL PROPERTIES ★ BUY ★ SELL ★ RENT ★ INVESTMENT";

  return (
    <div className="scrolling-banner">
      <div className="scrolling-banner-track">
        <div className="scrolling-banner-content">
          <span>{content}</span>
          <span className="separator">★</span>
        </div>
        <div className="scrolling-banner-content" aria-hidden="true">
          <span>{content}</span>
          <span className="separator">★</span>
        </div>
      </div>
    </div>
  );
}
