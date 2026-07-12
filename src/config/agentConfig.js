import licLogo from '../assets/lic-logo.png';
import tataLogo from '../assets/tata-logo.png';
import hdfcLogo from '../assets/hdfc-logo.png';
import careLogo from '../assets/care-logo.png';
import starLogo from '../assets/star-logo.png';

import careSupremeImg from '../assets/care-supreme-plan.png';
import childSecureImg from '../assets/child-secure-plan.png';
import licRetirementImg from '../assets/lic-retirement-planning.png';
import careTravelImg from '../assets/care-travel-insurance.png';
import tataMedicareImg from '../assets/tata-aig-medicare-select.png';

import hitekParkMain from '../assets/hitek-park-main.jpg';
import hitekParkPrice from '../assets/hitek-park-price.jpg';
import hitekParkMap from '../assets/hitek-park-map.jpg';

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
