import React, { createContext, useContext, useState, useEffect } from 'react';
import { agentConfig } from './agentConfig';
import { getImageBinary, saveImageBinary, deleteImageBinary } from './mediaStorage';
import { supabase } from '../lib/supabaseClient';

// Asynchronous helper to map media blobs to local object URLs on startup
const resolveMedia = async (mediaItems) => {
  return Promise.all((mediaItems || []).map(async (item) => {
    if (item.file_url && (
      item.file_url.startsWith('data:') || 
      item.file_url.startsWith('http') || 
      item.file_url.startsWith('/src/') || 
      item.file_url.startsWith('/assets/') ||
      item.file_url.startsWith('blob:')
    )) {
      return item;
    }
    try {
      const blob = await getImageBinary(item.id);
      if (blob) {
        const url = URL.createObjectURL(blob);
        return { ...item, file_url: url };
      }
    } catch (err) {
      console.error("IndexedDB error loading", item.id, err);
    }
    return item;
  }));
};

const AppContext = createContext(null);

const hexToRgb = (hex) => {
  if (!hex) return null;
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const applyThemeColors = (settings) => {
  if (!settings) return;
  
  if (settings.primaryColor) {
    document.documentElement.style.setProperty('--primary-gold', settings.primaryColor);
    document.documentElement.style.setProperty('--primary', settings.primaryColor);
    document.documentElement.style.setProperty('--ring', settings.primaryColor);
    
    const rgb = hexToRgb(settings.primaryColor);
    if (rgb) {
      document.documentElement.style.setProperty('--primary-gold-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
      document.documentElement.style.setProperty('--gold-glow', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`);
    }
  }
  
  if (settings.secondaryColor) {
    document.documentElement.style.setProperty('--bg-primary', settings.secondaryColor);
    document.documentElement.style.setProperty('--background', settings.secondaryColor);
    document.documentElement.style.setProperty('--admin-bg', settings.secondaryColor);
    
    const rgb = hexToRgb(settings.secondaryColor);
    if (rgb) {
      const cardR = Math.min(255, Math.round(rgb.r + 10));
      const cardG = Math.min(255, Math.round(rgb.g + 16));
      const cardB = Math.min(255, Math.round(rgb.b + 30));
      const cardColor = `rgb(${cardR}, ${cardG}, ${cardB})`;
      
      document.documentElement.style.setProperty('--bg-secondary', cardColor);
      document.documentElement.style.setProperty('--card', cardColor);
      document.documentElement.style.setProperty('--popover', cardColor);
    }
  }
};

export const useConfig = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useConfig must be used within an AppProvider');
  }
  return context;
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const mapDbToProperty = (p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  location: p.location,
  type: p.type,
  benefits: p.benefits,
  price: p.price,
  image: p.image,
  priceCardImage: p.price_card_image,
  mapImage: p.map_image,
  developer: p.developer,
  approvals: p.approvals || [],
  gift: p.gift || '',
  highlights: p.highlights || [],
  investmentBenefits: p.investment_benefits || [],
  locationAdvantages: p.location_advantages || [],
  trustBadges: p.trust_badges || [],
  status: p.status || 'Available',
  featured: p.featured || false,
  hidden: p.hidden || false,
  sort_order: p.sort_order || 0
});

const mapPropertyToDb = (p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  location: p.location,
  type: p.type,
  benefits: p.benefits,
  price: p.price,
  image: p.image,
  price_card_image: p.priceCardImage || '',
  map_image: p.mapImage || '',
  developer: p.developer,
  approvals: p.approvals || [],
  gift: p.gift || '',
  highlights: p.highlights || [],
  investment_benefits: p.investmentBenefits || [],
  location_advantages: p.locationAdvantages || [],
  trust_badges: p.trustBadges || [],
  status: p.status || 'Available',
  featured: p.featured || false,
  hidden: p.hidden || false,
  sort_order: p.sort_order || 0
});

const mapDbToBanner = (b) => ({
  id: b.id,
  badge: b.badge,
  title: b.title,
  description: b.description,
  primaryButtonText: b.primary_button_text,
  secondaryButtonText: b.secondary_button_text,
  familiesCount: b.families_count,
  backgroundImage: b.background_image,
  hidden: b.hidden,
  sort_order: b.sort_order
});

const mapBannerToDb = (b) => ({
  id: b.id,
  badge: b.badge,
  title: b.title,
  description: b.description,
  primary_button_text: b.primaryButtonText || '',
  secondary_button_text: b.secondaryButtonText || '',
  families_count: b.familiesCount || '1,200+',
  background_image: b.backgroundImage || '',
  hidden: b.hidden || false,
  sort_order: b.sort_order || 0
});

const mapDbToPartner = (p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  logo: p.logo,
  description: p.description,
  buttonText: p.button_text,
  buttonLink: p.button_link,
  hidden: p.hidden,
  sort_order: p.sort_order
});

const mapPartnerToDb = (p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  logo: p.logo,
  description: p.description,
  button_text: p.buttonText || '',
  button_link: p.buttonLink || '',
  hidden: p.hidden || false,
  sort_order: p.sort_order || 0
});

export const AppProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to save configuration locally
  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    const configToSave = { ...newConfig };
    if (configToSave.media) {
      configToSave.media = configToSave.media.map(m => {
        if (m.id && m.id.startsWith('custom_media_')) {
          return { ...m, file_url: "" };
        }
        return m;
      });
    }
    localStorage.setItem('lic_agent_config', JSON.stringify(configToSave));

    if (newConfig.settings) {
      applyThemeColors(newConfig.settings);
      document.title = newConfig.settings.seoTitle || document.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', newConfig.settings.seoDescription || '');
    }
  };

  // Local storage offline initialization backup
  const loadLocalBackup = async () => {
    try {
      const localConfig = localStorage.getItem('lic_agent_config');
      let currentConfig;
      if (localConfig) {
        currentConfig = JSON.parse(localConfig);
        // Force sync structure defaults
        currentConfig.plans = agentConfig.plans;
        currentConfig.partners = agentConfig.partners;
        currentConfig.realEstate = agentConfig.realEstate;
        currentConfig.testimonials = agentConfig.testimonials;
        if (!currentConfig.media) {
          currentConfig.media = agentConfig.media || [];
        } else {
          const customMedia = currentConfig.media.filter(m => !m.id.startsWith('media_'));
          currentConfig.media = [...agentConfig.media, ...customMedia];
        }
        if (currentConfig.settings) {
          currentConfig.settings.logoText = "RR INSURANCE &\nFINANCIAL SERVICES";
        }
      } else {
        currentConfig = {
          ...agentConfig,
          hero: {
            badge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
            title: "SECURE YOUR FUTURE WITH INSURANCE & REAL ESTATE",
            description: "Protect your family, health, assets, and investments with trusted insurance solutions and premium real estate opportunities.",
            primaryButtonText: "GET FREE QUOTE",
            secondaryButtonText: "EXPLORE SERVICES",
            familiesCount: "1,200+",
            backgroundImage: ""
          },
          banners: [
            {
              id: 'banner_1',
              badge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
              title: "SECURE YOUR FUTURE WITH INSURANCE & REAL ESTATE",
              description: "Protect your family, health, assets, and investments with trusted insurance solutions and premium real estate opportunities.",
              primaryButtonText: "GET FREE QUOTE",
              secondaryButtonText: "EXPLORE SERVICES",
              familiesCount: "1,200+",
              backgroundImage: "",
              hidden: false
            },
            {
              id: 'banner_2',
              badge: "Premium Real Estate Ventures in Hyderabad",
              title: "PREMIUM REAL ESTATE PORTFOLIO",
              description: "Explore luxury villas, commercial spaces, and high-yielding land investments in Hyderabad's prime growth corridors.",
              primaryButtonText: "EXPLORE PORTFOLIO",
              secondaryButtonText: "BOOK CONSULTATION",
              familiesCount: "1,200+",
              backgroundImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1920",
              hidden: false
            }
          ],
          sliderSettings: {
            autoPlay: true,
            duration: 5000,
            transitionSpeed: 0.8,
            animationType: 'fade',
            infiniteLoop: true,
            showDots: true,
            showArrows: true
          },
          partners: agentConfig.partners,
          benefits: [
            { id: 'b1', icon: 'Shield', title: 'Sovereign Guarantee', description: 'All LIC policies are backed by the sovereign guarantee of the Government of India, ensuring absolute safety.', hidden: false, sort_order: 0 },
            { id: 'b2', icon: 'Award', title: '18+ Years Experience', description: 'Serving clients with trust, helping them navigate complex financial options and securing their assets.', hidden: false, sort_order: 1 },
            { id: 'b3', icon: 'Heart', title: '99.2% Claim Settlement', description: 'Hassle-free claims processing with dedicated support when you and your family need it the most.', hidden: false, sort_order: 2 },
            { id: 'b4', icon: 'TrendingUp', title: 'Wealth Appreciation', description: 'Expert guidance on real estate investments in high-growth corridors of Hyderabad to build passive wealth.', hidden: false, sort_order: 3 },
            { id: 'b5', icon: 'Users', title: '1,200+ Secured Families', description: 'A growing community of satisfied clients who trust us for their life, health, and property needs.', hidden: false, sort_order: 4 },
            { id: 'b6', icon: 'Clock', title: '24/7 Dedicated Support', description: 'Direct assistance via WhatsApp, phone, or email to answer any inquiries or help during emergencies.', hidden: false, sort_order: 5 }
          ],
          gallery: [
            { id: 'g1', url: '/shamsuddin-suit1.jpg', caption: 'Professional Portrait' },
            { id: 'g2', url: '/shamsuddin-suit2.jpg', caption: 'Financial Advisory Session' },
            { id: 'g3', url: '/shamsuddin-office1.jpg', caption: 'Office Consultation Room' },
            { id: 'g4', url: '/shamsuddin-office2.jpg', caption: 'Client Meeting' },
            { id: 'g5', url: '/shamsuddin-event.jpg', caption: 'Award Ceremony' }
          ],
          settings: {
            logoText: "RR INSURANCE &\nFINANCIAL SERVICES",
            logoUrl: "",
            faviconUrl: "",
            primaryColor: "#cfa844",
            secondaryColor: "#050a17",
            seoTitle: "Shamsuddin Ratnani | Authorized LIC Insurance & Real Estate Consultant",
            seoDescription: "Secure your family's future and grow your wealth with Shamsuddin Ratnani, authorized senior LIC insurance advisor.",
            seoKeywords: "LIC Agent, Life Insurance Corporation, Shamsuddin Ratnani, Financial Planner, Term Insurance"
          }
        };
      }

      if (currentConfig.media) {
        currentConfig.media = await resolveMedia(currentConfig.media);
      }

      setConfig(currentConfig);
      applyThemeColors(currentConfig.settings);

      // Load quotes
      const localQuotes = localStorage.getItem('rrfs_quotes');
      if (localQuotes) {
        setQuotes(JSON.parse(localQuotes));
      } else {
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

      // Load contacts
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
      console.error("Local offline storage initialization failed", e);
    }
  };

  // Initialize data from Supabase or localStorage fallback
  useEffect(() => {
    const initData = async () => {
      try {
        if (!supabase) {
          throw new Error("Supabase is not configured.");
        }

        // 1. Check and Seed database if tables are empty
        const { data: plansCheck, error: plansErr } = await supabase.from('plans').select('id');
        const { data: reCheck, error: reErr } = await supabase.from('real_estate').select('id');
        const { data: testCheck, error: testErr } = await supabase.from('testimonials').select('id');

        const noPlans = !plansCheck || plansCheck.length === 0;
        const noRe = !reCheck || reCheck.length === 0;
        const noTest = !testCheck || testCheck.length === 0;

        if (noPlans && noRe && noTest && !plansErr && !reErr && !testErr) {
          console.log("Supabase tables are empty. Seeding default data...");
          
          // Seed settings
          await supabase.from('settings').upsert([
            {
              key: 'about_settings',
              value: {
                name: agentConfig.name,
                title: agentConfig.title,
                education: agentConfig.education || 'M.Com',
                licBadge: agentConfig.licBadge || 'Authorized Advisor: LIC, Tata AIG, Care Health, Star Health',
                experience: agentConfig.experience,
                familiesSecured: agentConfig.familiesSecured,
                claimsSettled: agentConfig.claimsSettled,
                aboutText: agentConfig.aboutText,
                photoUrl: agentConfig.photoUrl,
                photos: agentConfig.photos || []
              }
            },
            {
              key: 'contact_settings',
              value: agentConfig.contact
            },
            {
              key: 'slider_settings',
              value: {
                autoPlay: true,
                duration: 5000,
                transitionSpeed: 0.8,
                animationType: 'fade',
                infiniteLoop: true,
                showDots: true,
                showArrows: true
              }
            },
            {
              key: 'site_settings',
              value: {
                logoText: "RR INSURANCE &\nFINANCIAL SERVICES",
                logoUrl: "",
                faviconUrl: "",
                primaryColor: "#cfa844",
                secondaryColor: "#050a17",
                seoTitle: "Shamsuddin Ratnani | Authorized LIC Insurance & Real Estate Consultant",
                seoDescription: "Secure your family's future and grow your wealth with Shamsuddin Ratnani, authorized senior LIC insurance advisor.",
                seoKeywords: "LIC Agent, Life Insurance Corporation, Shamsuddin Ratnani, Financial Planner, Term Insurance"
              }
            },
            {
              key: 'gallery_settings',
              value: [
                { id: 'g1', url: '/shamsuddin-suit1.jpg', caption: 'Professional Portrait' },
                { id: 'g2', url: '/shamsuddin-suit2.jpg', caption: 'Financial Advisory Session' },
                { id: 'g3', url: '/shamsuddin-office1.jpg', caption: 'Office Consultation Room' },
                { id: 'g4', url: '/shamsuddin-office2.jpg', caption: 'Client Meeting' },
                { id: 'g5', url: '/shamsuddin-event.jpg', caption: 'Award Ceremony' }
              ]
            },
            {
              key: 'hero',
              value: {
                badge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
                title: "SECURE YOUR FUTURE WITH INSURANCE & REAL ESTATE",
                description: "Protect your family, health, assets, and investments with trusted insurance solutions and premium real estate opportunities.",
                primaryButtonText: "GET FREE QUOTE",
                secondaryButtonText: "EXPLORE SERVICES",
                familiesCount: "1,200+",
                backgroundImage: ""
              }
            }
          ]);

          // Seed banners
          await supabase.from('banners').insert([
            {
              id: 'banner_1',
              badge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
              title: "SECURE YOUR FUTURE WITH INSURANCE & REAL ESTATE",
              description: "Protect your family, health, assets, and investments with trusted insurance solutions and premium real estate opportunities.",
              primary_button_text: "GET FREE QUOTE",
              secondary_button_text: "EXPLORE SERVICES",
              families_count: "1,200+",
              background_image: "",
              hidden: false,
              sort_order: 0
            },
            {
              id: 'banner_2',
              badge: "Premium Real Estate Ventures in Hyderabad",
              title: "PREMIUM REAL ESTATE PORTFOLIO",
              description: "Explore luxury villas, commercial spaces, and high-yielding land investments in Hyderabad's prime growth corridors.",
              primary_button_text: "EXPLORE PORTFOLIO",
              secondary_button_text: "BOOK CONSULTATION",
              families_count: "1,200+",
              background_image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1920",
              hidden: false,
              sort_order: 1
            }
          ]);

          // Seed benefits
          await supabase.from('benefits').insert([
            { id: 'b1', icon: 'Shield', title: 'Sovereign Guarantee', description: 'All LIC policies are backed by the sovereign guarantee of the Government of India, ensuring absolute safety.', hidden: false, sort_order: 0 },
            { id: 'b2', icon: 'Award', title: '18+ Years Experience', description: 'Serving clients with trust, helping them navigate complex financial options and securing their assets.', hidden: false, sort_order: 1 },
            { id: 'b3', icon: 'Heart', title: '99.2% Claim Settlement', description: 'Hassle-free claims processing with dedicated support when you and your family need it the most.', hidden: false, sort_order: 2 },
            { id: 'b4', icon: 'TrendingUp', title: 'Wealth Appreciation', description: 'Expert guidance on real estate investments in high-growth corridors of Hyderabad to build passive wealth.', hidden: false, sort_order: 3 },
            { id: 'b5', icon: 'Users', title: '1,200+ Secured Families', description: 'A growing community of satisfied clients who trust us for their life, health, and property needs.', hidden: false, sort_order: 4 },
            { id: 'b6', icon: 'Clock', title: '24/7 Dedicated Support', description: 'Direct assistance via WhatsApp, phone, or email to answer any inquiries or help during emergencies.', hidden: false, sort_order: 5 }
          ]);

          // Seed default media
          const mediaToInsert = agentConfig.media.map(m => ({
            id: m.id,
            file_name: m.file_name,
            original_name: m.original_name,
            file_url: m.file_url,
            file_size: m.file_size,
            mime_type: m.mime_type,
            width: m.width,
            height: m.height,
            uploaded_at: m.uploaded_at
          }));
          await supabase.from('media').insert(mediaToInsert);

          // Seed testimonials
          const testimonialsToInsert = agentConfig.testimonials.map((t, idx) => ({
            id: t.id,
            client_name: t.client_name,
            client_location: t.client_location,
            policy_name: t.policy_name,
            review: t.review,
            image_id: t.image_id,
            hidden: false,
            sort_order: idx
          }));
          await supabase.from('testimonials').insert(testimonialsToInsert);

          // Seed partners
          const partnersToInsert = agentConfig.partners.map((p, idx) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            logo: p.logo,
            description: p.description,
            button_text: p.buttonText || 'VIEW PLANS',
            button_link: p.buttonLink || '',
            hidden: false,
            sort_order: idx
          }));
          await supabase.from('partners').insert(partnersToInsert);

          // Seed plans
          const plansToInsert = agentConfig.plans.map((p, idx) => ({
            id: p.id,
            title: p.title,
            provider: p.provider,
            category: p.category,
            tagline: p.tagline,
            icon: p.icon,
            description: p.description,
            logo: p.logo,
            image: p.image,
            benefits: p.benefits,
            eligibility: p.eligibility,
            hidden: false,
            sort_order: idx
          }));
          await supabase.from('plans').insert(plansToInsert);

          // Seed real estate
          const propertiesToInsert = agentConfig.realEstate.map((p, idx) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            location: p.location,
            type: p.type,
            benefits: p.benefits,
            price: p.price,
            image: p.image,
            price_card_image: p.priceCardImage || '',
            map_image: p.mapImage || '',
            developer: p.developer,
            approvals: p.approvals || [],
            gift: p.gift || '',
            highlights: p.highlights || [],
            investment_benefits: p.investmentBenefits || [],
            location_advantages: p.locationAdvantages || [],
            trust_badges: p.trustBadges || [],
            status: p.status || 'Available',
            featured: p.featured || false,
            hidden: p.hidden || false,
            sort_order: idx
          }));
          await supabase.from('real_estate').insert(propertiesToInsert);

          // Seed default quotes
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
          await supabase.from('quotes').insert(defaultQuotes);

          // Seed default contacts
          const defaultContacts = [
            {
              id: 'contact_1',
              timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
              name: "Rajesh Kumar",
              phone: "7654321098",
              email: "rajesh@outlook.com",
              plan: "life",
              property_interest: "residential",
              message: "I want to schedule an appointment this Saturday to discuss commercial real estate investment properties.",
              status: "New"
            }
          ];
          await supabase.from('contacts').insert(defaultContacts);
        }

        // 2. Fetch all collections from Supabase
        const [
          plansRes,
          realEstateRes,
          testimonialsRes,
          partnersRes,
          bannersRes,
          benefitsRes,
          mediaRes,
          settingsRes,
          quotesRes,
          contactsRes
        ] = await Promise.all([
          supabase.from('plans').select('*').order('sort_order', { ascending: true }),
          supabase.from('real_estate').select('*').order('sort_order', { ascending: true }),
          supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
          supabase.from('partners').select('*').order('sort_order', { ascending: true }),
          supabase.from('banners').select('*').order('sort_order', { ascending: true }),
          supabase.from('benefits').select('*').order('sort_order', { ascending: true }),
          supabase.from('media').select('*').order('uploaded_at', { ascending: false }),
          supabase.from('settings').select('*'),
          supabase.from('quotes').select('*').order('timestamp', { ascending: false }),
          supabase.from('contacts').select('*').order('timestamp', { ascending: false })
        ]);

        // If core tables don't exist (returns a Postgres relation error), throw to trigger local storage backup fallback
        if (plansRes.error || realEstateRes.error || testimonialsRes.error) {
          console.warn("Supabase tables not found. Please run the supabase_schema.sql script in your Supabase console.");
          throw new Error("Supabase tables not found. Falling back to local offline storage.");
        }

        const plansDb = plansRes.data;
        const realEstateDb = realEstateRes.data;
        const testimonialsDb = testimonialsRes.data;
        const partnersDb = partnersRes.data;
        const bannersDb = bannersRes.data;
        const benefitsDb = benefitsRes.data;
        const mediaDb = mediaRes.data;
        const settingsDb = settingsRes.data;
        const quotesDb = quotesRes.data;
        const contactsDb = contactsRes.data;

        // Transform settings rows into single settings object
        const settingsMap = {};
        (settingsDb || []).forEach(row => {
          settingsMap[row.key] = row.value;
        });

        const about = settingsMap['about_settings'] || {};
        const contact = settingsMap['contact_settings'] || {};
        const sliderSettings = settingsMap['slider_settings'] || {};
        const branding = settingsMap['site_settings'] || {};
        const gallery = settingsMap['gallery_settings'] || [];
        const hero = settingsMap['hero'] || {};

        // Construct agentConfig state using DB data
        const currentConfig = {
          name: about.name || agentConfig.name,
          title: about.title || agentConfig.title,
          education: about.education || agentConfig.education,
          licBadge: about.licBadge || agentConfig.licBadge,
          experience: about.experience || agentConfig.experience,
          familiesSecured: about.familiesSecured || agentConfig.familiesSecured,
          claimsSettled: about.claimsSettled || agentConfig.claimsSettled,
          aboutText: about.aboutText || agentConfig.aboutText,
          photoUrl: about.photoUrl || agentConfig.photoUrl,
          photos: about.photos || agentConfig.photos || [],
          contact: {
            phone: contact.phone || agentConfig.contact.phone,
            phoneSecondary: contact.phoneSecondary || agentConfig.contact.phoneSecondary,
            email: contact.email || agentConfig.contact.email,
            address: contact.address || agentConfig.contact.address,
            whatsapp: contact.whatsapp || agentConfig.contact.whatsapp,
            whatsappSecondary: contact.whatsappSecondary || agentConfig.contact.whatsappSecondary,
            workingHours: contact.workingHours || agentConfig.contact.workingHours,
            social: contact.social || agentConfig.contact.social
          },
          plans: (plansDb || []).map(p => ({ ...p })),
          partners: (partnersDb || []).map(mapDbToPartner),
          realEstate: (realEstateDb || []).map(mapDbToProperty),
          testimonials: (testimonialsDb || []).map(t => ({ ...t })),
          media: (mediaDb || []).map(m => ({ ...m })),
          banners: (bannersDb || []).map(mapDbToBanner),
          benefits: (benefitsDb || []).map(b => ({ ...b })),
          gallery: gallery,
          settings: branding,
          sliderSettings: sliderSettings,
          hero: hero
        };

        // Apply theme colors and SEO
        applyThemeColors(currentConfig.settings);
        if (currentConfig.settings) {
          document.title = currentConfig.settings.seoTitle || document.title;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', currentConfig.settings.seoDescription || '');
        }

        setConfig(currentConfig);
        setQuotes(quotesDb || []);
        setContacts((contactsDb || []).map(c => ({
          ...c,
          propertyInterest: c.property_interest
        })));
      } catch (err) {
        console.error("Failed to initialize database configurations, using localStorage backup", err);
        await loadLocalBackup();
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  // Section Save Functions
  const updateHero = async (hero) => {
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'hero', value: hero, updated_at: new Date().toISOString() });
    }
    saveConfig({ ...config, hero });
  };

  const updateAbout = async (aboutData) => {
    const updatedAbout = {
      name: aboutData.name,
      title: aboutData.title,
      experience: aboutData.experience,
      aboutText: aboutData.aboutText,
      photoUrl: aboutData.photoUrl,
      achievements: aboutData.achievements,
      familiesSecured: aboutData.familiesSecured,
      claimsSettled: aboutData.claimsSettled,
      education: config?.education || agentConfig.education,
      licBadge: config?.licBadge || agentConfig.licBadge,
      photos: config?.photos || agentConfig.photos
    };
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'about_settings', value: updatedAbout, updated_at: new Date().toISOString() });
    }
    saveConfig({
      ...config,
      ...updatedAbout
    });
  };

  const updateContact = async (contact) => {
    const updatedContact = {
      ...config.contact,
      phone: contact.phone,
      phoneSecondary: contact.phoneSecondary,
      email: contact.email,
      address: contact.address,
      whatsapp: contact.whatsapp,
      workingHours: contact.workingHours
    };
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'contact_settings', value: updatedContact, updated_at: new Date().toISOString() });
    }
    saveConfig({
      ...config,
      contact: updatedContact
    });
  };

  const updateSocials = async (social) => {
    const updatedContact = {
      ...config.contact,
      social
    };
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'contact_settings', value: updatedContact, updated_at: new Date().toISOString() });
    }
    saveConfig({
      ...config,
      contact: updatedContact
    });
  };

  const updateSettings = async (settings) => {
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'site_settings', value: settings, updated_at: new Date().toISOString() });
    }
    saveConfig({ ...config, settings });
  };

  // CRUD for Plans
  const addPlan = async (plan) => {
    const id = 'plan_' + Date.now();
    const newPlan = { ...plan, id, sort_order: (config?.plans || []).length };
    if (supabase) {
      await supabase.from('plans').insert([newPlan]);
    }
    const plans = [...(config?.plans || []), newPlan];
    saveConfig({ ...config, plans });
  };

  const updatePlan = async (updatedPlan) => {
    if (supabase) {
      await supabase.from('plans').update(updatedPlan).eq('id', updatedPlan.id);
    }
    const plans = (config?.plans || []).map(p => p.id === updatedPlan.id ? updatedPlan : p);
    saveConfig({ ...config, plans });
  };

  const deletePlan = async (id) => {
    if (supabase) {
      await supabase.from('plans').delete().eq('id', id);
    }
    const plans = (config?.plans || []).filter(p => p.id !== id);
    saveConfig({ ...config, plans });
  };

  // CRUD for Benefits
  const addBenefit = async (benefit) => {
    const id = 'b_' + Date.now();
    const newBenefit = { ...benefit, id, sort_order: (config?.benefits || []).length };
    if (supabase) {
      await supabase.from('benefits').insert([newBenefit]);
    }
    const benefits = [...(config?.benefits || []), newBenefit];
    saveConfig({ ...config, benefits });
  };

  const updateBenefit = async (updatedBenefit) => {
    if (supabase) {
      await supabase.from('benefits').update(updatedBenefit).eq('id', updatedBenefit.id);
    }
    const benefits = (config?.benefits || []).map(b => b.id === updatedBenefit.id ? updatedBenefit : b);
    saveConfig({ ...config, benefits });
  };

  const deleteBenefit = async (id) => {
    if (supabase) {
      await supabase.from('benefits').delete().eq('id', id);
    }
    const benefits = (config?.benefits || []).filter(b => b.id !== id);
    saveConfig({ ...config, benefits });
  };

  // CRUD for Testimonials
  const addTestimonial = async (testimonial) => {
    const id = 'test_' + Date.now();
    const newTest = {
      id,
      client_name: testimonial.client_name,
      client_location: testimonial.client_location,
      policy_name: testimonial.policy_name,
      review: testimonial.review,
      image_id: testimonial.image_id,
      hidden: testimonial.hidden || false,
      sort_order: (config?.testimonials || []).length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    if (supabase) {
      await supabase.from('testimonials').insert([newTest]);
    }
    const testimonials = [...(config?.testimonials || []), newTest];
    saveConfig({ ...config, testimonials });
  };

  const updateTestimonial = async (updatedTest) => {
    const toUpdate = {
      client_name: updatedTest.client_name,
      client_location: updatedTest.client_location,
      policy_name: updatedTest.policy_name,
      review: updatedTest.review,
      image_id: updatedTest.image_id,
      hidden: updatedTest.hidden || false,
      updated_at: new Date().toISOString()
    };
    if (supabase) {
      await supabase.from('testimonials').update(toUpdate).eq('id', updatedTest.id);
    }
    const testimonials = (config?.testimonials || []).map(t => t.id === updatedTest.id ? { ...t, ...toUpdate } : t);
    saveConfig({ ...config, testimonials });
  };

  const deleteTestimonial = async (id) => {
    if (supabase) {
      await supabase.from('testimonials').delete().eq('id', id);
    }
    const testimonials = (config?.testimonials || []).filter(t => t.id !== id);
    saveConfig({ ...config, testimonials });
  };

  // CRUD for Media Library
  const addMediaItem = async (file) => {
    const id = 'custom_media_' + Date.now();
    const base64Url = await fileToBase64(file);
    
    // Determine image dimensions
    const dimensions = await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => resolve({ width: 0, height: 0 });
      img.src = base64Url;
    });

    const mediaItem = {
      id,
      file_name: file.name,
      original_name: file.name,
      file_url: base64Url,
      file_size: (file.size / 1024).toFixed(2) + " kB",
      mime_type: file.type,
      width: dimensions.width,
      height: dimensions.height,
      uploaded_at: new Date().toISOString()
    };

    if (supabase) {
      await supabase.from('media').insert([mediaItem]);
    }

    const media = [...(config?.media || []), mediaItem];
    saveConfig({ ...config, media });
    return mediaItem;
  };

  const renameMediaItem = async (id, newName) => {
    if (supabase) {
      await supabase.from('media').update({ file_name: newName }).eq('id', id);
    }
    const media = (config?.media || []).map(m => m.id === id ? { ...m, file_name: newName } : m);
    saveConfig({ ...config, media });
  };

  const deleteMediaItem = async (id) => {
    if (supabase) {
      await supabase.from('media').delete().eq('id', id);
    }
    const media = (config?.media || []).filter(m => m.id !== id);
    saveConfig({ ...config, media });
  };

  // CRUD for Real Estate
  const addRealEstate = async (property) => {
    const id = 'prop_' + Date.now();
    const propertyWithId = { ...property, id, sort_order: (config?.realEstate || []).length };
    if (supabase) {
      const dbProperty = mapPropertyToDb(propertyWithId);
      await supabase.from('real_estate').insert([dbProperty]);
    }
    const realEstate = [...(config?.realEstate || []), propertyWithId];
    saveConfig({ ...config, realEstate });
  };

  const updateRealEstate = async (updatedProp) => {
    if (supabase) {
      const dbProperty = mapPropertyToDb(updatedProp);
      await supabase.from('real_estate').update(dbProperty).eq('id', updatedProp.id);
    }
    const realEstate = (config?.realEstate || []).map(r => r.id === updatedProp.id ? updatedProp : r);
    saveConfig({ ...config, realEstate });
  };

  const deleteRealEstate = async (id) => {
    if (supabase) {
      await supabase.from('real_estate').delete().eq('id', id);
    }
    const realEstate = (config?.realEstate || []).filter(r => r.id !== id);
    saveConfig({ ...config, realEstate });
  };

  // Gallery Management
  const addGalleryImage = async (image) => {
    const newImg = { ...image, id: 'g_' + Date.now() };
    const gallery = [...(config.gallery || []), newImg];
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'gallery_settings', value: gallery, updated_at: new Date().toISOString() });
    }
    saveConfig({ ...config, gallery });
  };

  const deleteGalleryImage = async (id) => {
    const gallery = (config.gallery || []).filter(g => g.id !== id);
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'gallery_settings', value: gallery, updated_at: new Date().toISOString() });
    }
    saveConfig({ ...config, gallery });
  };

  // CRUD for Hero Banners
  const addBanner = async (banner) => {
    const id = 'banner_' + Date.now();
    const bannerWithId = { ...banner, id, sort_order: (config?.banners || []).length };
    if (supabase) {
      const dbBanner = mapBannerToDb(bannerWithId);
      await supabase.from('banners').insert([dbBanner]);
    }
    const banners = [...(config?.banners || []), bannerWithId];
    saveConfig({ ...config, banners });
  };

  const updateBanner = async (updatedBanner) => {
    if (supabase) {
      const dbBanner = mapBannerToDb(updatedBanner);
      await supabase.from('banners').update(dbBanner).eq('id', updatedBanner.id);
    }
    const banners = (config?.banners || []).map(b => b.id === updatedBanner.id ? updatedBanner : b);
    saveConfig({ ...config, banners });
  };

  const deleteBanner = async (id) => {
    if (supabase) {
      await supabase.from('banners').delete().eq('id', id);
    }
    const banners = (config?.banners || []).filter(b => b.id !== id);
    saveConfig({ ...config, banners });
  };

  const updateSliderSettings = async (sliderSettings) => {
    if (supabase) {
      await supabase.from('settings').upsert({ key: 'slider_settings', value: sliderSettings, updated_at: new Date().toISOString() });
    }
    saveConfig({ ...config, sliderSettings });
  };

  // CRUD for Insurance Partners
  const addPartner = async (partner) => {
    const id = 'partner_' + Date.now();
    const partnerWithId = { ...partner, id, sort_order: (config?.partners || []).length };
    if (supabase) {
      const dbPartner = mapPartnerToDb(partnerWithId);
      await supabase.from('partners').insert([dbPartner]);
    }
    const partners = [...(config?.partners || []), partnerWithId];
    saveConfig({ ...config, partners });
  };

  const updatePartner = async (updatedPartner) => {
    if (supabase) {
      const dbPartner = mapPartnerToDb(updatedPartner);
      await supabase.from('partners').update(dbPartner).eq('id', updatedPartner.id);
    }
    const partners = (config?.partners || []).map(p => p.id === updatedPartner.id ? updatedPartner : p);
    saveConfig({ ...config, partners });
  };

  const deletePartner = async (id) => {
    if (supabase) {
      await supabase.from('partners').delete().eq('id', id);
    }
    const partners = (config?.partners || []).filter(p => p.id !== id);
    saveConfig({ ...config, partners });
  };

  const reorderPartners = async (updatedPartners) => {
    saveConfig({ ...config, partners: updatedPartners });
    if (supabase) {
      await Promise.all(updatedPartners.map((p, idx) =>
        supabase.from('partners').update({ sort_order: idx }).eq('id', p.id)
      ));
    }
  };

  const reorderBanners = async (updatedBanners) => {
    saveConfig({ ...config, banners: updatedBanners });
    if (supabase) {
      await Promise.all(updatedBanners.map((b, idx) =>
        supabase.from('banners').update({ sort_order: idx }).eq('id', b.id)
      ));
    }
  };

  const reorderProperties = async (updatedProperties) => {
    saveConfig({ ...config, realEstate: updatedProperties });
    if (supabase) {
      await Promise.all(updatedProperties.map((p, idx) =>
        supabase.from('real_estate').update({ sort_order: idx }).eq('id', p.id)
      ));
    }
  };

  const reorderPlans = async (updatedPlans) => {
    saveConfig({ ...config, plans: updatedPlans });
    if (supabase) {
      await Promise.all(updatedPlans.map((p, idx) =>
        supabase.from('plans').update({ sort_order: idx }).eq('id', p.id)
      ));
    }
  };

  // Quote Submissions Operations
  const submitQuote = async (newLead) => {
    if (supabase) {
      await supabase.from('quotes').insert([newLead]);
    }
    const updated = [newLead, ...quotes];
    setQuotes(updated);
    localStorage.setItem('rrfs_quotes', JSON.stringify(updated));
  };

  const updateQuoteStatus = async (id, newStatus) => {
    if (supabase) {
      await supabase.from('quotes').update({ status: newStatus }).eq('id', id);
    }
    const updated = quotes.map(q => q.id === id ? { ...q, status: newStatus } : q);
    setQuotes(updated);
    localStorage.setItem('rrfs_quotes', JSON.stringify(updated));
  };

  const deleteQuote = async (id) => {
    if (supabase) {
      await supabase.from('quotes').delete().eq('id', id);
    }
    const updated = quotes.filter(q => q.id !== id);
    setQuotes(updated);
    localStorage.setItem('rrfs_quotes', JSON.stringify(updated));
  };

  // Contact Submissions Operations
  const submitContact = async (newContact) => {
    if (supabase) {
      const dbContact = {
        id: newContact.id,
        timestamp: newContact.timestamp,
        name: newContact.name,
        phone: newContact.phone,
        email: newContact.email,
        plan: newContact.plan,
        property_interest: newContact.propertyInterest || newContact.property_interest || '',
        message: newContact.message,
        status: newContact.status
      };
      await supabase.from('contacts').insert([dbContact]);
    }
    const updated = [newContact, ...contacts];
    setContacts(updated);
    localStorage.setItem('rrfs_contact_submissions', JSON.stringify(updated));
  };

  const updateContactStatus = async (id, newStatus) => {
    if (supabase) {
      await supabase.from('contacts').update({ status: newStatus }).eq('id', id);
    }
    const updated = contacts.map(c => c.id === id ? { ...c, status: newStatus } : c);
    setContacts(updated);
    localStorage.setItem('rrfs_contact_submissions', JSON.stringify(updated));
  };

  const deleteContact = async (id) => {
    if (supabase) {
      await supabase.from('contacts').delete().eq('id', id);
    }
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
      addMediaItem,
      renameMediaItem,
      deleteMediaItem,
      addGalleryImage,
      deleteGalleryImage,
      addRealEstate,
      updateRealEstate,
      deleteRealEstate,
      submitQuote,
      updateQuoteStatus,
      deleteQuote,
      submitContact,
      updateContactStatus,
      deleteContact,
      addBanner,
      updateBanner,
      deleteBanner,
      updateSliderSettings,
      addPartner,
      updatePartner,
      deletePartner,
      reorderPartners,
      reorderBanners,
      reorderProperties,
      reorderPlans
    }}>
      {!loading && children}
    </AppContext.Provider>
  );
};
