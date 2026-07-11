import licLogo from '../assets/lic-logo.svg';
import tataLogo from '../assets/tata-logo.svg';
import careLogo from '../assets/care-logo.svg';
import hdfcLogo from '../assets/hdfc-logo.svg';

import careSupremeImg from '../assets/care-supreme-plan.jpg';
import childSecureImg from '../assets/child-secure-plan.jpg';
import licRetirementImg from '../assets/lic-retirement-planning.jpg';
import careTravelImg from '../assets/care-travel-insurance.jpg';
import tataMedicareImg from '../assets/tata-aig-medicare-select.jpg';

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
      title: "LIC Child Secure",
      provider: "LIC",
      tagline: "High coverage child secure plans",
      icon: "Shield",
      description: "Secure your child's education and future with attractive interest rates, low premiums, and 0% GST options.",
      logo: licLogo,
      image: childSecureImg,
      benefits: [
        "Highly attractive interest rates on child policies",
        "Tax benefits under Section 80C on premium payments",
        "Sovereign Guarantee backed by the Government of India",
        "Optional riders: Accidental Death Benefit & Critical Illness",
        "Maturity amount is fully tax-free under Section 10(10D)"
      ],
      eligibility: {
        minAge: "0 years (newborn)",
        maxAge: "12 years",
        term: "10 to 25 years",
        minSumAssured: "₹30 Lacs onwards"
      }
    },
    {
      id: "lic-retirement",
      title: "LIC Retirement Planning",
      provider: "LIC",
      tagline: "Sovereign guaranteed lifetime income options",
      icon: "TrendingUp",
      description: "Secure your retirement with Jeevan Utsav and Protection Plus combinations. Invest for 5 years and get lifetime income benefits.",
      logo: licLogo,
      image: licRetirementImg,
      benefits: [
        "Invest ₹2,00,000 per year for just 5 years",
        "75% Jeevan Utsav + 25% Protection Plus combination",
        "Lifetime tax-free guaranteed returns under Section 10(10D)",
        "Accidental Death & Disability Benefit riders included",
        "Approx. 1.80L to 1.90L annual returns from 5th year onwards"
      ],
      eligibility: {
        minAge: "18 years",
        maxAge: "49 years",
        term: "Lifetime cover",
        minSumAssured: "₹10,00,000"
      }
    },
    {
      id: "tata-general",
      title: "Tata AIG Medicare Select",
      provider: "Tata AIG",
      tagline: "Affordable health protection for everyone",
      icon: "Heart",
      description: "Comprehensive quality health cover with private room options, zero room rent limit, no percentage copay, and pre-post hospital coverage.",
      logo: tataLogo,
      image: tataMedicareImg,
      benefits: [
        "Cashless repairs & medical bills at network hospitals",
        "High sum insured options up to ₹1 crore",
        "Pre & Post hospitalization expenses fully covered",
        "Zero room rent limit - private rooms fully covered",
        "No percentage-based copay for senior citizens"
      ],
      eligibility: {
        minAge: "91 days",
        maxAge: "65 years",
        term: "1 to 3 years",
        minSumAssured: "₹5,00,000 to ₹1 Cr"
      }
    },
    {
      id: "care-health",
      title: "Care Supreme Plan",
      provider: "Care Health",
      tagline: "Up to 600% bonus & 7x coverage growth",
      icon: "Shield",
      description: "One of the most powerful health insurance plans that grows with you and your family. Cashless treatment and unlimited auto-recharge.",
      logo: careLogo,
      image: careSupremeImg,
      benefits: [
        "100% cashless treatment at network hospitals",
        "No co-payment and no upper age limit",
        "Unlimited automatic restore of sum insured",
        "Pre & post hospitalization covered (60 & 180 days)",
        "Wellness discounts up to 30% on renewal"
      ],
      eligibility: {
        minAge: "90 days",
        maxAge: "No limit",
        term: "1 to 3 years",
        minSumAssured: "₹5,00,000 to ₹1 Cr"
      }
    },
    {
      id: "care-travel",
      title: "Care Health Travel Insurance",
      provider: "Care Health",
      tagline: "Travel worry-free with comprehensive coverage",
      icon: "Globe",
      description: "Comprehensive medical and flight delay protection for a safe and worry-free international journey with direct cashless support.",
      logo: careLogo,
      image: careTravelImg,
      benefits: [
        "24x7 emergency medical assistance and evacuation",
        "Worldwide cashless hospitalization network",
        "Flight delay, missed connections, and baggage loss cover",
        "Hassle-free direct claims processing",
        "Optional extensions for adventure sports & multi-trips"
      ],
      eligibility: {
        minAge: "1 day",
        maxAge: "85 years",
        term: "Single trip / Multi-trip annually",
        minSumAssured: "$50,000 to $1,000,000"
      }
    },
    {
      id: "hdfc-ergo",
      title: "HDFC ERGO Health Cover",
      provider: "HDFC ERGO",
      tagline: "2x coverage benefits with zero limits",
      icon: "Coins",
      description: "Comprehensive health protection with double sum insured option, automatic restore benefits, and extensive network of cashless hospitals.",
      logo: hdfcLogo,
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
