export const agentConfig = {
  name: "Shamsuddin Ratnani",
  title: "Insurance & Real Estate Consultant",
  education: "M.Com",
  licBadge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
  experience: "18+ Years of Trust & Financial Services",
  familiesSecured: "1,200+",
  claimsSettled: "99.2%",
  achievements: [
    "M.Com Post-Graduate - Financial Planning Expert",
    "Elite Insurance Advisor: LIC, Tata AIG, Care & Star Health",
    "Secured 1,200+ Families & Handled Multi-Crore Portfolios",
    "Strategic Advisor for High-Appreciation Real Estate"
  ],
  aboutText: "With a master's degree in commerce (M.Com) and over 18 years of dedicated service in financial planning, my mission is to help families and businesses secure their future, protect their assets, and build long-term wealth. I specialize in customized life cover, general asset protection, health insurance, and premium property investments. As your certified advisor representing LIC, Tata AIG, Care Health, Star Health, and Real Estate, I deliver trust, reliability, and hassle-free service.",
  photoUrl: "/shamsuddin-suit1.jpg",
  photos: [
    "/shamsuddin-suit1.jpg",
    "/shamsuddin-suit2.jpg",
    "/shamsuddin-office1.jpg",
    "/shamsuddin-office2.jpg",
    "/shamsuddin-event.jpg"
  ],
  contact: {
    phone: "+91 63024 92168",
    phoneSecondary: "+91 98664 92168",
    email: "rrfsshams@gmail.com",
    address: "Flat No. 203, Totam Pradam Apartment, Opposite Sagar Medical, Mahesh Nagar, Nampally, Hyderabad - 500001",
    whatsapp: "916302492168",
    whatsappSecondary: "919866492168",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
    social: {
      instagram: "https://instagram.com/rrfs.shams",
      facebook: "https://www.facebook.com/share/1Gp1psVB5W/",
      linkedin: "https://www.linkedin.com/in/shamsuddin-rrfs-ab9599403?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      youtube: "https://youtube.com/@shamsrrfs?si=yQc9gOmaaACE92uq"
    }
  },
  plans: [
    {
      id: "lic-life",
      title: "LIC Life Protection",
      provider: "LIC",
      tagline: "High coverage protection for your family",
      icon: "Shield",
      description: "Secure your family's financial future with high sum assured life covers that act as a reliable safety net in your absence, backed by sovereign guarantee.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Life_Insurance_Corporation_of_India.svg/512px-Life_Insurance_Corporation_of_India.svg.png",
      benefits: [
        "High life coverage at extremely affordable premium rates",
        "Tax benefits under Section 80C on premium payments",
        "Sovereign Guarantee backed by the Government of India",
        "Optional riders: Accidental Death Benefit & Critical Illness",
        "Maturity amount is fully tax-free under Section 10(10D)"
      ],
      eligibility: {
        minAge: "18 years",
        maxAge: "65 years",
        term: "10 to 40 years",
        minSumAssured: "₹25,00,000"
      }
    },
    {
      id: "tata-general",
      title: "Tata AIG Asset Protection",
      provider: "Tata AIG",
      tagline: "Comprehensive motor, home & travel insurance",
      icon: "TrendingUp",
      description: "Protect your valuable assets (cars, homes, businesses) against accidents, natural calamities, theft, and third-party liabilities with quick claim settlements.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/TATA_AIG_logo.png",
      benefits: [
        "Cashless repairs across nationwide network of authorized garages",
        "No Claim Bonus (NCB) protection & depreciation cover",
        "Quick and paperless claim registration through mobile app",
        "Customizable add-ons: Return to Invoice, Engine Secure",
        "24/7 road-side assistance for auto emergencies"
      ],
      eligibility: {
        minAge: "18 years",
        maxAge: "N/A",
        term: "1 to 5 years",
        minSumAssured: "Based on asset value (IDV)"
      }
    },
    {
      id: "care-health",
      title: "Care Health Mediclaim",
      provider: "Care Health",
      tagline: "Super premium health cover for families",
      icon: "Heart",
      description: "Ensure your savings are safe in medical emergencies. Comprehensive cashless coverage for hospital expenses, day-care procedures, and critical illness care.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Care_health_insurance_logo.png",
      benefits: [
        "Cashless hospitalization at over 22,000+ partner hospitals",
        "100% automatic restore of sum insured upon exhaustion",
        "Annual health check-ups and OPD cover support",
        "Tax savings on premium payments under Section 80D",
        "No upper age limit for enrollment on family plans"
      ],
      eligibility: {
        minAge: "90 days (newborn)",
        maxAge: "No limit",
        term: "1 to 3 years (Renewable for life)",
        minSumAssured: "₹5,00,000 to ₹1 Cr"
      }
    },
    {
      id: "hdfc-ergo",
      title: "HDFC ERGO Health Cover",
      provider: "HDFC ERGO",
      tagline: "2x coverage benefits with zero limits",
      icon: "Coins",
      description: "Comprehensive health protection with double sum insured option, automatic restore benefits, and extensive network of cashless hospitals.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/HDFC-Ergo-logo.png",
      benefits: [
        "Double sum insured restore benefits from day one",
        "Over 12,000+ cashless partner hospitals across India",
        "No sub-limits on room rent, ICU, or day-care procedures",
        "Tax benefits under Section 80D on premium payments",
        "Lifetime renewability with cumulative bonus rewards"
      ],
      eligibility: {
        minAge: "91 days",
        maxAge: "65 years",
        term: "1 to 3 years",
        minSumAssured: "₹5,00,000"
      }
    }
  ],
  realEstate: [
    // Residential: Luxury Villas, Premium Apartments, Gated Community Homes
    {
      id: "res-villas",
      title: "Golden Crest Luxury Villas",
      category: "Residential Property",
      location: "Gachibowli, Hyderabad",
      type: "Luxury Villas",
      benefits: "High rental yield, private garden, premium amenities, smart home automation",
      price: "Starting from ₹3.5 Cr*",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "res-apts",
      title: "Vastu-Compliant Sky Residences",
      category: "Residential Property",
      location: "Jubilee Hills, Hyderabad",
      type: "Premium Apartments",
      benefits: "Heart of the city, premium connectivity, zero wastage layout, sky lounge access",
      price: "Starting from ₹2.8 Cr*",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "res-homes",
      title: "Royal Meadows Gated Homes",
      category: "Residential Property",
      location: "Kondapur, Hyderabad",
      type: "Gated Community Homes",
      benefits: "Eco-friendly township, modular architecture, club house membership, 24/7 security",
      price: "Starting from ₹1.9 Cr*",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
    },
    // Commercial: Office Spaces, Business Parks, Retail Spaces
    {
      id: "comm-office",
      title: "Signature Tech Park Offices",
      category: "Commercial Property",
      location: "Hitec City, Hyderabad",
      type: "Office Spaces",
      benefits: "Pre-leased high yield, prime location, modern energy-efficient infrastructure",
      price: "Starting from ₹1.2 Cr*",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "comm-parks",
      title: "Meridian Business Park",
      category: "Commercial Property",
      location: "Kokapet, Hyderabad",
      type: "Business Parks",
      benefits: "High capital appreciation, Grade-A IT hub, corporate leases, extensive parking",
      price: "Starting from ₹4.5 Cr*",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "comm-retail",
      title: "Avenue Galleria Retail Hub",
      category: "Commercial Property",
      location: "Banjara Hills, Hyderabad",
      type: "Retail Spaces",
      benefits: "High footfall, main double-height storefront, double-digit rental ROI",
      price: "Starting from ₹95 L*",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800"
    },
    // Land Investment: Gated Plots, Gated Community Villa Plots, Farm Land
    {
      id: "land-res",
      title: "Eco-Valley Premium Plots",
      category: "Land Investment",
      location: "Shamshabad Corridor, Hyderabad",
      type: "Residential Plots",
      benefits: "Excellent appreciation potential, scenic views, 100% clear titles, loan approved",
      price: "Starting from ₹75 L*",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "land-comm",
      title: "Aerotropolis Commercial Plots",
      category: "Land Investment",
      location: "Adibatla Aerospace Corridor, Hyderabad",
      type: "Commercial Plots",
      benefits: "Ready-for-construction, zero boundary disputes, ideal for logistics or warehouse",
      price: "Starting from ₹2.1 Cr*",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "land-farm",
      title: "Green Valley Agro Farms",
      category: "Land Investment",
      location: "Shadnagar Outer Limits, Hyderabad",
      type: "Farm Land",
      benefits: "Organic soil certificate, managed farmhouse setup, tax-free agricultural revenue",
      price: "Starting from ₹45 L*",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800"
    }
  ],
  testimonials: [
    {
      name: "Amit & Priya Sharma",
      location: "Hyderabad",
      policy: "Child Future Plan & Term Protection",
      avatarUrl: "/avatar1.webp",
      text: "Shamsuddin helped us plan our daughter's higher education fund. His transparent advice, patience in explaining riders, and custom calculations gave us complete peace of mind. Highly recommended!"
    },
    {
      name: "Col. Vikram Malhotra (Retd.)",
      location: "Secunderabad",
      policy: "Jeevan Shanti Pension Plan",
      avatarUrl: "/avatar2.webp",
      text: "Finding a reliable pension advisor after retirement was crucial. Mr. Shamsuddin Ratnani guided me to the perfect immediate annuity plan. His processing was incredibly fast and professional."
    },
    {
      name: "Sneha Patel",
      location: "Hyderabad",
      policy: "Endowment Growth & Tax Saver",
      avatarUrl: "/avatar3.webp",
      text: "As an IT professional, I wanted to maximize tax saving under 80C and 10(10D) while building a wealth corpus. Shamsuddin's smart visual charts showed exactly how endowment policies perform. Superb execution!"
    },
    {
      name: "Rohan & Meera Sen",
      location: "Hyderabad",
      policy: "Eco-Valley Plots & Asset Planning",
      avatarUrl: "/avatar1.webp",
      text: "We were looking for high-appreciation land investments. Shamsuddin guided us to Eco-Valley Plots. His analysis of property growth patterns and documentation verification was flawless."
    },
    {
      name: "Dr. Sandeep Vardhan",
      location: "Hyderabad",
      policy: "Commercial Space Acquisition",
      avatarUrl: "/avatar3.webp",
      text: "Shamsuddin helped me diversify my clinic's capital into commercial office spaces. His knowledge of both wealth protection via LIC and wealth creation via real estate is truly unmatched."
    }
  ]
};
