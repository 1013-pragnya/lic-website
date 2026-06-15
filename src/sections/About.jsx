import React, { useState, useEffect, useRef } from 'react';
import { Award, ShieldCheck, Mail, Calendar, CheckCircle, ShieldAlert, HeartHandshake, PhoneCall, FileCheck, Landmark } from 'lucide-react';
import { agentConfig } from '../config/agentConfig';
import Button from '../components/Button';
import './About.css';

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/,/g, ''), 10) || 0;
    if (end === 0) return;
    
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);

  // Scroll reveal trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // 3D Card Hover Tilt
  const handleMouseMove = (e) => {
    const card = portraitRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = -(y - rect.height / 2) / (rect.height / 2) * 12;
    const rotateY = (x - rect.width / 2) / (rect.width / 2) * 12;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.borderColor = 'var(--primary-gold)';
    card.style.boxShadow = '0 30px 60px rgba(0,0,0,0.65), var(--shadow-gold)';
  };

  const handleMouseLeave = () => {
    const card = portraitRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    card.style.borderColor = 'var(--border-glass)';
    card.style.boxShadow = 'var(--shadow-premium)';
  };

  const handleContactClick = () => {
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      window.scrollTo({
        top: contactSec.offsetTop - 75,
        behavior: 'smooth'
      });
    }
  };

  const servicePoints = [
    {
      icon: HeartHandshake,
      title: "Direct Claim Liaison",
      desc: "Full claim processing assistance ensuring families get quick settlements without paperwork stress."
    },
    {
      icon: FileCheck,
      title: "Custom Portfolio Audits",
      desc: "Comprehensive review of existing policies to optimize tax savings and growth."
    },
    {
      icon: PhoneCall,
      title: "24/7 Advisory Helpline",
      desc: "Immediate advisory access for claim emergencies or premium queries."
    },
    {
      icon: Landmark,
      title: "Emergency Loan Assistance",
      desc: "Hassle-free loan disbursement liaison against insurance values."
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className={`section about-section reveal-anim ${isVisible ? 'revealed' : ''}`}
    >
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Meet Your Advisor</span>
          <h2 className="section-title">About Rajesh Kumar</h2>
        </div>

        <div className="grid-2 about-grid">
          
          {/* Portrait and Badge visual column */}
          <div className="about-visual-col card-container-3d">
            <div 
              ref={portraitRef}
              className="portrait-wrapper glass-panel card-3d"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="portrait-border-glow" />
              <img 
                src={agentConfig.photoUrl} 
                alt={agentConfig.name} 
                className="agent-portrait-img"
              />
              <div className="experience-sticker float-animation">
                <Calendar className="sticker-icon" size={22} />
                <div className="sticker-details">
                  <span className="sticker-count">15+</span>
                  <span className="sticker-label">Years of Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio text, Service Points, and Trust Badges column */}
          <div className="about-content-col">
            <h3 className="agent-title-name">{agentConfig.name}</h3>
            <span className="agent-sub-title">{agentConfig.title}</span>
            
            <p className="agent-narrative">{agentConfig.aboutText}</p>

            {/* Stats Row with Animated Counters */}
            <div className="about-stats-grid card-container-3d">
              <div className="stat-card glass-panel card-3d">
                <span className="stat-value text-gradient-gold">
                  <AnimatedCounter target="15" suffix="+" />
                </span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat-card glass-panel card-3d">
                <span className="stat-value text-gradient-gold">
                  <AnimatedCounter target="1200" suffix="+" />
                </span>
                <span className="stat-label">Families Protected</span>
              </div>
              <div className="stat-card glass-panel card-3d">
                <span className="stat-value text-gradient-gold">
                  <AnimatedCounter target="3200" suffix="+" />
                </span>
                <span className="stat-label">Policies Completed</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges-container">
              <div className="trust-badge-item glass-panel">
                <ShieldCheck size={18} className="trust-badge-icon" />
                <span>IRDAI Licensed</span>
              </div>
              <div className="trust-badge-item glass-panel">
                <Award size={18} className="trust-badge-icon" />
                <span>MDRT Life Member</span>
              </div>
              <div className="trust-badge-item glass-panel">
                <CheckCircle size={18} className="trust-badge-icon" />
                <span>Chairman's Club</span>
              </div>
            </div>

            {/* Customer Service Points */}
            <div className="service-points-grid">
              {servicePoints.map((point, idx) => {
                const Icon = point.icon;
                return (
                  <div key={idx} className="service-point-card glass-panel">
                    <div className="service-point-icon-box">
                      <Icon size={18} className="service-point-icon" />
                    </div>
                    <div className="service-point-txt">
                      <h4 className="service-point-title">{point.title}</h4>
                      <p className="service-point-desc">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="outline" onClick={handleContactClick} className="about-consult-btn">
              Get Free Financial Consultation
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}

