export const services = [
  {
    slug: 'web-development',
    name: 'Web Development',
    badge: 'MERN & Full-Stack Web',
    tagline: 'High-performance, modern websites and web applications engineered to convert visitors into clients.',
    description: 'We develop custom, ultra-fast, responsive web applications using the MERN stack (MongoDB, Express.js, React, Node.js), Next.js, and modern cloud architectures. From business websites to complex web portals and e-commerce stores, we deliver search-engine-optimized, scalable platforms.',
    features: [
      'Custom MERN Stack Web Applications',
      'High-Conversion Corporate & Business Websites',
      'E-Commerce Online Stores with Secure Payment Gateways',
      'Client Portals, SaaS Platforms & Custom Admin Dashboards',
      'Technical SEO Optimization & Lightning-Fast Loading Speed',
      'Full API Integration, Cloud Deployment & Database Management',
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Next.js', 'Tailwind CSS', 'REST APIs', 'Vercel / Cloud'],
    idealFor: 'Enterprises, startups, retail businesses, and professionals in Lahore and globally needing a powerful online presence.',
  },
  {
    slug: 'app-development',
    name: 'Mobile App Development',
    badge: 'iOS & Android (React Native)',
    tagline: 'Interactive, reliable mobile applications connecting your business and customers on both iOS and Android.',
    description: 'We build cross-platform mobile apps using React Native. Your customers and staff enjoy smooth performance, beautiful modern user interfaces, push notifications, offline data access, and instant order tracking—with a single cost-effective codebase ready for the Google Play Store and Apple App Store.',
    features: [
      'Cross-Platform iOS & Android Apps from One Codebase',
      'Customer Ordering, Delivery & Table Booking Apps',
      'Real-Time Push Notifications & Live GPS Order Tracking',
      'Offline-First Data Storage & Fast Cloud Synchronization',
      'Payment Gateway Integration (JazzCash, EasyPaisa, Stripe, Cards)',
      'Direct Standalone Android APK Compilation & Store Deployment',
    ],
    techStack: ['React Native', 'Expo', 'Node.js', 'Firebase', 'Redux Toolkit', 'Google Maps API', 'Mobile UI/UX'],
    idealFor: 'Restaurants, pizza shops, retail stores, delivery services, and businesses wanting an engaging mobile presence.',
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design & Branding',
    badge: 'Visual Identity & UI/UX',
    tagline: 'Distinctive brand identity, logos, and marketing visuals that give your company an unforgettable look.',
    description: 'Great software requires exceptional visual design. Our creative design team creates modern logo identities, complete brand style guides, social media marketing kits, restaurant food menus, promotional flyers, and intuitive UI/UX prototypes that build instant customer trust.',
    features: [
      'Professional Brand Identity & Custom Vector Logo Design',
      'Modern UI/UX Design for Web and Mobile Apps (Figma)',
      'Social Media Marketing Creatives, Banners & Ad Kits',
      'Eye-Catching Restaurant Food Menus, Flyers & Standees',
      'Corporate Stationery (Business Cards, Letterheads, Envelopes)',
      'Product Packaging, Labels & Digital Marketing Assets',
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Brand Style Guides', 'Vector Graphics'],
    idealFor: 'New ventures launching their brand, restaurants updating menus, and companies needing a visual upgrade.',
  },
  {
    slug: 'business-software',
    name: 'Custom Business Software',
    badge: 'Enterprise Automation',
    tagline: 'Eliminate manual paperwork, chaos, and lost profits with software built around your exact daily workflow.',
    description: 'Off-the-shelf software is often bloated, confusing, and filled with features you will never use. RizMern designs and builds custom business software tailored specifically to your daily operations—from property dealer management to restaurant billing, pizza delivery, and expense tracking.',
    features: [
      'Property Dealer Real Estate Management CRM',
      'Restaurant POS, Kitchen Order Tickets (KOT) & Table Billing',
      'Pizza Shop Order Taking, Toppings Customizer & Delivery POS',
      'Daily Business Expense Tracker & Multi-Account Cash Ledger',
      'Inventory, Stock Control & Supplier Purchase Orders',
      'Multi-User Role Permissions, Audit Trails & Daily PDF Reports',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'Thermal Receipt Printing', 'Cloud Backups', 'Role-Based Access'],
    idealFor: 'Property dealers, restaurants, pizza takeaways, retail shops, and businesses in Bahria Town, Lahore, and beyond.',
  },
]

export const solutions = [
  {
    id: 'property-dealer',
    name: 'Property Dealer & Real Estate Software',
    badge: 'Real Estate CRM',
    tagline: 'Manage property listings, buyers, sellers, installments, and deals in one central workspace.',
    description: 'Designed specifically for real estate agencies, property dealers, and builders in Bahria Town, DHA, and throughout Lahore. Track all plots, homes, and commercial units without losing client inquiries in notebook pages or WhatsApp chats.',
    features: [
      'Plot, House, Commercial & File Inventory Management',
      'Buyer & Seller Requirements Matching Engine',
      'Automated WhatsApp Follow-Up Reminders & Alerts',
      'Installment Schedules, Due Dates & Payment Tracking',
      'Commission Calculations & Deal Settlement Ledgers',
      'Printable Token Receipts, Agreements & Client Dossiers',
    ],
    tags: 'Plots / Houses / Installments / Client CRM',
    highlights: 'Tested and tailored for Bahria Town Lahore & DHA property markets.',
  },
  {
    id: 'pizza-shop',
    name: 'Pizza Shop Management & POS Software',
    badge: 'Pizza POS & Delivery',
    tagline: 'Fast touch POS with custom crust, size, and toppings builder plus delivery dispatching.',
    description: 'A lightning-fast, easy-to-use counter POS designed for pizzerias and fast food takeaways. Handle busy rush hours, customized pizza toppings, combo deals, takeaway collections, and home delivery rider tracking with zero delays.',
    features: [
      'Visual Pizza Size (Small, Med, Large, X-Large) & Crust Customizer',
      'Interactive Extra Toppings, Sauces & Add-on Ingredient Engine',
      'Deal & Combo Meal Builder with Flexible Pricing',
      'Takeaway, Dine-In & Home Delivery Dispatch Tracking',
      'Delivery Rider Assignment & Cash-on-Delivery (COD) Reconciliation',
      'Instant Kitchen Order Ticket (KOT) & Thermal Receipt Printing (80mm/58mm)',
      'Daily Sales Revenue, Best-Seller Pizza Analytics & Stock Usage',
    ],
    tags: 'Custom Toppings / Delivery Rider / KOT Printing / Sales',
    highlights: 'Keeps your kitchen running smoothly during peak dinner rush.',
  },
  {
    id: 'restaurant',
    name: 'Restaurant Management System & POS',
    badge: 'Restaurant Billing & KOT',
    tagline: 'Table layout, waiter ordering, kitchen display, and swift billing in one integrated platform.',
    description: 'Complete restaurant management software for dine-in restaurants, cafes, and bakeries. Connect your dining hall, kitchen, and cashier counter into a harmonious, fast-moving system that pleases customers and protects your margins.',
    features: [
      'Interactive Visual Floor Plan & Dine-In Table Management',
      'Digital Waiter Tablet Ordering & Table Transfer Support',
      'Direct Kitchen Order Tickets (KOT) Printed Straight to the Chef',
      'Split Billing, Discount Codes, Service Charges & Tax Calculations',
      'Recipe-Based Raw Ingredient Depletion & Stock Alerts',
      'End-of-Shift Cashier Drawer Audits & Detailed Daily Reports',
    ],
    tags: 'Table Layout / Kitchen KOT / Split Bills / Inventory',
    highlights: 'Eliminates order mistakes and speeds up customer table turnover.',
  },
  {
    id: 'expense-tracker',
    name: 'Business Expense Tracker & Accounting',
    badge: 'Finance & Cash Flow',
    tagline: 'Track every rupee coming in and going out with category breakdowns and profit-and-loss clarity.',
    description: 'Take complete control over your business cash flow. Record daily operational expenses, manage supplier and vendor payables, monitor cash drawer and bank balances, and generate clear profit-and-loss reports in seconds.',
    features: [
      'Fast Daily Income and Expense Entry with Bill/Receipt Photos',
      'Custom Expense Categories (Rent, Staff Wages, Utilities, Stock, Marketing)',
      'Multi-Account Balance Tracking (Cash in Hand, Bank, JazzCash, EasyPaisa)',
      'Supplier / Vendor Payable Ledgers with Due-Date Reminders',
      'Visual Profit & Loss (P&L) Charts & Monthly Expense Trends',
      'One-Click Export to Excel & Clean Printable PDF Summaries',
    ],
    tags: 'Income & Expense / Vendor Ledgers / P&L Reports / Multi-Account',
    highlights: 'Stop profit leakages and know your exact financial health every day.',
  },
]

export const companyHighlights = [
  {
    title: 'Based in Bahria Town, Lahore',
    description: 'We are a local software company rooted in Bahria Town, Lahore. Meet us in person or communicate over WhatsApp with zero time-zone or language barriers.',
    icon: 'map-pin',
  },
  {
    title: 'Custom-Engineered Software',
    description: 'We do not sell rigid, one-size-fits-all software. Every web app, mobile app, and business software is custom-crafted around your specific company workflows.',
    icon: 'code-2',
  },
  {
    title: 'Full-Stack & Design Together',
    description: 'We combine graphic design, branding, frontend user experience, backend APIs, and cloud database architecture under one cohesive roof.',
    icon: 'layers',
  },
  {
    title: 'Hands-On Staff Training',
    description: 'We provide full training for you and your staff, cashiers, and managers so everyone can use the software effortlessly from day one.',
    icon: 'users',
  },
  {
    title: 'Affordable, Transparent Pricing',
    description: 'No hidden ongoing subscription traps. We offer fair, milestone-based pricing tailored to the exact requirements of your business.',
    icon: 'shield-check',
  },
  {
    title: 'Dedicated Ongoing Support',
    description: 'Your partnership with RizMern does not end at launch. We provide ongoing maintenance, feature updates, and rapid technical assistance.',
    icon: 'headphones',
  },
]

export const companyProcess = [
  {
    step: '01',
    name: 'Discovery & Consultation',
    description: 'We discuss your business model, daily pain points, key user roles, and specific goals to establish a clear project blueprint.',
  },
  {
    step: '02',
    name: 'UI/UX & Graphic Design',
    description: 'We create intuitive screen layouts, brand identity elements, and interactive prototypes for your review before writing code.',
  },
  {
    step: '03',
    name: 'Full-Stack Development',
    description: 'We build your system using clean, robust MERN stack and React Native code with secure databases and optimized performance.',
  },
  {
    step: '04',
    name: 'Testing, Deployment & Training',
    description: 'We thoroughly test every workflow, deploy your software live, connect receipt printers/hardware, and train your staff.',
  },
]

export const companyFaqs = [
  [
    'Where is RizMern software company located?',
    'RizMern is located in Bahria Town, Lahore, Punjab, Pakistan. We serve businesses across Bahria Town (Sectors A through F), DHA, Gulberg, and the wider Lahore area, as well as clients across Pakistan and overseas.',
  ],
  [
    'What business software do you develop?',
    'We specialize in purpose-built software including Property Dealer & Real Estate CRMs, Pizza Shop Delivery & POS Systems, Restaurant Management & Table Billing Software, Business Expense & Cash Flow Trackers, Retail Inventories, and custom MERN web platforms.',
  ],
  [
    'Can we meet in person in Bahria Town, Lahore to discuss our project?',
    'Yes! We welcome local business owners for in-person meetings in Bahria Town, Lahore. You can contact us via WhatsApp at +92 317 9500901 or email mernstack2426@gmail.com to schedule a convenient time.',
  ],
  [
    'What services does RizMern provide?',
    'RizMern provides 4 core services: (1) Custom Web Development (MERN stack, business websites, e-commerce), (2) Mobile App Development (React Native iOS and Android apps), (3) Graphic Designing (logos, brand identity, restaurant menus, UI/UX, marketing creatives), and (4) Custom Business Software.',
  ],
  [
    'How much does custom business software or a website cost?',
    'Pricing depends on your specific feature requirements, integrations, and project scope. Because we build custom solutions without bloated licensing, our packages are competitive and cost-effective. Contact us for a free, transparent project quote.',
  ],
  [
    'How long does it take to develop a business software or website?',
    'A business website or graphic branding package typically takes 5 to 10 days. A specialized business software (such as a Property Dealer CRM, Restaurant POS, or Pizza Shop system) typically takes 2 to 4 weeks depending on customized workflows.',
  ],
  [
    'Will you train our staff on how to use the software?',
    'Yes, absolutely. We provide complete hands-on training for your cashiers, managers, and administrative team, along with step-by-step video guides and ongoing WhatsApp technical support.',
  ],
  [
    'Do you also provide software training courses?',
    'Yes! Through RizMern Academy, our engineering team teaches a premier 3-month MERN Stack and React Native Mobile App Development course with AI-assisted workflows. You can explore our course curriculum and join a free demo class on our website.',
  ],
]
