import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// 1. Resolve environment variables from .env.local or process args
let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

try {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const urlMatch = envContent.match(/VITE_SUPABASE_URL\s*=\s*(.+)/);
    const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.+)/);
    if (urlMatch) supabaseUrl = urlMatch[1].trim().replace(/['"]/g, '');
    if (keyMatch) supabaseAnonKey = keyMatch[1].trim().replace(/['"]/g, '');
  }
} catch (e) {
  console.log("No .env.local file loaded: ", e.message);
}

// Accept command line argument fallbacks
if (process.argv[2]) supabaseUrl = process.argv[2];
if (process.argv[3]) supabaseAnonKey = process.argv[3];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("\x1b[31mError: Supabase URL and Anon Key are required.\x1b[0m");
  console.error("Please either create a .env.local file in your root directory, or pass them as arguments:");
  console.error("\n  node tools/seed.js <supabase_url> <supabase_anon_key>\n");
  process.exit(1);
}

console.log(`Connecting to Supabase at: ${supabaseUrl}`);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DEFAULT_SETTINGS = [
  {
    key: 'about_settings',
    value: {
      name: "Shamsuddin Ratnani",
      title: "Insurance & Real Estate Consultant",
      education: "M.Com",
      licBadge: "Authorized Advisor: LIC, Tata AIG, Care Health, Star Health",
      experience: "18+ Years of Trust & Financial Services",
      familiesSecured: "1,200+",
      claimsSettled: "99.2%",
      aboutText: "With a master's degree in commerce (M.Com) and over 18 years of dedicated service in financial planning, my mission is to help families and businesses secure their future, protect their assets, and build long-term wealth. I specialize in customized life cover, general asset protection, health insurance, and premium property investments. As your certified advisor representing LIC, Tata AIG, Care Health, Star Health, and Real Estate, I deliver trust, reliability, and hassle-free service.",
      photoUrl: "/src/assets/shamsuddin-suit1.jpg",
      photos: [
        "/src/assets/shamsuddin-suit1.jpg",
        "/src/assets/shamsuddin-suit2.jpg",
        "/src/assets/shamsuddin-office1.jpg",
        "/src/assets/shamsuddin-office2.jpg",
        "/src/assets/shamsuddin-event.jpg"
      ]
    }
  },
  {
    key: 'contact_settings',
    value: {
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
    }
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
      { id: 'g1', url: '/src/assets/shamsuddin-suit1.jpg', caption: 'Professional Portrait' },
      { id: 'g2', url: '/src/assets/shamsuddin-suit2.jpg', caption: 'Financial Advisory Session' },
      { id: 'g3', url: '/src/assets/shamsuddin-office1.jpg', caption: 'Office Consultation Room' },
      { id: 'g4', url: '/src/assets/shamsuddin-office2.jpg', caption: 'Client Meeting' },
      { id: 'g5', url: '/src/assets/shamsuddin-event.jpg', caption: 'Award Ceremony' }
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
];

const DEFAULT_BANNERS = [
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
];

const DEFAULT_BENEFITS = [
  { id: 'b1', icon: 'Shield', title: 'Sovereign Guarantee', description: 'All LIC policies are backed by the sovereign guarantee of the Government of India, ensuring absolute safety.', hidden: false, sort_order: 0 },
  { id: 'b2', icon: 'Award', title: '18+ Years Experience', description: 'Serving clients with trust, helping them navigate complex financial options and securing their assets.', hidden: false, sort_order: 1 },
  { id: 'b3', icon: 'Heart', title: '99.2% Claim Settlement', description: 'Hassle-free claims processing with dedicated support when you and your family need it the most.', hidden: false, sort_order: 2 },
  { id: 'b4', icon: 'TrendingUp', title: 'Wealth Appreciation', description: 'Expert guidance on real estate investments in high-growth corridors of Hyderabad to build passive wealth.', hidden: false, sort_order: 3 },
  { id: 'b5', icon: 'Users', title: '1,200+ Secured Families', description: 'A growing community of satisfied clients who trust us for their life, health, and property needs.', hidden: false, sort_order: 4 },
  { id: 'b6', icon: 'Clock', title: '24/7 Dedicated Support', description: 'Direct assistance via WhatsApp, phone, or email to answer any inquiries or help during emergencies.', hidden: false, sort_order: 5 }
];

const DEFAULT_MEDIA = [
  {
    id: "media_yazmeena",
    file_name: "testimonial-yazmeena.jpg",
    original_name: "media__1783938384187.jpg",
    file_url: "/src/assets/testimonial-yazmeena.jpg",
    file_size: "31.93 kB",
    mime_type: "image/jpeg",
    width: 300,
    height: 300,
    uploaded_at: "2026-07-13T10:28:17.000Z"
  },
  {
    id: "media_nizar",
    file_name: "testimonial-nizar.jpg",
    original_name: "media__1783938383668.jpg",
    file_url: "/src/assets/testimonial-nizar.jpg",
    file_size: "40.17 kB",
    mime_type: "image/jpeg",
    width: 300,
    height: 300,
    uploaded_at: "2026-07-13T10:28:17.000Z"
  },
  {
    id: "media_shelina",
    file_name: "testimonial-shelina.jpg",
    original_name: "media__1783938383934.jpg",
    file_url: "/src/assets/testimonial-shelina.jpg",
    file_size: "28.95 kB",
    mime_type: "image/jpeg",
    width: 300,
    height: 300,
    uploaded_at: "2026-07-13T10:28:17.000Z"
  },
  {
    id: "media_muskaan",
    file_name: "testimonial-muskaan.jpg",
    original_name: "media__1783938384168.jpg",
    file_url: "/src/assets/testimonial-muskaan.jpg",
    file_size: "23.56 kB",
    mime_type: "image/jpeg",
    width: 300,
    height: 300,
    uploaded_at: "2026-07-13T10:28:17.000Z"
  },
  {
    id: "media_altaf",
    file_name: "testimonial-altaf.jpg",
    original_name: "media__1783938383486.jpg",
    file_url: "/src/assets/testimonial-altaf.jpg",
    file_size: "18.01 kB",
    mime_type: "image/jpeg",
    width: 300,
    height: 300,
    uploaded_at: "2026-07-13T10:28:17.000Z"
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "test_yazmeena",
    client_name: "Yazmeena",
    client_location: "Gujarat",
    policy_name: "Child Future Plan & Term Protection",
    review: "Shamsuddin helped us plan our daughter's higher education fund. His transparent advice, patience in explaining riders, and custom calculations gave us complete peace of mind. Highly recommended!",
    image_id: "media_yazmeena",
    hidden: false,
    sort_order: 0
  },
  {
    id: "test_nizar",
    client_name: "Nizar Ratnani",
    client_location: "Secunderabad",
    policy_name: "Jeevan Shanti Pension Plan",
    review: "Finding a reliable pension advisor after retirement was crucial. Mr. Shamsuddin Ratnani guided me to the perfect immediate annuity plan. His processing was incredibly fast and professional.",
    image_id: "media_nizar",
    hidden: false,
    sort_order: 1
  },
  {
    id: "test_shelina",
    client_name: "Shelina Ratnani",
    client_location: "Hyderabad",
    policy_name: "Endowment Growth & Tax Saver",
    review: "As an IT professional, I wanted to maximize tax saving under 80C and 10(10D) while building a wealth corpus. Shamsuddin's smart visual charts showed exactly how endowment policies perform. Superb execution!",
    image_id: "media_shelina",
    hidden: false,
    sort_order: 2
  },
  {
    id: "test_muskaan",
    client_name: "Muskaan",
    client_location: "Hyderabad",
    policy_name: "Eco-Valley Plots & Asset Planning",
    review: "We were looking for high-appreciation land investments. Shamsuddin guided us to Eco-Valley Plots. His analysis of property growth patterns and documentation verification was flawless.",
    image_id: "media_muskaan",
    hidden: false,
    sort_order: 3
  },
  {
    id: "test_altaf",
    client_name: "Altaf Hamirani",
    client_location: "Hyderabad",
    policy_name: "Commercial Space Acquisition",
    review: "Shamsuddin helped me diversify my clinic's capital into commercial office spaces. His knowledge of both wealth protection via LIC and wealth creation via real estate is truly unmatched.",
    image_id: "media_altaf",
    hidden: false,
    sort_order: 4
  }
];

const DEFAULT_PARTNERS = [
  {
    id: 'partner_lic',
    name: 'LIC (Life Insurance Corporation of India)',
    category: 'Life Insurance',
    logo: '/src/assets/lic-logo.png',
    description: "Secure your family's future with trusted life insurance plans backed by LIC. Choose reliable protection, long-term savings, and financial security.",
    button_text: 'VIEW PLANS',
    button_link: '/insurance/lic',
    hidden: false,
    sort_order: 0
  },
  {
    id: 'partner_tata_aig',
    name: 'Tata AIG General Insurance',
    category: 'General Insurance',
    logo: '/src/assets/tata-logo.png',
    description: 'Protect your vehicle, home, travel, and business with comprehensive Tata AIG insurance solutions.',
    button_text: 'VIEW PLANS',
    button_link: '/insurance/tata-aig',
    hidden: false,
    sort_order: 1
  },
  {
    id: 'partner_hdfc_ergo',
    name: 'HDFC ERGO General Insurance',
    category: 'General Insurance',
    logo: '/src/assets/hdfc-logo.png',
    description: 'Comprehensive health and general insurance plans with cashless benefits and extensive coverage across India.',
    button_text: 'VIEW PLANS',
    button_link: '/insurance/hdfc-ergo',
    hidden: false,
    sort_order: 2
  },
  {
    id: 'partner_care_health',
    name: 'Care Health Insurance',
    category: 'Health Insurance',
    logo: '/src/assets/care-logo.png',
    description: 'Get complete health protection with cashless hospitalization, critical illness cover, and family health plans.',
    button_text: 'VIEW PLANS',
    button_link: '/insurance/care-health',
    hidden: false,
    sort_order: 3
  },
  {
    id: 'partner_star_health',
    name: 'Star Health Insurance',
    category: 'Health Insurance',
    logo: '/src/assets/star-logo.png',
    description: 'Get cashless treatments and customized health policy options with Star Health, India’s leading standalone health insurance provider.',
    button_text: 'VIEW PLANS',
    button_link: '/health-insurance/plans',
    hidden: false,
    sort_order: 4
  }
];

const DEFAULT_PLANS = [
  {
    id: "lic-life",
    title: "LIC Child Secure",
    provider: "LIC",
    category: "Life Insurance",
    tagline: "High coverage child secure plans",
    icon: "Shield",
    description: "Secure your child's education and future with attractive interest rates, low premiums, and 0% GST options.",
    logo: "/src/assets/lic-logo.png",
    image: "/src/assets/child-secure-plan.png",
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
    },
    hidden: false,
    sort_order: 0
  },
  {
    id: "lic-retirement",
    title: "LIC Retirement Planning",
    provider: "LIC",
    category: "Life Insurance",
    tagline: "Sovereign guaranteed lifetime income options",
    icon: "TrendingUp",
    description: "Secure your retirement with Jeevan Utsav and Protection Plus combinations. Invest for 5 years and get lifetime income benefits.",
    logo: "/src/assets/lic-logo.png",
    image: "/src/assets/lic-retirement-planning.png",
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
    },
    hidden: false,
    sort_order: 1
  },
  {
    id: "tata-general",
    title: "Tata AIG Medicare Select",
    provider: "Tata AIG",
    category: "Health Insurance",
    tagline: "Affordable health protection for everyone",
    icon: "Heart",
    description: "Comprehensive quality health cover with private room options, zero room rent limit, no percentage copay, and pre-post hospital coverage.",
    logo: "/src/assets/tata-logo.png",
    image: "/src/assets/tata-aig-medicare-select.png",
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
    },
    hidden: false,
    sort_order: 2
  },
  {
    id: "care-health",
    title: "Care Supreme Plan",
    provider: "Care Health",
    category: "Health Insurance",
    tagline: "Up to 600% bonus & 7x coverage growth",
    icon: "Shield",
    description: "One of the most powerful health insurance plans that grows with you and your family. Cashless treatment and unlimited auto-recharge.",
    logo: "/src/assets/care-logo.png",
    image: "/src/assets/care-supreme-plan.png",
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
    },
    hidden: false,
    sort_order: 3
  },
  {
    id: "care-travel",
    title: "Care Health Travel Insurance",
    provider: "Care Health",
    category: "Travel Insurance",
    tagline: "Travel worry-free with comprehensive coverage",
    icon: "Globe",
    description: "Comprehensive medical and flight delay protection for a safe and worry-free international journey with direct cashless support.",
    logo: "/src/assets/care-logo.png",
    image: "/src/assets/care-travel-insurance.png",
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
    },
    hidden: false,
    sort_order: 4
  },
  {
    id: "hdfc-ergo",
    title: "HDFC ERGO Health Cover",
    provider: "HDFC ERGO",
    category: "Health Insurance",
    tagline: "2x coverage benefits with zero limits",
    icon: "Coins",
    description: "Comprehensive health protection with double sum insured option, automatic restore benefits, and extensive network of cashless hospitals.",
    logo: "/src/assets/hdfc-logo.png",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
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
    },
    hidden: false,
    sort_order: 5
  }
];

const DEFAULT_PROPERTIES = [
  {
    id: "bbg-true-highlands-1",
    title: "True Highlands - 1",
    category: "Land Investment",
    location: "Raikal, Shadnagar, Hyderabad",
    type: "Premium Open Plots",
    benefits: "DTCP Approved, RERA Certified, IDBI Bank Loan, ₹1,000/Sq.Yd Bangarutallulaku Offer",
    price: "Starting from ₹12,999 / Sq.Yd*",
    image: "/src/assets/true-highlands-main.jpg",
    price_card_image: "/src/assets/true-highlands-qrs.jpg",
    map_image: "/src/assets/true-highlands-map.jpg",
    developer: "BBG (Building Blocks Group)",
    approvals: ["DTCP Approved", "RERA Certified"],
    gift: "GRT Jewellery Voucher worth ₹15,000 on every ₹10 Lakhs Purchase",
    highlights: [
      "DTCP Approved & RERA Certified Gated Layouts",
      "Exclusive Guarded Gated Community",
      "24x7 Multi-Tier Gated Community Security",
      "Wide and Spacious Blacktop (BT) Roads",
      "Electrical Lines with Designer Street Lights",
      "Underground Drainage & Sewage Network",
      "Children's Play Areas, Gardens & Parks",
      "Consistent Water Supply & Rainwater Harvesting",
      "Affordable Properties near NH44, ORR & RRR"
    ],
    investment_benefits: [
      "Bank Loan Available (IDBI Bank)",
      "₹1,000 Off per Sq.Yard (Bangarutallulaku Offer)",
      "GRT Jewellery Gift Voucher worth ₹15,000 on Every ₹10 Lakhs Purchase",
      "Free Building Plan along with Registration Document",
      "Free 3 Years Society Monitoring & Maintenance"
    ],
    location_advantages: [
      "Strategic Location near Hyderabad-Bangalore Highway (NH-44)",
      "Near Upcoming Regional Ring Road (RRR)",
      "Easy Access to Outer Ring Road (ORR)",
      "Proximity to Rajiv Gandhi International Airport",
      "Close to Educational Institutions & Balanagar Industrial Area",
      "Excellent Road Connectivity & High Appreciation Corridor"
    ],
    trust_badges: [
      "India's Largest Plot Developer",
      "BBG - Building Blocks Group",
      "19+ Years of Gated Layout Excellence",
      "100% Clear Documentation & Titles",
      "World Associate Offices in India, USA, UK, UAE, Australia",
      "World Customers in 5 Countries, 7 States & 15 Cities"
    ],
    status: "Available",
    featured: false,
    hidden: false,
    sort_order: 0
  },
  {
    id: "bbg-royal-highway-meadows",
    title: "Royal Highway Meadows",
    category: "Land Investment",
    location: "Yadadri, East Hyderabad",
    type: "Premium Open Plots",
    benefits: "DTCP Approved, 500-Acre Township, 54+ Resort Club Facilities, IDBI & YES Bank Loans, 2 Grams Gold Coins Offer",
    price: "Starting from ₹9,499 / Sq.Yd*",
    image: "/src/assets/royal-highway-meadows-main.jpg",
    price_card_image: "/src/assets/royal-highway-meadows-qrs.jpg",
    map_image: "/src/assets/royal-highway-meadows-map.jpg",
    developer: "BBG (Building Blocks Group)",
    approvals: ["DTCP Approved"],
    gift: "2 Grams of Gold Coins on Registration",
    highlights: [
      "DTCP Approved Layout within 500-Acre Township",
      "Access to World-Class Resort Club (54+ Facilities)",
      "Entrance Arch with Gated Community Security",
      "Wide and Spacious Blacktop (BT) Roads",
      "Electrical Lines with Designer Street Lights",
      "Underground Water Pipelines & Water Tank Facility",
      "Children's Play Areas, Gardens & Avenue Plantation",
      "Rainwater Harvesting and Drainage System",
      "Affordable Properties near Warangal Highway & Rajiv Rahadari"
    ],
    investment_benefits: [
      "Multiple Bank Loan Options (IDBI Bank, Yes Bank, Piramal)",
      "2 Grams of Gold Coins on Registration",
      "₹500 Off per Sq.Yard (Bangarutallulaku Offer)",
      "Free Building Plan along with Registration Document",
      "Free 10 Years Society Monitoring & Maintenance"
    ],
    location_advantages: [
      "Close to 2500-Acre Yadadri Laxmi Narasimha Swamy Temple",
      "Near Proposed Temple City Corridor",
      "Within YTDA Limits (Yadagirigutta Development Authority)",
      "Excellent Connectivity near Warangal Highway",
      "Proximity to Proposed Regional Ring Road (RRR)",
      "Close to Aler & Yadagirigutta Tourist Spots"
    ],
    trust_badges: [
      "India's Largest Plot Developer",
      "BBG - Building Blocks Group",
      "17+ Years of Gated Layout Excellence",
      "100% Clear Documentation & Transactions",
      "World Associate Offices in India, USA, UK, UAE, Australia",
      "World Customers in 5 Countries, 7 States & 15 Cities"
    ],
    status: "Available",
    featured: false,
    hidden: false,
    sort_order: 1
  },
  {
    id: "bbg-hitek-park",
    title: "Hitek Park Balanagar",
    category: "Land Investment",
    location: "Balanagar, Shadnagar, Hyderabad",
    type: "Premium Open Plots",
    benefits: "MUDA Approved, RERA Certified, Nakshatravanam Park, GRT Jewellery Voucher worth ₹15,000",
    price: "Starting from ₹16,999 / Sq.Yd*",
    image: "/src/assets/hitek-park-main.jpg",
    price_card_image: "/src/assets/hitek-park-price.jpg",
    map_image: "/src/assets/hitek-park-map.jpg",
    developer: "BBG (Building Blocks Group)",
    approvals: ["MUDA Approved", "RERA Certified"],
    gift: "GRT Jewellery Voucher worth ₹15,000 on every ₹10 Lakhs Purchase",
    highlights: [
      "Near NH44",
      "Near ORR",
      "Near RRR",
      "Premium Gated Community",
      "Wide BT Roads",
      "Underground Drainage",
      "Water Supply",
      "Rainwater Harvesting",
      "Children's Play Area",
      "Designer Street Lights",
      "24×7 Security",
      "Nakshatravanam Park"
    ],
    investment_benefits: [
      "Bank Loan Available (IDBI)",
      "₹15,000 GRT Jewellery Voucher",
      "High Appreciation Potential",
      "Ready for Registration"
    ],
    location_advantages: [
      "Near Balanagar Industrial Area",
      "Upcoming Logistics Hub",
      "Railway Station Nearby",
      "Near Pharma SEZ",
      "Excellent Road Connectivity"
    ],
    trust_badges: [
      "India's Largest Plot Developer",
      "300+ Projects Delivered",
      "19+ Years of Excellence",
      "100% Clear Documentation",
      "International Presence"
    ],
    status: "Available",
    featured: false,
    hidden: false,
    sort_order: 2
  },
  {
    id: "bbg-true-ikonia",
    title: "True Ikonia Sadasivpet",
    category: "Land Investment",
    location: "Sadasivpet, West Hyderabad",
    type: "Premium Open Plots",
    benefits: "DTCP Approved, RERA Certified, BBG Resort-Club Access, ₹1,000/Sq.Yd Bangarutallulaku Offer",
    price: "Starting from ₹11,999 / Sq.Yd*",
    image: "/src/assets/true-ikonia-main.jpg",
    price_card_image: "/src/assets/true-ikonia-price.jpg",
    map_image: "/src/assets/true-ikonia-map.jpg",
    developer: "BBG (Building Blocks Group)",
    approvals: ["DTCP Approved", "RERA Certified"],
    gift: "₹1,000 Off per Sq.Yard (Bangarutallulaku Offer)",
    highlights: [
      "DTCP Approved & RERA Certified gated layouts",
      "Exclusive BBG Resort-Club access for owners",
      "24×7 multi-tier gated community security",
      "Wide and spacious blacktop (BT) roads",
      "Underground drainage & sewage network",
      "Avenue plantation & designer street lights",
      "Consistent water supply & electricity lines",
      "Rainwater harvesting & eco-drainage pits",
      "Children's play areas, gardens & parks",
      "Ready-to-build plots with boundary markers"
    ],
    investment_benefits: [
      "Bank Loan Available (IDBI Bank)",
      "Free Building Plan on Registration",
      "Free 3 Years Society Monitoring & Maintenance",
      "Bangarutallulaku Registration Discount Offer"
    ],
    location_advantages: [
      "Near 13,000-acre Zaheerabad NIMZ",
      "Near Woxsen School of Business & Educational Hub",
      "Easy Access to Mumbai Highway (NH65)",
      "Proximity to IIT Hyderabad",
      "Near Major IT Hubs (Microsoft, Infosys, TCS)"
    ],
    trust_badges: [
      "India's Largest Plot Developer",
      "740+ Projects Delivered Successfully",
      "19+ Years of Gated Layout Excellence",
      "100% Clear Documentation & Titles",
      "World Associate Offices in 5 Countries"
    ],
    status: "Available",
    featured: false,
    hidden: false,
    sort_order: 3
  },
  {
    id: "res-villas",
    title: "Golden Crest Luxury Villas",
    category: "Residential Property",
    location: "Gachibowli, Hyderabad",
    type: "Luxury Villas",
    benefits: "High rental yield, private garden, premium amenities, smart home automation.",
    price: "Starting from ₹3.5 Cr*",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
    developer: "Crest Group Builders",
    approvals: ["HMDA Approved", "RERA Certified"],
    highlights: [
      "Premium Private Swimming Pool",
      "Smart Home Automation Enabled",
      "24/7 Multi-Tier Gate Security",
      "Ultra-Modern Modular Clubhouse",
      "Lush Landscaped Private Gardens"
    ],
    investment_benefits: [
      "Golden investment returns corridor",
      "HMDA Approved development safety"
    ],
    location_advantages: [
      "Premium connectivity via Nehru ORR",
      "Hitec City and Gachibowli IT corridor minutes away"
    ],
    trust_badges: [
      "100% HMDA and RERA compliant",
      "Golden class villa layout development"
    ],
    status: "Available",
    featured: false,
    hidden: false,
    sort_order: 4
  },
  {
    id: "comm-office",
    title: "Signature Tech Park Offices",
    category: "Commercial Property",
    location: "Hitec City, Hyderabad",
    type: "Office Spaces",
    benefits: "Pre-leased high yield, prime location, modern energy-efficient infrastructure.",
    price: "Starting from ₹1.2 Cr*",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    developer: "Signature Hub Infrastructure",
    approvals: ["GHMC Approved", "RERA Certified"],
    highlights: [
      "Grade-A Corporate IT Spaces",
      "Double Height Grand Reception Lobby",
      "High-Speed Passenger Elevators",
      "100% Power Backup & Central AC",
      "Multi-Level Automated Parking"
    ],
    investment_benefits: [
      "Assured 9.5% Rental ROI Yield",
      "Leased to AAA Grade Multinational Tenants",
      "High Liquidity Capital Appreciation",
      "Flexible Workspace Layout Options"
    ],
    location_advantages: [
      "Heart of Hitec City Tech Hub",
      "Walking Distance to Metro Station",
      "Positioned in Elite Commercial Corridor",
      "Surrounded by 5-Star Luxury Hotels"
    ],
    trust_badges: [
      "Vetted Corporate Lease Agreements",
      "Designed by International Architects",
      "High Sustainability LEED Certified",
      "Zero Post-Handover Maintenance Worries"
    ],
    status: "Available",
    featured: false,
    hidden: false,
    sort_order: 5
  }
];

const DEFAULT_QUOTES = [
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

const DEFAULT_CONTACTS = [
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

const seedData = async () => {
  try {
    console.log("Seeding Database Tables using UPSERT (Duplicate Protection Enabled)...");

    // 1. Settings
    console.log("-> Seeding 'settings'...");
    const { error: settingsErr } = await supabase.from('settings').upsert(DEFAULT_SETTINGS);
    if (settingsErr) console.error("Error seeding settings: ", settingsErr);

    // 2. Banners
    console.log("-> Seeding 'banners'...");
    const { error: bannersErr } = await supabase.from('banners').upsert(DEFAULT_BANNERS);
    if (bannersErr) console.error("Error seeding banners: ", bannersErr);

    // 3. Benefits
    console.log("-> Seeding 'benefits'...");
    const { error: benefitsErr } = await supabase.from('benefits').upsert(DEFAULT_BENEFITS);
    if (benefitsErr) console.error("Error seeding benefits: ", benefitsErr);

    // 4. Media
    console.log("-> Seeding 'media'...");
    const { error: mediaErr } = await supabase.from('media').upsert(DEFAULT_MEDIA);
    if (mediaErr) console.error("Error seeding media: ", mediaErr);

    // 5. Testimonials
    console.log("-> Seeding 'testimonials'...");
    const { error: testimonialsErr } = await supabase.from('testimonials').upsert(DEFAULT_TESTIMONIALS);
    if (testimonialsErr) console.error("Error seeding testimonials: ", testimonialsErr);

    // 6. Partners
    console.log("-> Seeding 'partners'...");
    const { error: partnersErr } = await supabase.from('partners').upsert(DEFAULT_PARTNERS);
    if (partnersErr) console.error("Error seeding partners: ", partnersErr);

    // 7. Plans
    console.log("-> Seeding 'plans'...");
    const { error: plansErr } = await supabase.from('plans').upsert(DEFAULT_PLANS);
    if (plansErr) console.error("Error seeding plans: ", plansErr);

    // 8. Real Estate
    console.log("-> Seeding 'real_estate'...");
    const { error: propertiesErr } = await supabase.from('real_estate').upsert(DEFAULT_PROPERTIES);
    if (propertiesErr) console.error("Error seeding real estate: ", propertiesErr);

    // 9. Quotes
    console.log("-> Seeding 'quotes'...");
    const { error: quotesErr } = await supabase.from('quotes').upsert(DEFAULT_QUOTES);
    if (quotesErr) console.error("Error seeding quotes: ", quotesErr);

    // 10. Contacts
    console.log("-> Seeding 'contacts'...");
    const { error: contactsErr } = await supabase.from('contacts').upsert(DEFAULT_CONTACTS);
    if (contactsErr) console.error("Error seeding contacts: ", contactsErr);

    console.log("\x1b[32m✔ Seeding completed successfully!\x1b[0m");
  } catch (err) {
    console.error("Critical error during seeding: ", err);
  }
};

seedData();
