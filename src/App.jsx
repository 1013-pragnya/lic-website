import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Plans from './sections/Plans';
import Quote from './sections/Quote';
import Benefits from './sections/Benefits';
import Calculator from './sections/Calculator';
import RealEstate from './sections/RealEstate';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function playChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playTone = (freq, startTime, duration) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = audioCtx.currentTime;
    playTone(587.33, now, 0.8); // D5 chime
    playTone(880.00, now + 0.12, 1.0); // A5 chime
  } catch (err) {
    console.warn('Web Audio chime blocked or unsupported:', err);
  }
}

export default function App() {
  const [consultationTab, setConsultationTab] = useState('insurance');
  const [quotePreFill, setQuotePreFill] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Set up live notification listener
  useEffect(() => {
    const handleLeadSubmitted = (e) => {
      const lead = e.detail;
      setToast(lead);
      playChime();
    };

    window.addEventListener('lead-submitted', handleLeadSubmitted);
    return () => window.removeEventListener('lead-submitted', handleLeadSubmitted);
  }, []);

  // Auto dismiss toast notification
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleGetQuoteTrigger = (plan) => {
    // Map internal plans data to form selects
    let formProvider = 'LIC';
    if (plan.provider) {
      if (plan.provider.includes('LIC') || plan.id.includes('lic')) formProvider = 'LIC';
      else if (plan.provider.includes('Tata') || plan.id.includes('tata')) formProvider = 'Tata AIG';
      else if (plan.provider.includes('Care') || plan.id.includes('care')) formProvider = 'Care Health Insurance';
      else if (plan.provider.includes('Star') || plan.id.includes('star')) formProvider = 'Star Health Insurance';
    }

    let formCategory = 'Life Insurance';
    if (plan.id.includes('life')) formCategory = 'Life Insurance';
    else if (plan.id.includes('health') || plan.id.includes('mediclaim')) formCategory = 'Health Insurance';
    else if (plan.id.includes('general') || plan.id.includes('motor')) formCategory = 'Motor Insurance';
    else if (plan.id.includes('investment') || plan.id.includes('saving') || plan.id.includes('annuity')) formCategory = 'Investment Plans';

    setQuotePreFill({
      provider: formProvider,
      category: formCategory
    });

    setTimeout(() => {
      const el = document.getElementById('quote');
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 75,
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Plans onGetQuote={handleGetQuoteTrigger} />
        <Quote preFill={quotePreFill} clearPreFill={() => setQuotePreFill(null)} />
        <Benefits />
        <Calculator />
        <RealEstate onSelectConsultation={setConsultationTab} />
        <Testimonials />
        <Contact activeTab={consultationTab} setActiveTab={setConsultationTab} />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      
      {/* Passcode Locked Admin Dashboard */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      {/* Live Admin Toast Notification Alert */}
      {toast && (
        <div 
          className="admin-toast glass-panel fade-in" 
          onClick={() => { setIsAdminOpen(true); setToast(null); }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 3000,
            padding: '16px 20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--primary-gold)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15), var(--shadow-gold)',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '360px'
          }}
        >
          <style>{`
            .toast-indicator-pulse {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #ea580c;
              animation: toastPulse 1.5s infinite;
            }
            @keyframes toastPulse {
              0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(234, 88, 12, 0.4); }
              70% { transform: scale(1.2); opacity: 0.6; box-shadow: 0 0 0 8px rgba(234, 88, 12, 0); }
              100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(234, 88, 12, 0); }
            }
          `}</style>
          <div className="toast-indicator-pulse" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-gold)', letterSpacing: '0.05em' }}>NEW QUOTE INQUIRY</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--white)' }}>{toast.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Selected {toast.provider} ({toast.category})</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setToast(null); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              marginLeft: '12px',
              fontSize: '1.2rem',
              lineHeight: 1,
              padding: '4px'
            }}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
