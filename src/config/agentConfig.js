export const agentConfig = {
  name: "Rajesh Kumar",
  title: "Senior LIC Insurance & Real Estate Investment Advisor",
  licBadge: "Authorized LIC Agent & Real Estate Advisor (Reg. No: 0482910 / RE-9281)",
  experience: "15+ Years of Trust & Financial Service",
  familiesSecured: "1,200+",
  claimsSettled: "99.2%",
  achievements: [
    "Million Dollar Round Table (MDRT) USA - Life Member",
    "LIC Chairman's Club Member",
    "Best Financial Planner Award 2024",
    "Certified Retirement Planning & Real Estate Specialist"
  ],
  aboutText: "With over 15 years of dedicated service in financial planning and property advisory, my mission is to help families and businesses secure their future, protect their assets, and achieve their long-term financial dreams. I specialize in customized wealth solutions, tax-saving strategies, guaranteed retirement income, and high-appreciation premium property investments. As your authorized LIC and Real Estate representative, I deliver hassle-free services and unbiased advisory.",
  photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
  contact: {
    phone: "+91 98765 43210",
    email: "rajesh.licadvisor@gmail.com",
    address: "Suite 402, Golden Towers, MG Road, Bengaluru, Karnataka - 560001",
    whatsapp: "919876543210",
    workingHours: "Mon - Sat: 9:00 AM - 7:00 PM"
  },
  plans: [
    {
      id: "life",
      title: "Life Insurance",
      tagline: "High coverage protection for your family",
      icon: "Shield",
      description: "Secure your family's financial future with high sum assured life covers that act as a reliable safety net in your absence.",
      benefits: [
        "High life coverage at extremely affordable premium rates",
        "Tax benefits under Section 80C on premium payments",
        "Optional riders: Accidental Death Benefit & Critical Illness",
        "Sovereign Guarantee backed by the Government of India",
        "Flexible premium payment terms (Regular, Limited, Single)"
      ],
      eligibility: {
        minAge: "18 years",
        maxAge: "65 years",
        term: "10 to 40 years",
        minSumAssured: "₹25,00,000"
      }
    },
    {
      id: "child",
      title: "Child Future Plan",
      tagline: "Fund their education & marriage milestones",
      icon: "GraduationCap",
      description: "Create a guaranteed corpus for your children's higher education or startup goals, ensuring their future remains secured even if you are not there.",
      benefits: [
        "Survival payouts matching child's academic milestones",
        "Premium Waiver Benefit rider ensures policy continues if parent passes away",
        "Lump-sum payouts at maturity to support marriage/career costs",
        "Tax benefits on premiums and tax-free maturity sums",
        "Guarantees that their childhood aspirations are achieved"
      ],
      eligibility: {
        minAge: "0 years (newborn)",
        maxAge: "12 years",
        term: "Based on child's age (matures at 21 or 25)",
        minSumAssured: "₹1,00,000"
      }
    },
    {
      id: "retirement",
      title: "Retirement Plan",
      tagline: "Guaranteed lifetime regular income",
      icon: "Coins",
      description: "Ensure a tension-free retirement with plans that offer steady and guaranteed regular annuity payments for life, protecting your independence.",
      benefits: [
        "Guaranteed lifetime annuity rates locked from day one",
        "Options for single life, joint life, or return of purchase price",
        "Choose immediate payouts or deferment periods up to 20 years",
        "Flexible payout frequencies: Monthly, Quarterly, Yearly",
        "Tax benefits under Section 80CCC on investment values"
      ],
      eligibility: {
        minAge: "30 years",
        maxAge: "85 years",
        term: "Immediate or Deferred (1-20 years)",
        minSumAssured: "₹1,50,000 (Annuity dependent)"
      }
    },
    {
      id: "savings",
      title: "Savings Plan",
      tagline: "Wealth growth with life protection",
      icon: "TrendingUp",
      description: "Grow your savings steadily with sovereign security while maintaining life cover. Receives standard LIC reversionary bonuses and additions.",
      benefits: [
        "Dual benefits of wealth accumulation and life cover protection",
        "Maturity amount is fully tax-free under Section 10(10D)",
        "Guaranteed additions and reversionary bonuses boost your returns",
        "Instant loan facility available against policy value after 2 years",
        "Accidental death and disability riders available"
      ],
      eligibility: {
        minAge: "90 days",
        maxAge: "60 years",
        term: "12 to 35 years",
        minSumAssured: "₹1,00,000"
      }
    },
    {
      id: "health",
      title: "Health Protection",
      tagline: "Comprehensive medical & critical illness cover",
      icon: "Heart",
      description: "Protect your family's savings from high medical costs. Get comprehensive coverage for hospital expenses, surgeries, and critical illnesses.",
      benefits: [
        "Cashless hospitalization at network hospitals across India",
        "Lump-sum payouts on diagnosis of major critical illnesses",
        "Daily hospital cash benefit to cover incidental expenses",
        "Tax deductions on premiums paid under Section 80D",
        "No Claim Bonus rewards for healthy years"
      ],
      eligibility: {
        minAge: "18 years",
        maxAge: "65 years",
        term: "1 to 5 years (Renewable for life)",
        minSumAssured: "₹3,00,000"
      }
    }
  ],
  realEstate: [
    {
      id: "res-villas",
      title: "Golden Crest Luxury Villas",
      category: "Residential Properties",
      location: "Whitefield, Bengaluru",
      type: "4 BHK Premium Smart Villas",
      benefits: "High rental yield, private garden, premium amenities, smart home automation",
      price: "Starting from ₹3.5 Cr*",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "comm-office",
      title: "Signature Tech Park Offices",
      category: "Commercial Properties",
      location: "Outer Ring Road, Bengaluru",
      type: "Grade-A Commercial Office Spaces",
      benefits: "Pre-leased high yield, prime location, modern energy-efficient infrastructure",
      price: "Starting from ₹1.2 Cr*",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "land-invest",
      title: "Eco-Valley Premium Plots",
      category: "Land Investment",
      location: "Nandi Hills Corridor, Bengaluru",
      type: "Gated Community Villa Plots",
      benefits: "Excellent appreciation potential, scenic views, 100% clear titles, loan approved",
      price: "Starting from ₹75 L*",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "luxury-apt",
      title: "Vastu-Compliant Sky Residences",
      category: "Residential Properties",
      location: "Indiranagar, Bengaluru",
      type: "3 & 4 BHK Premium Apartments",
      benefits: "Heart of the city, premium connectivity, zero wastage layout, sky lounge access",
      price: "Starting from ₹2.8 Cr*",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
    }
  ],
  testimonials: [
    {
      name: "Amit & Priya Sharma",
      location: "Bengaluru",
      policy: "Child Future Plan & Term Protection",
      avatarUrl: "/avatar1.webp",
      text: "Rajesh helped us plan our daughter's higher education fund. His transparent advice, patience in explaining riders, and custom calculations gave us complete peace of mind. Highly recommended!"
    },
    {
      name: "Col. Vikram Malhotra (Retd.)",
      location: "Pune",
      policy: "Jeevan Shanti Pension Plan",
      avatarUrl: "/avatar2.webp",
      text: "Finding a reliable pension advisor after retirement was crucial. Mr. Rajesh Kumar guided me to the perfect immediate annuity plan. His processing was incredibly fast and professional."
    },
    {
      name: "Sneha Patel",
      location: "Mumbai",
      policy: "Endowment Growth & Tax Saver",
      avatarUrl: "/avatar3.webp",
      text: "As an IT professional, I wanted to maximize tax saving under 80C and 10(10D) while building a wealth corpus. Rajesh's smart visual charts showed exactly how endowment policies perform. Superb execution!"
    },
    {
      name: "Rohan & Meera Sen",
      location: "Bengaluru",
      policy: "Eco-Valley Plots & Asset Planning",
      avatarUrl: "/avatar1.webp",
      text: "We were looking for high-appreciation land investments. Rajesh guided us to Eco-Valley Plots. His analysis of property growth patterns and documentation verification was flawless."
    },
    {
      name: "Dr. Sandeep Vardhan",
      location: "Bengaluru",
      policy: "Commercial Space Acquisition",
      avatarUrl: "/avatar3.webp",
      text: "Rajesh helped me diversify my clinic's capital into commercial office spaces. His knowledge of both wealth protection via LIC and wealth creation via real estate is truly unmatched."
    }
  ]
};
