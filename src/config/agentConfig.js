const licLogo = '/assets/lic-logo.png';
const tataLogo = '/assets/tata-logo.png';
const hdfcLogo = '/assets/hdfc-logo.png';
const careLogo = '/assets/care-logo.png';
const starLogo = '/assets/star-logo.png';

const careSupremeImg = '/assets/care-supreme-plan.png';
const childSecureImg = '/assets/child-secure-plan.png';
const licRetirementImg = '/assets/lic-retirement-planning.png';
const careTravelImg = '/assets/care-travel-insurance.png';
const tataMedicareImg = '/assets/tata-aig-medicare-select.png';

const hitekParkMain = '/assets/hitek-park-main.jpg';
const hitekParkPrice = '/assets/hitek-park-price.jpg';
const hitekParkMap = '/assets/hitek-park-map.jpg';
const wealthEstateComboImg = '/assets/wealth-estate-combo.jpg';
const trueIkoniaMain = '/assets/true-ikonia-main.jpg';
const trueIkoniaMap = '/assets/true-ikonia-map.jpg';
const trueIkoniaPrice = '/assets/true-ikonia-price.jpg';

const trueHighlandsMain = '/assets/true-highlands-main.jpg';
const trueHighlandsMap = '/assets/true-highlands-map.jpg';
const trueHighlandsQrs = '/assets/true-highlands-qrs.jpg';

const royalHighwayMeadowsMain = '/assets/royal-highway-meadows-main.jpg';
const royalHighwayMeadowsMap = '/assets/royal-highway-meadows-map.jpg';
const royalHighwayMeadowsPrice = '/assets/royal-highway-meadows-price.jpg';
const royalHighwayMeadowsQrs = '/assets/royal-highway-meadows-qrs.jpg';

const testimonialYazmeena = '/assets/testimonial-yazmeena.jpg';
const testimonialNizar = '/assets/testimonial-nizar.jpg';
const testimonialShelina = '/assets/testimonial-shelina.jpg';
const testimonialMuskaan = '/assets/testimonial-muskaan.jpg';
const testimonialAltaf = '/assets/testimonial-altaf.jpg';

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
      category: "Life Insurance",
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
      category: "Life Insurance",
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
      category: "Health Insurance",
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
      category: "Health Insurance",
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
      category: "Travel Insurance",
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
      category: "Health Insurance",
      tagline: "2x coverage benefits with zero limits",
      icon: "Coins",
      description: "Comprehensive health protection with double sum insured option, automatic restore benefits, and extensive network of cashless hospitals.",
      logo: hdfcLogo,
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
      }
    }
  ],
  partners: [
    {
      id: 'partner_lic',
      name: 'LIC (Life Insurance Corporation of India)',
      category: 'Life Insurance',
      logo: licLogo,
      description: "Secure your family's future with trusted life insurance plans backed by LIC. Choose reliable protection, long-term savings, and financial security.",
      buttonText: 'VIEW PLANS',
      buttonLink: '/insurance/lic',
      hidden: false
    },
    {
      id: 'partner_tata_aig',
      name: 'Tata AIG General Insurance',
      category: 'General Insurance',
      logo: tataLogo,
      description: 'Protect your vehicle, home, travel, and business with comprehensive Tata AIG insurance solutions.',
      buttonText: 'VIEW PLANS',
      buttonLink: '/insurance/tata-aig',
      hidden: false
    },
    {
      id: 'partner_hdfc_ergo',
      name: 'HDFC ERGO General Insurance',
      category: 'General Insurance',
      logo: hdfcLogo,
      description: 'Comprehensive health and general insurance plans with cashless benefits and extensive coverage across India.',
      buttonText: 'VIEW PLANS',
      buttonLink: '/insurance/hdfc-ergo',
      hidden: false
    },
    {
      id: 'partner_care_health',
      name: 'Care Health Insurance',
      category: 'Health Insurance',
      logo: careLogo,
      description: 'Get complete health protection with cashless hospitalization, critical illness cover, and family health plans.',
      buttonText: 'VIEW PLANS',
      buttonLink: '/insurance/care-health',
      hidden: false
    },
    {
      id: 'partner_star_health',
      name: 'Star Health Insurance',
      category: 'Health Insurance',
      logo: starLogo,
      description: 'Get cashless treatments and customized health policy options with Star Health, India’s leading standalone health insurance provider.',
      buttonText: 'VIEW PLANS',
      buttonLink: '/health-insurance/plans',
      hidden: false
    }
  ],
  realEstate: [
    {
      id: "bbg-true-highlands-1",
      title: "True Highlands - 1",
      category: "Land Investment",
      location: "Raikal, Shadnagar, Hyderabad",
      type: "Premium Open Plots",
      benefits: "DTCP Approved, RERA Certified, IDBI Bank Loan, ₹1,000/Sq.Yd Bangarutallulaku Offer",
      price: "Starting from ₹12,999 / Sq.Yd*",
      image: trueHighlandsMain,
      priceCardImage: trueHighlandsQrs,
      mapImage: trueHighlandsMap,
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
      investmentBenefits: [
        "Bank Loan Available (IDBI Bank)",
        "₹1,000 Off per Sq.Yard (Bangarutallulaku Offer)",
        "GRT Jewellery Gift Voucher worth ₹15,000 on Every ₹10 Lakhs Purchase",
        "Free Building Plan along with Registration Document",
        "Free 3 Years Society Monitoring & Maintenance"
      ],
      locationAdvantages: [
        "Strategic Location near Hyderabad-Bangalore Highway (NH-44)",
        "Near Upcoming Regional Ring Road (RRR)",
        "Easy Access to Outer Ring Road (ORR)",
        "Proximity to Rajiv Gandhi International Airport",
        "Close to Educational Institutions & Balanagar Industrial Area",
        "Excellent Road Connectivity & High Appreciation Corridor"
      ],
      trustBadges: [
        "India's Largest Plot Developer",
        "BBG - Building Blocks Group",
        "19+ Years of Gated Layout Excellence",
        "100% Clear Documentation & Titles",
        "World Associate Offices in India, USA, UK, UAE, Australia",
        "World Customers in 5 Countries, 7 States & 15 Cities"
      ]
    },
    {
      id: "bbg-royal-highway-meadows",
      title: "Royal Highway Meadows",
      category: "Land Investment",
      location: "Yadadri, East Hyderabad",
      type: "Premium Open Plots",
      benefits: "DTCP Approved, 500-Acre Township, 54+ Resort Club Facilities, IDBI & YES Bank Loans, 2 Grams Gold Coins Offer",
      price: "Starting from ₹9,499 / Sq.Yd*",
      image: royalHighwayMeadowsMain,
      priceCardImage: royalHighwayMeadowsQrs,
      mapImage: royalHighwayMeadowsMap,
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
      investmentBenefits: [
        "Multiple Bank Loan Options (IDBI Bank, Yes Bank, Piramal)",
        "2 Grams of Gold Coins on Registration",
        "₹500 Off per Sq.Yard (Bangarutallulaku Offer)",
        "Free Building Plan along with Registration Document",
        "Free 10 Years Society Monitoring & Maintenance"
      ],
      locationAdvantages: [
        "Close to 2500-Acre Yadadri Laxmi Narasimha Swamy Temple",
        "Near Proposed Temple City Corridor",
        "Within YTDA Limits (Yadagirigutta Development Authority)",
        "Excellent Connectivity near Warangal Highway",
        "Proximity to Proposed Regional Ring Road (RRR)",
        "Close to Aler & Yadagirigutta Tourist Spots"
      ],
      trustBadges: [
        "India's Largest Plot Developer",
        "BBG - Building Blocks Group",
        "17+ Years of Gated Layout Excellence",
        "100% Clear Documentation & Transactions",
        "World Associate Offices in India, USA, UK, UAE, Australia",
        "World Customers in 5 Countries, 7 States & 15 Cities"
      ]
    },
    {
      id: "bbg-hitek-park",
      title: "Hitek Park Balanagar",
      category: "Land Investment",
      location: "Balanagar, Shadnagar, Hyderabad",
      type: "Premium Open Plots",
      benefits: "MUDA Approved, RERA Certified, Nakshatravanam Park, GRT Jewellery Voucher worth ₹15,000",
      price: "Starting from ₹16,999 / Sq.Yd*",
      image: hitekParkMain,
      priceCardImage: hitekParkPrice,
      mapImage: hitekParkMap,
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
      investmentBenefits: [
        "Bank Loan Available (IDBI)",
        "₹15,000 GRT Jewellery Voucher",
        "High Appreciation Potential",
        "Ready for Registration"
      ],
      locationAdvantages: [
        "Near Balanagar Industrial Area",
        "Upcoming Logistics Hub",
        "Railway Station Nearby",
        "Near Pharma SEZ",
        "Excellent Road Connectivity"
      ],
      trustBadges: [
        "India's Largest Plot Developer",
        "300+ Projects Delivered",
        "19+ Years of Excellence",
        "100% Clear Documentation",
        "International Presence"
      ]
    },
    {
      id: "bbg-true-ikonia",
      title: "True Ikonia Sadasivpet",
      category: "Land Investment",
      location: "Sadasivpet, West Hyderabad",
      type: "Premium Open Plots",
      benefits: "DTCP Approved, RERA Certified, BBG Resort-Club Access, ₹1,000/Sq.Yd Bangarutallulaku Offer",
      price: "Starting from ₹11,999 / Sq.Yd*",
      image: trueIkoniaMain,
      priceCardImage: trueIkoniaPrice,
      mapImage: trueIkoniaMap,
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
      investmentBenefits: [
        "Bank Loan Available (IDBI Bank)",
        "Free Building Plan on Registration",
        "Free 3 Years Society Monitoring & Maintenance",
        "Bangarutallulaku Registration Discount Offer"
      ],
      locationAdvantages: [
        "Near 13,000-acre Zaheerabad NIMZ",
        "Near Woxsen School of Business & Educational Hub",
        "Easy Access to Mumbai Highway (NH65)",
        "Proximity to IIT Hyderabad",
        "Near Major IT Hubs (Microsoft, Infosys, TCS)"
      ],
      trustBadges: [
        "India's Largest Plot Developer",
        "740+ Projects Delivered Successfully",
        "19+ Years of Gated Layout Excellence",
        "100% Clear Documentation & Titles",
        "World Associate Offices in 5 Countries"
      ]
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
      investmentBenefits: [
        "Excellent Rental Return Yield",
        "Quick Bank Loan Tie-up Available",
        "Premium Capital Appreciation corridor",
        "Immediate Sale Deed Registration"
      ],
      locationAdvantages: [
        "2 mins to Financial District",
        "Direct Access to Nehru ORR",
        "Top International Schools nearby",
        "World-class Healthcare Close By"
      ],
      trustBadges: [
        "Delivered by Top Luxury Developer",
        "RERA Compliant Development",
        "100% Vastu-Compliant Design",
        "Transparent Legally-Vetted Titles"
      ]
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
      investmentBenefits: [
        "Assured 9.5% Rental ROI Yield",
        "Leased to AAA Grade Multinational Tenants",
        "High Liquidity Capital Appreciation",
        "Flexible Workspace Layout Options"
      ],
      locationAdvantages: [
        "Heart of Hitec City Tech Hub",
        "Walking Distance to Metro Station",
        "Positioned in Elite Commercial Corridor",
        "Surrounded by 5-Star Luxury Hotels"
      ],
      trustBadges: [
        "Vetted Corporate Lease Agreements",
        "Designed by International Architects",
        "High Sustainability LEED Certified",
        "Zero Post-Handover Maintenance Worries"
      ]
    },

  ],
  media: [
    {
      id: "media_yazmeena",
      file_name: "testimonial-yazmeena.jpg",
      original_name: "media__1783938384187.jpg",
      file_url: testimonialYazmeena,
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
      file_url: testimonialNizar,
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
      file_url: testimonialShelina,
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
      file_url: testimonialMuskaan,
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
      file_url: testimonialAltaf,
      file_size: "18.01 kB",
      mime_type: "image/jpeg",
      width: 300,
      height: 300,
      uploaded_at: "2026-07-13T10:28:17.000Z"
    }
  ],
  testimonials: [
    {
      id: "test_yazmeena",
      client_name: "Yazmeena",
      client_location: "Gujarat",
      policy_name: "Child Future Plan & Term Protection",
      review: "Shamsuddin helped us plan our daughter's higher education fund. His transparent advice, patience in explaining riders, and custom calculations gave us complete peace of mind. Highly recommended!",
      image_id: "media_yazmeena",
      created_at: "2026-07-13T10:28:17.000Z",
      updated_at: "2026-07-13T10:28:17.000Z"
    },
    {
      id: "test_nizar",
      client_name: "Nizar Ratnani",
      client_location: "Secunderabad",
      policy_name: "Jeevan Shanti Pension Plan",
      review: "Finding a reliable pension advisor after retirement was crucial. Mr. Shamsuddin Ratnani guided me to the perfect immediate annuity plan. His processing was incredibly fast and professional.",
      image_id: "media_nizar",
      created_at: "2026-07-13T10:28:17.000Z",
      updated_at: "2026-07-13T10:28:17.000Z"
    },
    {
      id: "test_shelina",
      client_name: "Shelina Ratnani",
      client_location: "Hyderabad",
      policy_name: "Endowment Growth & Tax Saver",
      review: "As an IT professional, I wanted to maximize tax saving under 80C and 10(10D) while building a wealth corpus. Shamsuddin's smart visual charts showed exactly how endowment policies perform. Superb execution!",
      image_id: "media_shelina",
      created_at: "2026-07-13T10:28:17.000Z",
      updated_at: "2026-07-13T10:28:17.000Z"
    },
    {
      id: "test_muskaan",
      client_name: "Muskaan",
      client_location: "Hyderabad",
      policy_name: "Eco-Valley Plots & Asset Planning",
      review: "We were looking for high-appreciation land investments. Shamsuddin guided us to Eco-Valley Plots. His analysis of property growth patterns and documentation verification was flawless.",
      image_id: "media_muskaan",
      created_at: "2026-07-13T10:28:17.000Z",
      updated_at: "2026-07-13T10:28:17.000Z"
    },
    {
      id: "test_altaf",
      client_name: "Altaf Hamirani",
      client_location: "Hyderabad",
      policy_name: "Commercial Space Acquisition",
      review: "Shamsuddin helped me diversify my clinic's capital into commercial office spaces. His knowledge of both wealth protection via LIC and wealth creation via real estate is truly unmatched.",
      image_id: "media_altaf",
      created_at: "2026-07-13T10:28:17.000Z",
      updated_at: "2026-07-13T10:28:17.000Z"
    }
  ]
};
