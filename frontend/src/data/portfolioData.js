/**
 * RizMern Portfolio & Instructor Data
 * Evidence-based projects, verified repositories, categorized skills,
 * development timeline, and teaching methodology.
 */

export const INSTRUCTOR_SKILLS = {
  frontend: {
    category: 'Frontend Development',
    icon: '🎨',
    description: 'Component architecture, responsive layouts, and modern reactive client applications.',
    skills: ['HTML', 'CSS', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Bootstrap', 'Tailwind CSS'],
  },
  backend: {
    category: 'Backend Development',
    icon: '⚙️',
    description: 'Server runtime environments, RESTful APIs, and database modeling.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'Authentication & JWT', 'Input Sanitization'],
  },
  mobile: {
    category: 'Mobile Application Development',
    icon: '📱',
    description: 'Cross-platform mobile apps with native capabilities and compiled packages.',
    skills: ['React Native', 'Expo', 'Mobile Navigation', 'API Integration', 'Android APK Build Workflows'],
  },
  tools: {
    category: 'Tools & Cloud Deployment',
    icon: '🚀',
    description: 'Version control, automated pipelines, hosting, and AI developer tooling.',
    skills: ['Git', 'GitHub', 'Vercel', 'Hostinger DNS & Hosting', 'Cloudinary', 'AI-Assisted Dev Tools'],
  },
};

export const DEVELOPER_PROJECTS = [
  {
    id: 'rota-system',
    title: 'Rota System — Workforce Scheduling & Attendance Platform',
    category: 'Web Applications',
    filterTag: 'web',
    tagline: 'Enterprise Shift Scheduling, AI Planning & Mobile App',
    shortDescription:
      'A monorepo platform managing weekly shift rotas, attendance verification, salary ledgers with MongoDB transactions, and speech-to-text AI rota generation.',
    longDescription:
      'Engineered to streamline enterprise workforce operations. Features an Admin web portal with role-based access control (Admin, Checker, Distributor, Operator), PDF & Excel payroll export, an integrated React Native mobile client for employees, and transaction-backed concurrent shift updates.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB Transactions', 'React Native (Expo)', 'Tailwind CSS', 'AI Rota Generator'],
    repoUrl: 'https://github.com/rizwangul-hub/Rota_system',
    isRepoVerified: true,
    liveUrl: null, // Private / internal deployment
    mockupType: 'browser',
    mockupUrl: 'https://admin-rota.vercel.app',
    features: [
      'Weekly rota planner with unique shift constraint validation',
      'AI-assisted shift schedule drafting and voice input review',
      'MongoDB transaction-backed salary and attendance ledgers',
      'Cross-platform React Native client with expo-secure-store',
      'Excel and PDF attendance report generation',
    ],
  },
  {
    id: 'pixxtechnologies',
    title: 'PixxTechnologies — Property & Tenancy Management System',
    category: 'Web Applications',
    filterTag: 'web',
    tagline: 'Multi-Tenant Commercial Property & Rent Platform',
    shortDescription:
      'A comprehensive property and tenant management system with tenancy lifecycle tracking, rent overdue schedules, occupancy analytics, and automated reporting.',
    longDescription:
      'Built to organize complex multi-property portfolios. Tracks properties, units, landlords, and tenancies with real-time financial summaries, recurring expenses, automated invoice generation, Excel data export, and an integrated assistant chatbot modal.',
    technologies: ['React 19', 'Tailwind CSS 4', 'React Router 7', 'Node.js', 'Express', 'MongoDB', 'XLSX Export'],
    repoUrl: 'https://github.com/rizwangul-hub/Pixxtechnologiees',
    isRepoVerified: true,
    liveUrl: null,
    mockupType: 'browser',
    mockupUrl: 'https://pixxtechnologies.local/dashboard',
    features: [
      'Multi-portfolio property, unit, and landlord directory',
      'Occupancy charts, target vs. actual income visualizations',
      'Tenancy contract generation with recurring rent schedules',
      'Excel data export for financial audits and tenant sheets',
      'Clean modular React 19 architecture with Tailwind v4',
    ],
  },
  {
    id: 'expense-tracker',
    title: 'Pixxtech Expense Tracker — Financial Management Platform',
    category: 'Web Applications',
    filterTag: 'web',
    tagline: 'Commercial Expense & Financial Ledger App',
    shortDescription:
      'A dedicated financial ledger application tracking recurring expenditures, category breakdowns, receipt attachments, and approval statuses.',
    longDescription:
      'Provides a granular view of organizational expenditures. Allows administrators to track supplier payments, recurring utility bills, and payment verification with clean filtering by status and date.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    repoUrl: 'https://github.com/rizwangul-hub/Pixxtech-Expense-Tracker-',
    isRepoVerified: true,
    liveUrl: null,
    mockupType: 'browser',
    mockupUrl: 'https://expenses.pixxtech.local',
    features: [
      'Categorized operational and capital expense tracking',
      'Status filtering (Draft, Pending, Approved, Paid)',
      'Supplier details and payment scheduling',
      'Responsive data tables with pagination and sorting',
    ],
  },
  {
    id: 'landlord-vision-mobile',
    title: 'LandlordVision Mobile — Property & Tenancy Mobile App',
    category: 'Mobile Applications',
    filterTag: 'mobile',
    tagline: 'React Native & Expo Mobile Application',
    shortDescription:
      'A native mobile application built with React Native and Expo Router, providing landlords and operators with mobile access to property records and unit statuses.',
    longDescription:
      'Engineered for mobile operations on iOS and Android. Incorporates React Native Paper, native stack and bottom tab navigation, Formik form validation, secure storage, and Android APK compilation pipelines.',
    technologies: ['React Native 0.86', 'Expo 57', 'Expo Router', 'React Navigation', 'React Native Paper', 'Axios'],
    repoUrl: 'https://github.com/rizwangul-hub/Pixxtechnologiees',
    isRepoVerified: true,
    liveUrl: null,
    mockupType: 'mobile',
    mockupUrl: 'Android Package: com.landlordvision.mobile',
    features: [
      'Native bottom tab navigation with stack routing',
      'Offline-safe secure key storage with expo-secure-store',
      'Validated property inspection and unit forms (Formik + Yup)',
      'Direct REST API communication with Express backend',
      'Standalone Android APK build pipeline',
    ],
  },
  {
    id: 'prepforce-ai',
    title: 'SmartPrep / PrepForce AI — Exam Study Platform',
    category: 'AI Projects',
    filterTag: 'ai',
    tagline: 'AI-Assisted Study & Automated Assessment Platform',
    shortDescription:
      'An intelligent assessment platform leveraging AI prompt pipelines to generate domain-specific mock exam questions, evaluate answers, and provide actionable study feedback.',
    longDescription:
      'Designed to demonstrate practical AI engineering. Implements structured JSON prompt formatting, rate-limiting, and error-handling pipelines to turn syllabus outlines into interactive practice sessions.',
    technologies: ['React', 'Node.js', 'Express', 'AI API Integration', 'Prompt Engineering', 'MongoDB'],
    repoUrl: null, // Proprietary / candidate
    isRepoVerified: false,
    liveUrl: null,
    mockupType: 'ai',
    mockupUrl: 'https://prepforce.ai.local',
    features: [
      'Contextual question generation based on technical topics',
      'Automated assessment and constructive feedback hints',
      'Subject-level performance tracking and review queues',
      'Clean decoupled frontend and backend architecture',
    ],
  },
  {
    id: 'bicycle-declaration',
    title: 'Bicycle Operations Platform — Compliance & Declaration System',
    category: 'Web Applications',
    filterTag: 'web',
    tagline: 'Operational Verification & Declaration Management',
    shortDescription:
      'An operational compliance portal facilitating bicycle owner declarations, worker identity verification, and structured shift auditing.',
    longDescription:
      'Built to resolve logistical verification challenges. Captures digital declaration submissions with signature timestamps, validates identity information, and provides operators with tamper-evident audit logs.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Audit Logging'],
    repoUrl: null,
    isRepoVerified: false,
    liveUrl: null,
    mockupType: 'browser',
    mockupUrl: 'https://compliance-portal.local',
    features: [
      'Digital declaration forms with validation rules',
      'Timestamped audit trails for operational compliance',
      'Operator review and approval dashboards',
      'Secure storage of verification records',
    ],
  },
];

export const DEVELOPMENT_JOURNEY = [
  {
    phase: 'Foundation',
    title: 'Modern Web Engineering & React Ecosystem',
    description:
      'Mastered the core building blocks of the web: semantic HTML, responsive CSS systems (Tailwind, Bootstrap), modern JavaScript (ES6+), and TypeScript, advancing into component-driven architecture with React and Vite.',
    skillsHighlighted: ['HTML5 & CSS3', 'JavaScript ES6+', 'TypeScript', 'React', 'Tailwind CSS'],
  },
  {
    phase: 'Full-Stack Expansion',
    title: 'Backend Systems, Databases & Secure REST APIs',
    description:
      'Expanded into scalable backend software engineering with Node.js and Express.js, designing normalized and document-oriented databases with MongoDB and Mongoose, implementing JWT authentication and ACID transactions.',
    skillsHighlighted: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'JWT Security'],
  },
  {
    phase: 'Cross-Platform Mobile',
    title: 'React Native & Android APK Engineering',
    description:
      'Extended JavaScript proficiency to native mobile application development with React Native and Expo, building production-grade mobile UIs, native navigation, and standalone Android APK packages.',
    skillsHighlighted: ['React Native', 'Expo Toolchain', 'Native Navigation', 'Android APK Generation'],
  },
  {
    phase: 'Modern Practice',
    title: 'AI-Assisted Workflows, Production Deployment & RizMern',
    description:
      'Integrated modern AI workflows to accelerate architectural planning, code review, and debugging. Directed the RizMern curriculum to teach practical, architecture-first software engineering to aspiring web and mobile developers.',
    skillsHighlighted: ['AI-Assisted Workflows', 'Vercel Deployment', 'Hostinger DNS & Cloud', 'Mentorship'],
  },
];

export const TEACHING_PHILOSOPHY_STEPS = [
  {
    step: '1',
    title: 'Understand the Purpose',
    desc: 'Never memorize syntax blindly. Learn exactly why a tool exists, what problem it solves, and when to use it.',
  },
  {
    step: '2',
    title: 'Architect the Structure',
    desc: 'Plan folder layouts, component hierarchies, and database schemas before writing code to prevent technical debt.',
  },
  {
    step: '3',
    title: 'Leverage AI Responsibly',
    desc: 'Use AI to generate boilerplate and accelerate development, but always audit, understand, and verify the output.',
  },
  {
    step: '4',
    title: 'Full-Stack Integration',
    desc: 'Connect the pieces end-to-end: client state, REST requests, server controllers, database persistence, and security.',
  },
  {
    step: '5',
    title: 'Debug with Confidence',
    desc: 'Demystify runtime errors, stack traces, and network payloads so you can troubleshoot production issues independently.',
  },
  {
    step: '6',
    title: 'Ship to Production',
    desc: 'Push to GitHub, deploy to Vercel, link custom domains on Hostinger, and compile Android APKs for your portfolio.',
  },
];

export const HOW_TEACHING_WORKS = [
  {
    num: '01',
    title: 'Understand the Requirement',
    detail: 'Deconstruct user stories, technical constraints, and expected outcomes before touching code.',
  },
  {
    num: '02',
    title: 'Identify Technologies & Structure',
    detail: 'Select the right libraries and design the modular folder architecture for scalability.',
  },
  {
    num: '03',
    title: 'Plan Phased Implementation',
    detail: 'Break large projects into manageable sprints to maintain steady momentum and clarity.',
  },
  {
    num: '04',
    title: 'AI-Assisted Scaffolding',
    detail: 'Prompt AI for boilerplate, interfaces, and route stubs with precise technical constraints.',
  },
  {
    num: '05',
    title: 'Rigorous Code Review',
    detail: 'Audit every generated line for logic correctness, security boundaries, and edge cases.',
  },
  {
    num: '06',
    title: 'Local Execution & Testing',
    detail: 'Run dev servers, test client interactions, and verify REST responses against edge inputs.',
  },
  {
    num: '07',
    title: 'Debugging & Refinement',
    detail: 'Isolate root causes using terminal logs and browser dev tools rather than random guessing.',
  },
  {
    num: '08',
    title: 'Deployment & Presentation',
    detail: 'Publish to live cloud hosts with SSL and present your accomplishments cleanly on LinkedIn.',
  },
];
