import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { ShieldCheck, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

export default function Hero() {
  const { agentConfig } = useConfig();
  
  // Get active banners
  const banners = agentConfig?.banners?.filter(b => !b.hidden) || [];
  
  // Get dynamic slider settings
  const sliderSettings = agentConfig?.sliderSettings || {
    autoPlay: true,
    duration: 5000,
    transitionSpeed: 0.8,
    animationType: 'fade',
    infiniteLoop: true,
    showDots: true,
    showArrows: true
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Monitor screen resizing for mobile-dedicated banner hot swapping
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay Effect
  useEffect(() => {
    if (banners.length <= 1 || !sliderSettings.autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        // If infiniteLoop is off, stop autoplay at the last slide
        if (!sliderSettings.infiniteLoop && prev === banners.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return (prev + 1) % banners.length;
      });
    }, sliderSettings.duration || 5000);

    return () => clearInterval(interval);
  }, [banners.length, sliderSettings.autoPlay, sliderSettings.duration, sliderSettings.infiniteLoop]);

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex(prev => {
      if (prev === 0) {
        return sliderSettings.infiniteLoop ? banners.length - 1 : 0;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      if (prev === banners.length - 1) {
        return sliderSettings.infiniteLoop ? 0 : prev;
      }
      return prev + 1;
    });
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 75,
        behavior: 'smooth'
      });
    }
  };

  // Select dynamic banner background (Mobile vs Desktop)
  const currentBgImage = (isMobile && currentBanner.mobileImage) 
    ? currentBanner.mobileImage 
    : (currentBanner.backgroundImage || '/hero-bg.png');

  // Dynamic animation transition speed and type
  const speed = sliderSettings.transitionSpeed || 0.8;
  const slideVariants = sliderSettings.animationType === 'slide' 
    ? {
        initial: { opacity: 0, x: 80 },
        animate: { opacity: 1, x: 0, transition: { duration: speed, ease: 'easeOut' } },
        exit: { opacity: 0, x: -80, transition: { duration: speed, ease: 'easeIn' } }
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: speed, ease: 'easeInOut' } },
        exit: { opacity: 0, transition: { duration: speed, ease: 'easeInOut' } }
      };

  return (
    <section 
      id="home" 
      className="hero-section" 
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Images Cross-Fade */}
      <div className="hero-bg-slider" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: speed, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: isMobile
                ? `linear-gradient(180deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.55) 50%, rgba(15, 23, 42, 0.95) 100%), url(${currentBgImage})`
                : `linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 35%, rgba(15, 23, 42, 0.4) 65%, rgba(15, 23, 42, 0.15) 100%), url(${currentBgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: isMobile ? '80% center' : 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </AnimatePresence>
      </div>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 5, minHeight: '520px', display: 'flex', alignItems: 'center' }}>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="hero-content"
            style={{ width: '100%', paddingBottom: (banners.length > 1 && sliderSettings.showDots) ? '60px' : '0' }}
          >
            {currentBanner.badge && (
              <div className="trust-badge">
                <ShieldCheck size={16} className="badge-icon" />
                <span>{currentBanner.badge}</span>
              </div>
            )}
            
            <h1 className="hero-title">
              {currentBanner.title.includes('INSURANCE & REAL ESTATE') ? (
                <>
                  {currentBanner.title.split('INSURANCE & REAL ESTATE')[0]}
                  <span className="text-gradient-gold">INSURANCE & REAL ESTATE</span>
                  {currentBanner.title.split('INSURANCE & REAL ESTATE')[1]}
                </>
              ) : currentBanner.title.includes('Insurance & Real Estate') ? (
                <>
                  {currentBanner.title.split('Insurance & Real Estate')[0]}
                  <span className="text-gradient-gold">Insurance & Real Estate</span>
                  {currentBanner.title.split('Insurance & Real Estate')[1]}
                </>
              ) : (
                currentBanner.title
              )}
            </h1>
            
            <p className="hero-description">
              {currentBanner.description}
            </p>

            <div className="hero-actions">
              {currentBanner.primaryButtonText && (
                <Button variant="primary" onClick={() => handleScrollTo(currentBanner.primaryButtonLink.replace('#', ''))}>
                  {currentBanner.primaryButtonText} <ArrowRight size={18} />
                </Button>
              )}
              {currentBanner.secondaryButtonText && (
                <Button variant="secondary" onClick={() => handleScrollTo(currentBanner.secondaryButtonLink.replace('#', ''))}>
                  {currentBanner.secondaryButtonText}
                </Button>
              )}
            </div>

            {/* Quick trust stat badge */}
            {currentBanner.familiesCount && (
              <div className="hero-stat-badge glass-panel">
                <span className="stat-num text-gradient-gold">{currentBanner.familiesCount}</span>
                <span className="stat-lbl">Families Protected & Guided</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        {banners.length > 1 && (
          <>
            {sliderSettings.showArrows && (
              <>
                <button 
                  className="carousel-control-btn prev" 
                  onClick={handlePrev}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  style={{
                    position: 'absolute',
                    left: '0px',
                    bottom: '10px',
                    zIndex: 10,
                    background: hoverPrev ? 'var(--primary-gold)' : 'rgba(5, 10, 23, 0.6)',
                    border: '1px solid var(--border-glass)',
                    color: hoverPrev ? '#050a17' : '#fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: hoverPrev ? '0 0 15px rgba(212, 175, 55, 0.4)' : 'none'
                  }}
                  title="Previous Slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="carousel-control-btn next" 
                  onClick={handleNext}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  style={{
                    position: 'absolute',
                    left: '50px',
                    bottom: '10px',
                    zIndex: 10,
                    background: hoverNext ? 'var(--primary-gold)' : 'rgba(5, 10, 23, 0.6)',
                    border: '1px solid var(--border-glass)',
                    color: hoverNext ? '#050a17' : '#fff',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: hoverNext ? '0 0 15px rgba(212, 175, 55, 0.4)' : 'none'
                  }}
                  title="Next Slide"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            {sliderSettings.showDots && (
              <div className="carousel-dots" style={{
                position: 'absolute',
                left: '50%',
                bottom: '22px',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                gap: '8px'
              }}>
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      width: idx === currentIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: idx === currentIndex ? 'var(--primary-gold)' : 'rgba(255, 255, 255, 0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    title={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}

      </div>
      <div className="hero-bottom-fade" />
    </section>
  );
}
