import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, MessageSquare, ShieldAlert, Sparkles, ClipboardCheck } from 'lucide-react';
import { useConfig } from '../config/AppContext';
import Button from '../components/Button';
import './Quote.css';

export default function Quote({ preFill, clearPreFill }) {
  const { agentConfig, submitQuote } = useConfig();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    provider: 'LIC',
    category: 'Life Insurance',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const sectionRef = useRef(null);

  // Sync preFill values when user clicks a CTA elsewhere
  useEffect(() => {
    if (preFill) {
      setFormData((prev) => ({
        ...prev,
        provider: preFill.provider || 'LIC',
        category: preFill.category || 'Life Insurance'
      }));

      // Scroll to Quote section
      const quoteSection = document.getElementById('quote');
      if (quoteSection) {
        window.scrollTo({
          top: quoteSection.offsetTop - 75,
          behavior: 'smooth'
        });
      }

      // Clear the pre-fill buffer in App state
      if (clearPreFill) {
        clearPreFill();
      }
    }
  }, [preFill, clearPreFill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLead = {
      id: 'lead_' + Date.now(),
      timestamp: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      provider: formData.provider,
      category: formData.category,
      message: formData.message,
      status: 'New'
    };

    // Store via AppContext
    try {
      submitQuote(newLead);
    } catch (err) {
      console.error('Failed to store quote lead via context:', err);
    }

    // Trigger admin notification
    setSubmittedLead(newLead);
    setIsSubmitted(true);

    const event = new CustomEvent('lead-submitted', { detail: newLead });
    window.dispatchEvent(event);

    // Reset fields
    setFormData({
      name: '',
      phone: '',
      email: '',
      provider: 'LIC',
      category: 'Life Insurance',
      message: ''
    });
  };

  const startWhatsAppChat = () => {
    if (!submittedLead) return;
    const firstName = agentConfig?.name.split(' ')[0] || "Advisor";
    const text = encodeURIComponent(
      `Hi ${firstName}, I just submitted a Quote Request on your advisor website. \n\n` +
      `*Name:* ${submittedLead.name}\n` +
      `*Category:* ${submittedLead.category}\n` +
      `*Provider:* ${submittedLead.provider}\n\n` +
      `Please let me know the premium quotes and details at your earliest convenience.`
    );
    const whatsappNum = agentConfig?.contact?.whatsapp?.replace(/\D/g, '') || '';
    window.open(`https://wa.me/${whatsappNum}?text=${text}`, '_blank');
  };

  return (
    <section id="quote" ref={sectionRef} className="section quote-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Tailored Protection</span>
          <h2 className="section-title">Request Premium Quote</h2>
        </div>

        <div className="quote-grid-wrapper card-container-3d">
          <div className="quote-layout-card glass-panel card-3d">
            
            {isSubmitted ? (
              <div className="quote-success-banner fade-in">
                <div className="success-icon-ring float-animation">
                  <ClipboardCheck size={64} className="success-check-icon text-gold" />
                </div>
                <h3 className="success-banner-title">Quote Request Submitted!</h3>
                <p className="success-banner-text">
                  Thank you, <strong>{submittedLead?.name}</strong>. Your premium inquiry details have been saved. 
                  Financial Advisor <strong>{agentConfig.name}</strong> will review your requirements and send a customized quote to your email / phone lines shortly.
                </p>

                <div className="success-banner-actions">
                  <Button variant="outline" onClick={startWhatsAppChat} className="whatsapp-followup-btn">
                    <MessageSquare size={18} className="whatsapp-accent-icon" /> Fast-Track via WhatsApp
                  </Button>
                  <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                    Request Another Quote
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-form">
                <div className="form-lead-pitch">
                  <Sparkles size={20} className="text-gold" />
                  <p>Get custom benefit plans and instant pricing. Fill out the request form below to lock in the lowest rates.</p>
                </div>

                <div className="quote-form-grid">
                  {/* Left Column: Client details */}
                  <div className="quote-form-col">
                    <div className="form-group">
                      <label htmlFor="quote-name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        id="quote-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Shamsuddin Ratnani"
                        required
                        className="form-input glass-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-phone" className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        id="quote-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        pattern="[0-9]{10}"
                        required
                        className="form-input glass-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="quote-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        required
                        className="form-input glass-input"
                      />
                    </div>
                  </div>

                  {/* Right Column: Plan details */}
                  <div className="quote-form-col">
                    <div className="form-group">
                      <label htmlFor="quote-provider" className="form-label">Select Insurance Provider</label>
                      <select
                        id="quote-provider"
                        name="provider"
                        value={formData.provider}
                        onChange={handleChange}
                        className="form-input form-select glass-input"
                      >
                        <option value="LIC">LIC (Life Insurance Corporation)</option>
                        <option value="Tata AIG">Tata AIG General Insurance</option>
                        <option value="Care Health Insurance">Care Health Insurance</option>
                        <option value="Star Health Insurance">Star Health Insurance</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-category" className="form-label">Insurance Category</label>
                      <select
                        id="quote-category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-input form-select glass-input"
                      >
                        <option value="Life Insurance">Life Insurance Cover</option>
                        <option value="Health Insurance">Health Insurance (Mediclaim)</option>
                        <option value="Motor Insurance">Motor / General Asset Cover</option>
                        <option value="Investment Plans">Investment / Endowment Growth</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-message" className="form-label">Message / Requirements</label>
                      <textarea
                        id="quote-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Briefly state target sum assured, age of dependents, term preferences, or health history..."
                        rows="3"
                        required
                        className="form-input form-textarea glass-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="quote-submit-wrapper">
                  <Button type="submit" variant="primary" className="quote-submit-btn">
                    Submit Quote Request <Send size={16} />
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
