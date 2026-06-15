import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { agentConfig } from '../config/agentConfig';
import Button from '../components/Button';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'endowment',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission handler
    console.log('Submitted Callback Inquiry:', formData);
    setIsSubmitted(true);
    
    // Reset form fields
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', plan: 'endowment', message: '' });
    }, 2000);
  };

  const openWhatsAppDirect = () => {
    window.open(`https://wa.me/${agentConfig.contact.whatsapp}?text=Hi%20Rajesh,%20I%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20LIC%20insurance%20options.`, '_blank');
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Financial Advisor</h2>
        </div>

        <div className="grid-2 contact-grid">
          
          {/* Information Column */}
          <div className="contact-info-col">
            <h3 className="info-heading">Direct Inquiry</h3>
            <p className="info-tagline">Have questions about policy premiums, maturity benefits, or claims processing? Reach out directly and get expert advice.</p>
            
            <ul className="contact-info-list">
              <li className="contact-info-item glass-panel">
                <div className="info-icon-wrapper">
                  <MapPin className="info-list-icon" size={20} />
                </div>
                <div className="info-txt">
                  <span className="info-lbl">Office Address</span>
                  <span className="info-val">{agentConfig.contact.address}</span>
                </div>
              </li>
              
              <li className="contact-info-item glass-panel">
                <div className="info-icon-wrapper">
                  <Phone className="info-list-icon" size={20} />
                </div>
                <div className="info-txt">
                  <span className="info-lbl">Phone Line</span>
                  <a href={`tel:${agentConfig.contact.phone}`} className="info-val info-link">{agentConfig.contact.phone}</a>
                </div>
              </li>
              
              <li className="contact-info-item glass-panel">
                <div className="info-icon-wrapper">
                  <Mail className="info-list-icon" size={20} />
                </div>
                <div className="info-txt">
                  <span className="info-lbl">Email Address</span>
                  <a href={`mailto:${agentConfig.contact.email}`} className="info-val info-link">{agentConfig.contact.email}</a>
                </div>
              </li>
              
              <li className="contact-info-item glass-panel">
                <div className="info-icon-wrapper">
                  <Clock className="info-list-icon" size={20} />
                </div>
                <div className="info-txt">
                  <span className="info-lbl">Consulting Hours</span>
                  <span className="info-val">{agentConfig.contact.workingHours}</span>
                </div>
              </li>
            </ul>

            {/* Google Map Location Section */}
            <div className="contact-map-container glass-panel">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9250858169124!2d77.6087!3d12.9734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167e6aa8abfb%3A0xe5f866ab875e53be!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1718228000000!5m2!1sen!2sin" 
                className="google-map-iframe"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              />
            </div>

            <Button variant="outline" onClick={openWhatsAppDirect} className="contact-wa-action-btn">
              <MessageSquare size={18} className="wa-btn-icon" /> Start Direct WhatsApp Chat
            </Button>
          </div>

          {/* Form Column */}
          <div className="contact-form-col">
            <div className="contact-form-wrapper glass-panel">
              {isSubmitted ? (
                <div className="success-banner">
                  <CheckCircle2 size={56} className="success-icon text-gold float-animation" />
                  <h3 className="success-title">Consultation Booked!</h3>
                  <p className="success-text">Thank you. Advisor Rajesh Kumar will call you shortly to confirm your consultation schedule.</p>
                  <Button variant="secondary" onClick={() => setIsSubmitted(false)} className="success-reset-btn">
                    Book Another Consultation
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 className="form-heading">Book a Consultation</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Amit Sharma"
                      required
                      className="form-input glass-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone"
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
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@gmail.com"
                        required
                        className="form-input glass-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="plan" className="form-label">Interested Insurance Plan</label>
                    <select 
                      id="plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="form-input form-select glass-input"
                    >
                      <option value="life">Life Insurance Plan</option>
                      <option value="child">Child Future Plan</option>
                      <option value="retirement">Retirement & Pension Plan</option>
                      <option value="savings">Savings Plan (Wealth Growth)</option>
                      <option value="health">Health Protection (Mediclaim)</option>
                      <option value="consult">Other queries / portfolio audits</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Your Message / Requirements</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Brief details about your target cover, budget, or preferred callback time..."
                      rows="4"
                      required
                      className="form-input form-textarea glass-input"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="form-submit-btn">
                    Book Consultation <Send size={16} />
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
