import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Public Landing Components
import Navbar from './components/Navbar';
import ScrollingBanner from './components/ScrollingBanner';
import Hero from './sections/Hero';
import InsurancePartners from './sections/InsurancePartners';
import About from './sections/About';
import Plans from './sections/Plans';
import Quote from './sections/Quote';
import Benefits from './sections/Benefits';
import Calculator from './sections/Calculator';
import RealEstate from './sections/RealEstate';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';

// Admin Portal Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import HeroSection from './pages/admin/HeroSection';
import AboutSection from './pages/admin/AboutSection';
import PlansCRUD from './pages/admin/PlansCRUD';
import BenefitsCRUD from './pages/admin/BenefitsCRUD';
import TestimonialsCRUD from './pages/admin/TestimonialsCRUD';
import RealEstateCRUD from './pages/admin/RealEstateCRUD';
import GalleryManagement from './pages/admin/GalleryManagement';
import ContactInfo from './pages/admin/ContactInfo';
import SocialLinks from './pages/admin/SocialLinks';
import QuotesList from './pages/admin/QuotesList';
import Settings from './pages/admin/Settings';

// Public Listing Pages
import RealEstateAll from './pages/RealEstateAll';
import HealthInsuranceAll from './pages/HealthInsuranceAll';

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

function PublicLandingPage() {
  const [consultationTab, setConsultationTab] = useState('insurance');
  const [quotePreFill, setQuotePreFill] = useState(null);
  const navigate = useNavigate();

  // Sync URL parameters to prefill form and scroll down
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'property' || tab === 'insurance') {
      setConsultationTab(tab);
    }

    if (window.location.hash === '#contact') {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) {
          window.scrollTo({
            top: el.offsetTop - 75,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [window.location.search, window.location.hash]);

  const handleGetQuoteTrigger = (plan) => {
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
        <ScrollingBanner />
        <Hero />
        <InsurancePartners />
        <About />
        <Plans onGetQuote={handleGetQuoteTrigger} />
        <Quote preFill={quotePreFill} clearPreFill={() => setQuotePreFill(null)} />
        <Benefits />
        <Calculator />
        <RealEstate onSelectConsultation={setConsultationTab} />
        <Testimonials />
        <Contact activeTab={consultationTab} setActiveTab={setConsultationTab} />
      </main>
      <Footer onOpenAdmin={() => navigate('/admin')} />
    </div>
  );
}

export default function App() {
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

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

  return (
    <>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<PublicLandingPage />} />

        {/* View All Listing Pages */}
        <Route path="/real-estate/projects" element={<RealEstateAll />} />
        <Route path="/health-insurance/plans" element={<HealthInsuranceAll />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routing */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hero" element={<HeroSection />} />
          <Route path="about" element={<AboutSection />} />
          <Route path="plans" element={<PlansCRUD />} />
          <Route path="benefits" element={<BenefitsCRUD />} />
          <Route path="testimonials" element={<TestimonialsCRUD />} />
          <Route path="real-estate" element={<RealEstateCRUD />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="contact" element={<ContactInfo />} />
          <Route path="socials" element={<SocialLinks />} />
          <Route path="quotes" element={<QuotesList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {/* Live Admin Toast Notification Alert */}
      {toast && (
        <div 
          className="admin-toast glass-panel fade-in" 
          onClick={() => { navigate('/admin/quotes'); setToast(null); }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 3000,
            padding: '16px 20px',
            background: 'rgba(13, 24, 49, 0.95)',
            border: '1px solid var(--primary-gold)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), var(--shadow-gold)',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '360px',
            fontFamily: 'var(--font-body)',
            backdropFilter: 'blur(10px)'
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
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-gold)', letterSpacing: '0.05em' }}>NEW INQUIRY DETECTED</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--white)' }}>{toast.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Selected {toast.provider || 'Services'}</span>
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
    </>
  );
}
