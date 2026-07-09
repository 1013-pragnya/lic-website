import React, { createContext, useContext, useState, useEffect } from 'react';
import { agentConfig } from './agentConfig';

const AppContext = createContext(null);

export const useConfig = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useConfig must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    try {
      // 1. Load general agent configuration
      const localConfig = localStorage.getItem('lic_agent_config');
      let currentConfig;
      if (localConfig) {
        currentConfig = JSON.parse(localConfig);
        // Force sync the 4 premium plans config
        currentConfig.plans = agentConfig.plans;
        // Force sync branding name
        if (currentConfig.settings) {
          currentConfig.settings.logoText = "RR Consultancy";
        }
        localStorage.setItem('lic_agent_config', JSON.stringify(currentConfig));
      } else {
        // If not in localstorage, setup default state incorporating static agentConfig
        // plus default hero details and default benefits list
        currentConfig = {
          ...agentConfig,
          hero: {
            badge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
            title: "Secure Your Future With Insurance & Real Estate Solutions",
            description: "Protect your family today and build wealth for tomorrow through trusted financial and property guidance.",
            primaryButtonText: "Book Consultation",
            secondaryButtonText: "Explore Plans",
            familiesCount: "1,200+",
            backgroundImage: "", // default custom background
          },
          benefits: [
            { id: 'b1', icon: 'Shield', title: 'Sovereign Guarantee', description: 'All LIC policies are backed by the sovereign guarantee of the Government of India, ensuring absolute safety.' },
            { id: 'b2', icon: 'Award', title: '18+ Years Experience', description: 'Serving clients with trust, helping them navigate complex financial options and securing their assets.' },
            { id: 'b3', icon: 'Heart', title: '99.2% Claim Settlement', description: 'Hassle-free claims processing with dedicated support when you and your family need it the most.' },
            { id: 'b4', icon: 'TrendingUp', title: 'Wealth Appreciation', description: 'Expert guidance on real estate investments in high-growth corridors of Hyderabad to build passive wealth.' },
            { id: 'b5', icon: 'Users', title: '1,200+ Secured Families', description: 'A growing community of satisfied clients who trust us for their life, health, and property needs.' },
            { id: 'b6', icon: 'Clock', title: '24/7 Dedicated Support', description: 'Direct assistance via WhatsApp, phone, or email to answer any inquiries or help during emergencies.' }
          ],
          gallery: [
            { id: 'g1', url: '/shamsuddin-suit1.jpg', caption: 'Professional Portrait' },
            { id: 'g2', url: '/shamsuddin-suit2.jpg', caption: 'Financial Advisory Session' },
            { id: 'g3', url: '/shamsuddin-office1.jpg', caption: 'Office Consultation Room' },
            { id: 'g4', url: '/shamsuddin-office2.jpg', caption: 'Client Meeting' },
            { id: 'g5', url: '/shamsuddin-event.jpg', caption: 'Award Ceremony' }
          ],
          settings: {
            logoText: "RR Consultancy",
            logoUrl: "",
            faviconUrl: "",
            primaryColor: "#cfa844",
            secondaryColor: "#050a17",
            seoTitle: "Shamsuddin Ratnani | Authorized LIC Insurance & Real Estate Consultant",
            seoDescription: "Secure your family's future and grow your wealth with Shamsuddin Ratnani, authorized senior LIC insurance advisor.",
            seoKeywords: "LIC Agent, Life Insurance Corporation, Shamsuddin Ratnani, Financial Planner, Term Insurance"
          }
        };
        localStorage.setItem('lic_agent_config', JSON.stringify(currentConfig));
      }
      setConfig(currentConfig);

      // Apply SEO dynamically
      if (currentConfig.settings) {
        document.title = currentConfig.settings.seoTitle || document.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', currentConfig.settings.seoDescription || '');
      }

      // 2. Load quotes
      const localQuotes = localStorage.getItem('rrfs_quotes');
      if (localQuotes) {
        setQuotes(JSON.parse(localQuotes));
      } else {
        // Mock default quotes if empty
        const defaultQuotes = [
          {
            id: 'lead_1',
            timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
            name: "Rahul Sharma",
            phone: "9876543210",
            email: "rahul@gmail.com",
            provider: "LIC",
            category: "Life Insurance",
            message: "Looking for a child education policy for my 5-year-old daughter. Need low premium and long term.",
            status: "New"
          },
          {
            id: 'lead_2',
            timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
            name: "Priya Nair",
            phone: "8765432109",
            email: "priya@yahoo.com",
            provider: "Care Health",
            category: "Health Insurance",
            message: "Need a comprehensive health cover for my senior citizen parents. Do you offer cashless plans?",
            status: "Contacted"
          }
        ];
        localStorage.setItem('rrfs_quotes', JSON.stringify(defaultQuotes));
        setQuotes(defaultQuotes);
      }

      // 3. Load contact form submissions
      const localContacts = localStorage.getItem('rrfs_contact_submissions');
      if (localContacts) {
        setContacts(JSON.parse(localContacts));
      } else {
        const defaultContacts = [
          {
            id: 'contact_1',
            timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
            name: "Rajesh Kumar",
            phone: "7654321098",
            email: "rajesh@outlook.com",
            plan: "life",
            propertyInterest: "residential",
            message: "I want to schedule an appointment this Saturday to discuss commercial real estate investment properties.",
            status: "New"
          }
        ];
        localStorage.setItem('rrfs_contact_submissions', JSON.stringify(defaultContacts));
        setContacts(defaultContacts);
      }
    } catch (e) {
      console.error('Failed to initialize app context data:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save configurations helper
  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('lic_agent_config', JSON.stringify(newConfig));

    // Dynamic SEO updates
    if (newConfig.settings) {
      document.title = newConfig.settings.seoTitle || document.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', newConfig.settings.seoDescription || '');
    }
  };

  // Section Save Functions
  const updateHero = (hero) => {
    saveConfig({ ...config, hero });
  };

  const updateAbout = (aboutData) => {
    saveConfig({
      ...config,
      name: aboutData.name,
      title: aboutData.title,
      experience: aboutData.experience,
      aboutText: aboutData.aboutText,
      photoUrl: aboutData.photoUrl,
      achievements: aboutData.achievements,
      familiesSecured: aboutData.familiesSecured,
      claimsSettled: aboutData.claimsSettled
    });
  };

  const updateContact = (contact) => {
    saveConfig({
      ...config,
      contact: {
        ...config.contact,
        phone: contact.phone,
        phoneSecondary: contact.phoneSecondary,
        email: contact.email,
        address: contact.address,
        whatsapp: contact.whatsapp,
        workingHours: contact.workingHours
      }
    });
  };

  const updateSocials = (social) => {
    saveConfig({
      ...config,
      contact: {
        ...config.contact,
        social
      }
    });
  };

  const updateSettings = (settings) => {
    saveConfig({ ...config, settings });
  };

  // CRUD for Plans
  const addPlan = (plan) => {
    const plans = [...(config.plans || [])];
    const newPlan = { ...plan, id: 'plan_' + Date.now() };
    plans.push(newPlan);
    saveConfig({ ...config, plans });
  };

  const updatePlan = (updatedPlan) => {
    const plans = (config.plans || []).map(p => p.id === updatedPlan.id ? updatedPlan : p);
    saveConfig({ ...config, plans });
  };

  const deletePlan = (id) => {
    const plans = (config.plans || []).filter(p => p.id !== id);
    saveConfig({ ...config, plans });
  };

  // CRUD for Benefits
  const addBenefit = (benefit) => {
    const benefits = [...(config.benefits || [])];
    const newBenefit = { ...benefit, id: 'b_' + Date.now() };
    benefits.push(newBenefit);
    saveConfig({ ...config, benefits });
  };

  const updateBenefit = (updatedBenefit) => {
    const benefits = (config.benefits || []).map(b => b.id === updatedBenefit.id ? updatedBenefit : b);
    saveConfig({ ...config, benefits });
  };

  const deleteBenefit = (id) => {
    const benefits = (config.benefits || []).filter(b => b.id !== id);
    saveConfig({ ...config, benefits });
  };

  // CRUD for Testimonials
  const addTestimonial = (testimonial) => {
    const testimonials = [...(config.testimonials || [])];
    const newTest = { ...testimonial, id: 'test_' + Date.now() };
    testimonials.push(newTest);
    saveConfig({ ...config, testimonials });
  };

  const updateTestimonial = (updatedTest) => {
    const testimonials = (config.testimonials || []).map(t => t.id === updatedTest.id ? updatedTest : t);
    saveConfig({ ...config, testimonials });
  };

  const deleteTestimonial = (id) => {
    const testimonials = (config.testimonials || []).filter(t => t.id !== id);
    saveConfig({ ...config, testimonials });
  };

  // CRUD for Real Estate
  const addRealEstate = (property) => {
    const realEstate = [...(config.realEstate || [])];
    const newProp = { ...property, id: 'prop_' + Date.now() };
    realEstate.push(newProp);
    saveConfig({ ...config, realEstate });
  };

  const updateRealEstate = (updatedProp) => {
    const realEstate = (config.realEstate || []).map(r => r.id === updatedProp.id ? updatedProp : r);
    saveConfig({ ...config, realEstate });
  };

  const deleteRealEstate = (id) => {
    const realEstate = (config.realEstate || []).filter(r => r.id !== id);
    saveConfig({ ...config, realEstate });
  };

  // Gallery Management
  const addGalleryImage = (image) => {
    const gallery = [...(config.gallery || [])];
    const newImg = { ...image, id: 'g_' + Date.now() };
    gallery.push(newImg);
    saveConfig({ ...config, gallery });
  };

  const deleteGalleryImage = (id) => {
    const gallery = (config.gallery || []).filter(g => g.id !== id);
    saveConfig({ ...config, gallery });
  };

  // Quote Submissions Operations
  const submitQuote = (newLead) => {
    const updated = [newLead, ...quotes];
    setQuotes(updated);
    localStorage.setItem('rrfs_quotes', JSON.stringify(updated));
  };

  const updateQuoteStatus = (id, newStatus) => {
    const updated = quotes.map(q => q.id === id ? { ...q, status: newStatus } : q);
    setQuotes(updated);
    localStorage.setItem('rrfs_quotes', JSON.stringify(updated));
  };

  const deleteQuote = (id) => {
    const updated = quotes.filter(q => q.id !== id);
    setQuotes(updated);
    localStorage.setItem('rrfs_quotes', JSON.stringify(updated));
  };

  // Contact Submissions Operations
  const submitContact = (newContact) => {
    const updated = [newContact, ...contacts];
    setContacts(updated);
    localStorage.setItem('rrfs_contact_submissions', JSON.stringify(updated));
  };

  const updateContactStatus = (id, newStatus) => {
    const updated = contacts.map(c => c.id === id ? { ...c, status: newStatus } : c);
    setContacts(updated);
    localStorage.setItem('rrfs_contact_submissions', JSON.stringify(updated));
  };

  const deleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('rrfs_contact_submissions', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{
      agentConfig: config,
      quotes,
      contacts,
      loading,
      updateHero,
      updateAbout,
      updateContact,
      updateSocials,
      updateSettings,
      addPlan,
      updatePlan,
      deletePlan,
      addBenefit,
      updateBenefit,
      deleteBenefit,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addRealEstate,
      updateRealEstate,
      deleteRealEstate,
      addGalleryImage,
      deleteGalleryImage,
      submitQuote,
      updateQuoteStatus,
      deleteQuote,
      submitContact,
      updateContactStatus,
      deleteContact
    }}>
      {!loading && children}
    </AppContext.Provider>
  );
};
