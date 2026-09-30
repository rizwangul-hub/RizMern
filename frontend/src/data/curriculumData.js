/**
 * RizMern Course & Curriculum Data
 * Cleanly structured, factual data for the three-month intensive curriculum,
 * interactive roadmap, AI-assisted development methodology, project blueprints,
 * deployment pipeline, and FAQs.
 */

export const COURSE_INFO = {
  eyebrow: 'RIZMERN • 3-MONTH ONLINE DEVELOPMENT COURSE',
  title: 'Learn Modern Web & App Development by Building Real Projects',
  subtitle:
    'Build modern full-stack websites and React Native applications while learning how frontend, backend, databases, APIs, deployment, GitHub and AI-assisted development work together.',
  duration: 'Three Months',
  delivery: 'Online Classes',
  instructor: 'Rizwan Ullah',
  instructorRole: 'MERN Stack Web Developer & React Native App Developer',
};

export const TECH_STACK_SUMMARY = [
  'React',
  'Node.js',
  'Express.js',
  'MongoDB',
  'React Native',
  'TypeScript',
  'Tailwind CSS',
  'REST APIs',
  'Git & GitHub',
  'Vercel',
  'AI Engineering',
];

export const TECH_WALL = [
  {
    category: 'Frontend',
    icon: '🎨',
    items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Middleware', 'JWT Authentication', 'Input Validation'],
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: ['MongoDB', 'Mongoose ODM', 'CRUD Operations', 'Document Modeling', 'Indexing'],
  },
  {
    category: 'Mobile',
    icon: '📱',
    items: ['React Native', 'Expo', 'Mobile Navigation', 'API Integration', 'Android APK Generation'],
  },
  {
    category: 'Development',
    icon: '💻',
    items: ['Git', 'GitHub', 'VS Code', 'npm', 'AI Coding Assistants', 'Chrome DevTools'],
  },
  {
    category: 'Deployment',
    icon: '🚀',
    items: ['Vercel Edge Network', 'Cloud Database Clusters', 'Hostinger DNS', 'Custom Domains', 'SSL/TLS'],
  },
];

export const COURSE_OUTCOMES = [
  {
    id: 1,
    title: 'Building Responsive Interfaces',
    desc: 'Crafting fluid, mobile-first websites from scratch using semantic HTML, Flexbox, Grid, Tailwind CSS, and React.',
  },
  {
    id: 2,
    title: 'Component-Driven React Architecture',
    desc: 'Structuring modular web applications with state, props, custom hooks, client routing, and clean folder structures.',
  },
  {
    id: 3,
    title: 'Designing Secure REST APIs',
    desc: 'Building server routes, controllers, request validators, and error-handling middleware with Node.js and Express.',
  },
  {
    id: 4,
    title: 'Working with MongoDB',
    desc: 'Modeling data schemas with Mongoose, performing transactional CRUD operations, and managing cloud database clusters.',
  },
  {
    id: 5,
    title: 'Connecting Frontend & Backend',
    desc: 'Managing full-stack data flows, handling loading and error states, and consuming JSON payloads asynchronously.',
  },
  {
    id: 6,
    title: 'Authentication & Security Best Practices',
    desc: 'Implementing secure user login flows, password hashing with bcrypt, JWT authorization tokens, and protecting secrets.',
  },
  {
    id: 7,
    title: 'Cross-Platform React Native Mobile Apps',
    desc: 'Developing native mobile screens, stack navigation, touch gestures, and integrating with Express REST APIs.',
  },
  {
    id: 8,
    title: 'Android Build & APK Generation',
    desc: 'Understanding mobile configuration (app.json) and compiling native Android APK packages for direct device testing.',
  },
  {
    id: 9,
    title: 'Constructive AI-Assisted Workflows',
    desc: 'Using AI tools for architectural planning, code scaffolding, debugging, and code reviews while understanding every line.',
  },
  {
    id: 10,
    title: 'Production Deployment & Cloud Hosting',
    desc: 'Pushing clean commits to GitHub, deploying to Vercel, and configuring custom domain DNS records and SSL certificates.',
  },
];

export const TARGET_AUDIENCE = [
  {
    id: 1,
    icon: '🚀',
    title: 'Beginners & Career Starters',
    description:
      'People stepping into software development who want a clear, step-by-step foundation without confusion or fragmented tutorials.',
  },
  {
    id: 2,
    icon: '🎓',
    title: 'University & College Students',
    description:
      'Students looking to bridge the gap between academic theory and practical, production-ready engineering skills.',
  },
  {
    id: 3,
    icon: '🎨',
    title: 'Existing Frontend Developers',
    description:
      'Developers who know basic HTML/CSS/JS and want to expand into backend APIs, MongoDB, and full-stack MERN engineering.',
  },
  {
    id: 4,
    icon: '📱',
    title: 'Developers Interested in Mobile',
    description:
      'Web developers who want to leverage their JavaScript knowledge to build cross-platform mobile apps with React Native.',
  },
  {
    id: 5,
    icon: '⚡',
    title: 'Developers Wanting Structured AI Skills',
    description:
      'Learners who want to use AI tools systematically as engineering accelerators rather than blindly copying unverified code.',
  },
  {
    id: 6,
    icon: '🌐',
    title: 'Portfolio & Freelance Builders',
    description:
      'Builders who want demonstrable projects, active GitHub repositories, and live custom-domain deployments.',
  },
];

export const PREREQUISITES = {
  hardware: 'A computer or laptop (Windows, Mac, or Linux) suitable for software development and running Node.js.',
  connectivity: 'Stable internet connection for attending live online classes and installing packages via npm.',
  language: 'Basic English reading and comprehension ability for coding documentation and technical terminology.',
  mindset: 'Dedication to regular hands-on coding practice and willingness to debug errors systematically.',
  disclaimer:
    'No prior programming background is strictly required. Month 1 starts from fundamental web concepts. However, becoming a proficient developer requires consistent practice and problem-solving beyond class hours. We provide guidance, clear architecture, and practical mentoring—not an automated guarantee of employment.',
};

export const LEARNING_ROADMAP_STEPS = [
  { step: '01', title: 'START', subtitle: 'Development Setup', desc: 'VS Code, Git, Node.js installation & terminal basics' },
  { step: '02', title: 'HTML & CSS', subtitle: 'Web Foundations', desc: 'Semantic tags, Flexbox, Grid & responsive design' },
  { step: '03', title: 'JavaScript (ES6+)', subtitle: 'Client Logic', desc: 'Variables, functions, arrays, DOM, async/await & fetch' },
  { step: '04', title: 'TypeScript', subtitle: 'Type Safety', desc: 'Types, interfaces, and typed props for reliable code' },
  { step: '05', title: 'React', subtitle: 'Modern UI Engineering', desc: 'Components, state hooks, props, routing & API consumption' },
  { step: '06', title: 'Node.js & Express', subtitle: 'Backend Runtime', desc: 'Server setup, REST routes, controllers & middleware' },
  { step: '07', title: 'MongoDB & Mongoose', subtitle: 'Database Layer', desc: 'NoSQL collections, schema modeling & CRUD operations' },
  { step: '08', title: 'MERN Full-Stack', subtitle: 'End-to-End Integration', desc: 'Connecting React client to Express REST API & MongoDB' },
  { step: '09', title: 'React Native', subtitle: 'Cross-Platform Mobile', desc: 'Mobile primitives, stack navigation & native layout' },
  { step: '10', title: 'AI-Assisted Workflow', subtitle: 'Productivity Accelerator', desc: 'Architecture prompts, code scaffolding & automated debugging' },
  { step: '11', title: 'Git & GitHub', subtitle: 'Version Control', desc: 'Meaningful commits, repository branching & secrets hygiene' },
  { step: '12', title: 'Cloud Deployment', subtitle: 'Going Live', desc: 'Vercel edge hosting, cloud databases & Hostinger DNS' },
  { step: '13', title: 'Developer Portfolio', subtitle: 'Showcasing Work', desc: 'Polished portfolio website, verified code & LinkedIn presentation' },
];

export const DETAILED_CURRICULUM = [
  {
    id: 'month-1',
    monthNumber: 1,
    month: 'Month 1',
    badge: 'Month 01 • Modern Frontend Development',
    title: 'Modern Frontend Development & React Architecture',
    overview:
      'Master responsive layouts, semantic markup, and dynamic client-side interactivity, then build component-driven user interfaces with React and TypeScript.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'JavaScript ES6+', 'TypeScript', 'React', 'Vite', 'AI Prompting'],
    subsections: [
      {
        code: 'A',
        name: 'HTML',
        items: [
          'Document anatomy and semantic structure (nav, main, section, article, footer)',
          'Accessible forms, validation attributes, and input field types',
          'Tables, media elements, and image optimization basics',
          'Accessibility fundamentals (semantic markup, ARIA roles, WCAG guidelines)',
        ],
      },
      {
        code: 'B',
        name: 'CSS',
        items: [
          'Selectors, cascade rules, inheritance, and specificity',
          'The CSS Box Model: margin, border, padding, and content dimensions',
          'Modern layout systems: Flexbox alignment and CSS Grid track layouts',
          'Mobile-first responsive design using media queries',
          'Positioning schemes (relative, absolute, fixed, sticky) and z-index layering',
          'Transitions, transforms, and subtle interactive hover states',
        ],
      },
      {
        code: 'C',
        name: 'Bootstrap',
        items: [
          '12-column responsive layout grid system and breakpoints',
          'Pre-built utility classes for spacing, flex, and typography',
          'Implementing common components (navbars, cards, modals, buttons)',
          'Rapid interface prototyping techniques',
        ],
      },
      {
        code: 'D',
        name: 'Tailwind CSS',
        items: [
          'Utility-first styling approach and modern configuration',
          'Responsive variants (sm:, md:, lg:, xl:) and state variants (hover:, focus:)',
          'Building custom, scalable component designs without leaving HTML/JSX',
          'Design tokens, color palettes, and consistent spacing scales',
        ],
      },
      {
        code: 'E',
        name: 'JavaScript',
        items: [
          'Language fundamentals: variables (let/const), data types, operators',
          'Functions: declarations, arrow functions, parameters, and return values',
          'Arrays and Objects: destructuring, spread/rest, map, filter, reduce',
          'Conditional logic, loops, and control flow',
          'DOM traversal, element manipulation, and event listeners',
          'Asynchronous JavaScript: Promises, async/await, and fetch() API requests',
          'Modern ES syntax: template literals, modules (import/export), optional chaining',
        ],
      },
      {
        code: 'F',
        name: 'TypeScript',
        items: [
          'Primitive types, type annotations, and union types',
          'Interfaces and custom Type aliases for object data contracts',
          'Typing function parameters and return values',
          'Using TypeScript in React components for reliable props and state typing',
        ],
      },
      {
        code: 'G',
        name: 'React',
        items: [
          'Component architecture: functional components, JSX syntax, and rendering',
          'Props and component composition for building reusable UI blocks',
          'State management with useState and side effects with useEffect',
          'Handling form inputs, submit events, and controlled components',
          'Client-side routing with React Router for multi-page web applications',
          'Connecting components to live REST APIs, loading indicators, and error boundaries',
        ],
      },
      {
        code: 'H',
        name: 'AI-Assisted Frontend Development',
        items: [
          'Crafting clear, contextual technical prompts for UI components',
          'Using AI to generate boilerplate while critically understanding every line',
          'Debugging CSS layout issues, Flexbox bugs, and responsive edge cases with AI',
          'Iterative prompt refinement to optimize accessibility and responsive design',
        ],
      },
    ],
    capstone: {
      title: 'Month 1 Capstone Project',
      name: 'Modern Business / Portfolio Website',
      description:
        'Build and launch a fully responsive multi-section web application featuring custom styling (Tailwind/Bootstrap), reusable React components, interactive navigation, client-side routing, and working lead contact forms.',
      deliverable: 'Responsive React Web Application with Component-Based Structure',
      learningFocus: [
        'Responsive layout and mobile-first navigation',
        'Reusable component library structure',
        'Form handling and client-side validation',
        'Clean folder organization and Vite build pipeline',
      ],
    },
    note: 'Note: Month 1 emphasizes building conceptual fluency and solid coding habits. Topics are connected to real projects rather than isolated syntax drills.',
  },
  {
    id: 'month-2',
    monthNumber: 2,
    month: 'Month 2',
    badge: 'Month 02 • Backend + MERN Full Stack',
    title: 'Backend Engineering, REST APIs & Full-Stack MERN Integration',
    overview:
      'Learn how backend servers and databases work, architect robust REST APIs with Express and Node.js, model data with MongoDB, implement secure authentication, and connect full-stack applications.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'JWT Auth', 'bcryptjs', 'Git & GitHub', 'AI Scaffolding'],
    subsections: [
      {
        code: 'A',
        name: 'Node.js',
        items: [
          'Server-side JavaScript runtime concepts and execution model',
          'Node module system (CommonJS and ES Modules) and npm package management',
          'Managing environment variables with dotenv (.env) securely',
          'Backend project folder structures (routes, controllers, models, middleware)',
        ],
      },
      {
        code: 'B',
        name: 'Express.js',
        items: [
          'Express server initialization, application configuration, and port listening',
          'Modular routing with express.Router()',
          'Controllers and separation of business logic from routing',
          'Middleware creation (request logging, body parsing, CORS, authentication)',
          'Request processing: req.params, req.query, and req.body validation',
          'Centralized error handling middleware and graceful server recovery',
        ],
      },
      {
        code: 'C',
        name: 'MongoDB',
        items: [
          'NoSQL document database concepts vs traditional tabular databases',
          'Collections, JSON-like BSON documents, and ObjectIds',
          'Data modeling and schema validation with Mongoose ODM',
          'CRUD operations: Create (save), Read (find/findOne), Update (findByIdAndUpdate), Delete',
          'Database indexes for query performance and compound constraints',
        ],
      },
      {
        code: 'D',
        name: 'REST APIs',
        items: [
          'REST architectural principles and resource-oriented endpoints',
          'Standard HTTP methods (GET, POST, PUT, PATCH, DELETE)',
          'Standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 409 Conflict, 500 Server Error)',
          'Structuring predictable JSON API responses and error schemas',
        ],
      },
      {
        code: 'E',
        name: 'Authentication and Authorization',
        items: [
          'Authentication ("Who are you?") vs Authorization ("What are you allowed to do?")',
          'User registration, login flows, and input sanitization',
          'Secure password hashing with bcryptjs (never storing plain-text passwords)',
          'JSON Web Tokens (JWT) for stateless session verification',
          'Protected route middleware (verifying Bearer tokens and HTTP-only cookies)',
          'Role-based permissions (User vs Admin dashboard access)',
        ],
      },
      {
        code: 'F',
        name: 'Git & GitHub Version Control',
        items: [
          'Git fundamentals: git init, git add, git commit, git status, git log',
          'Working with remote repositories on GitHub: push, pull, clone, fetch',
          'Branching concepts for safe feature development',
          'Writing meaningful commit messages and clean README documentation',
          'Configuring .gitignore to prevent committing node_modules and .env secrets',
        ],
      },
      {
        code: 'G',
        name: 'AI-Assisted Backend Development',
        items: [
          'Prompting AI for API route scaffolding, controller logic, and Mongoose schemas',
          'Auditing generated backend code for security flaws and unhandled promises',
          'Using AI to write automated API unit and integration test scripts',
          'Diagnosing server stack traces, database connection timeouts, and CORS errors',
        ],
      },
    ],
    capstone: {
      title: 'Month 2 Capstone Project',
      name: 'Full-Stack MERN Management Application',
      description:
        'Engineer a complete MERN application featuring a React dashboard connected to an Express.js REST API with MongoDB persistence, password-hashed authentication, protected admin routes, search, filtering, and data management.',
      deliverable: 'Full-Stack MERN Platform with Persistent Cloud Database',
      learningFocus: [
        'React frontend communicating with Express REST API',
        'Secure JWT authentication and bcrypt password hashing',
        'MongoDB schema modeling and CRUD operations',
        'Server-side search, filtering, and pagination logic',
      ],
    },
    note: 'Note: Month 2 capstone represents full-stack architectural practice. Students write real backend logic and understand data flows end-to-end.',
  },
  {
    id: 'month-3',
    monthNumber: 3,
    month: 'Month 3',
    badge: 'Month 03 • React Native + AI + Deployment',
    title: 'React Native Mobile Apps, Production Deployment & Cloud Hosting',
    overview:
      'Build native cross-platform mobile applications with React Native, compile standalone Android APKs, and deploy full-stack web applications to cloud infrastructure with custom domains.',
    technologies: ['React Native', 'Expo', 'Android APK', 'Vercel', 'Hostinger DNS', 'Custom Domains', 'SSL/TLS', 'LinkedIn Portfolio'],
    subsections: [
      {
        code: 'A',
        name: 'React Native',
        items: [
          'Mobile UI primitives: View, Text, ScrollView, FlatList, Image, TouchableOpacity',
          'Native styling rules, flexbox on mobile, and platform-specific adjustments',
          'Mobile navigation: Stack navigators and Bottom Tab navigators',
          'Handling touch events, text inputs, and mobile keyboard behavior',
          'State management and consuming Express REST APIs in mobile screens',
        ],
      },
      {
        code: 'B',
        name: 'Expo Toolchain',
        items: [
          'Understanding Expo and when it accelerates mobile development',
          'Live mobile testing using Expo Go on physical Android devices',
          'Mobile error debugging, Metro bundler logs, and network troubleshooting',
          'Configuring app.json: bundle identifier, version, icons, and permissions',
        ],
      },
      {
        code: 'C',
        name: 'Android Build & APK Concepts',
        items: [
          'Understanding the difference between development builds and production builds',
          'Generating a standalone compiled Android APK file',
          'Installing and testing the APK directly on Android physical devices',
          'Honest deployment realities: Publishing to Google Play Store involves developer account fees and store review guidelines (not promised automatically)',
        ],
      },
      {
        code: 'D',
        name: 'Production Cloud Deployment',
        items: [
          'Frontend deployment: Building optimized Vite bundles and deploying to Vercel',
          'Backend hosting: Deploying Node/Express servers to production cloud environments',
          'Cloud database: Configuring MongoDB Atlas cloud clusters with secure IP whitelists',
          'Production environment variables: configuring secrets on host dashboards',
          'CORS and API base URL configuration for production domains',
        ],
      },
      {
        code: 'E',
        name: 'Domain & Hostinger DNS',
        items: [
          'Understanding Domain names (the website address, e.g. example.com)',
          'Understanding Hosting (the server/service where the application actually executes)',
          'Understanding DNS (Domain Name System): connecting domain names to hosting IPs',
          'Purchasing a domain via registrars such as Hostinger',
          'Configuring DNS A Records and CNAME records to point to Vercel',
          'Automated SSL/TLS certificate generation for secure HTTPS connections',
        ],
      },
      {
        code: 'F',
        name: 'Developer Portfolio & Professional Presence',
        items: [
          'Building a dedicated, evidence-based personal developer portfolio',
          'Presenting projects with problem statements, architecture diagrams, and tech stacks',
          'Linking active public GitHub repositories with descriptive README files',
          'Polishing LinkedIn profile with realistic project demonstrations and technical skills',
        ],
      },
    ],
    capstone: {
      title: 'Month 3 Capstone Project',
      name: 'Compiled Android Mobile App & Live Deployed Web Platform',
      description:
        'Develop a cross-platform mobile application compiled into a runnable Android APK that consumes your backend REST API, deploy your full-stack web project to Vercel with a custom domain, and publish your developer portfolio.',
      deliverable: 'Runnable Android APK File + Live Deployed Website with Custom Domain',
      learningFocus: [
        'React Native mobile screens consuming REST API data',
        'Compiling and testing a standalone Android APK',
        'Deploying React frontend to Vercel with custom domain & HTTPS',
        'Showcasing verified projects and source code on GitHub and LinkedIn',
      ],
    },
    note: 'Note: The mobile track focuses on hands-on native development and compiled Android APK generation. App store publishing is explained conceptually.',
  },
];

export const REST_API_FLOW_STEPS = [
  { step: '1', label: 'Frontend Client', desc: 'React or React Native app initiates an action (e.g. form submit or data load)' },
  { step: '2', label: 'HTTP Request', desc: 'Fetch request sent over HTTPS with method (GET/POST), headers, and JSON body' },
  { step: '3', label: 'Express Route', desc: 'Server router matches the endpoint URL and passes request to middleware' },
  { step: '4', label: 'Middleware & Auth', desc: 'Rate limiting, body parsing, and JWT token authentication are verified' },
  { step: '5', label: 'Controller', desc: 'Business logic executes: validates input data and handles processing' },
  { step: '6', label: 'MongoDB Database', desc: 'Mongoose queries the database: finds, inserts, or updates records' },
  { step: '7', label: 'HTTP Response', desc: 'Server returns structured JSON payload (status 200/201) back to frontend' },
];

export const AUTH_VS_AUTHORIZATION = {
  authentication: {
    question: 'Who are you?',
    definition: 'The process of verifying the identity of a user or system.',
    examples: [
      'Entering registered email and password',
      'Verifying bcrypt password hash against database record',
      'Signing a JSON Web Token (JWT) on successful login',
      'Returning token via HTTP-only cookie or Bearer header',
    ],
  },
  authorization: {
    question: 'What are you allowed to do?',
    definition: 'The process of verifying whether an authenticated user has permission to perform an action or access a resource.',
    examples: [
      'Allowing an admin to view and edit student inquiries',
      'Restricting public visitors to reading public course pages only',
      'Blocking unauthenticated requests with HTTP 401 Unauthorized',
      'Blocking authenticated users with insufficient permissions with HTTP 403 Forbidden',
    ],
  },
};

export const AI_PRINCIPLES = [
  { step: '1', title: 'Understand', desc: 'First clarify the business problem, inputs, outputs, and edge cases yourself.' },
  { step: '2', title: 'Ask AI', desc: 'Provide precise context, existing code snippets, and exact architectural constraints.' },
  { step: '3', title: 'Review', desc: 'Carefully inspect every generated line. Check logic, variable names, and security.' },
  { step: '4', title: 'Run', desc: 'Execute the code in your local development environment.' },
  { step: '5', title: 'Test', desc: 'Check positive cases, invalid inputs, edge conditions, and error states.' },
  { step: '6', title: 'Debug', desc: 'Feed runtime logs and unexpected outputs back to diagnose root causes.' },
  { step: '7', title: 'Improve', desc: 'Refactor for readability, modularity, performance, and maintainability.' },
];

export const AI_PROMPT_ANATOMY = [
  { item: 'Project Context', desc: 'Framework versions, existing dependencies, and app purpose' },
  { item: 'Current Architecture', desc: 'Folder structure, existing file paths, and data models' },
  { item: 'Exact Requirement', desc: 'What single feature or fix needs to be implemented right now' },
  { item: 'Existing Code', desc: 'Relevant snippet of existing code so the AI doesn\'t make wrong assumptions' },
  { item: 'Constraints', desc: 'Technologies to avoid, styling rules, no hardcoded secrets, and error handling rules' },
  { item: 'Expected Output', desc: 'Exact format (complete component, diff, or explanation) and test criteria' },
  { item: 'Testing Requirements', desc: 'Expected edge cases and unit test scenarios' },
];

export const DEV_WORKFLOW_STEPS = [
  { id: 1, name: 'Requirement', desc: 'Define user stories, feature goals, and user interface expectations.' },
  { id: 2, name: 'Planning', desc: 'Break requirements into manageable technical steps and data contracts.' },
  { id: 3, name: 'Folder Structure', desc: 'Organize files systematically (components, routes, controllers, models).' },
  { id: 4, name: 'UI Scaffolding', desc: 'Build responsive layouts and visual components with Tailwind CSS/Bootstrap.' },
  { id: 5, name: 'Frontend Logic', desc: 'Implement reactive state, form inputs, validation, and event listeners.' },
  { id: 6, name: 'Backend API', desc: 'Create Express routes and controllers to process requests and business logic.' },
  { id: 7, name: 'Database Schema', desc: 'Model Mongoose schemas, data types, and compound indexes in MongoDB.' },
  { id: 8, name: 'Integration', desc: 'Connect React frontend to Express backend via fetch() with loading states.' },
  { id: 9, name: 'Testing', desc: 'Execute automated unit and integration tests to verify positive and error cases.' },
  { id: 10, name: 'Debugging', desc: 'Use DevTools and terminal logs to systematically resolve runtime issues.' },
  { id: 11, name: 'GitHub', desc: 'Commit clean code, push to remote repository, and document in README.' },
  { id: 12, name: 'Deployment', desc: 'Ship frontend to Vercel, host backend on cloud, and link custom domain.' },
];

export const DOMAIN_CONCEPTS = [
  {
    term: 'Domain Name',
    analogy: 'The Street Address',
    definition: 'The human-readable address visitors type in their browser, like example.com or rizmern.com.',
  },
  {
    term: 'Web Hosting',
    analogy: 'The Physical Building',
    definition: 'The cloud server or service (like Vercel or cloud VPS) where your HTML, CSS, JavaScript, and Node code actually live and run.',
  },
  {
    term: 'DNS (Domain Name System)',
    analogy: 'The Phonebook / GPS',
    definition: 'Translates human-readable domain names into server IP addresses so browsers can find where your website is hosted.',
  },
  {
    term: 'SSL / TLS Certificate',
    analogy: 'The Security Seal',
    definition: 'Enables encrypted HTTPS communication between browser and server, showing the padlock icon in address bars.',
  },
];

export const COURSE_PROJECTS = [
  {
    id: 'rota-system',
    title: 'Rota System — Workforce Scheduling & Attendance Platform',
    category: 'Full-Stack Web & Mobile App',
    badge: 'Verified Project',
    tagline: 'Enterprise Shift Scheduling, AI Planning & React Native Client',
    shortDescription:
      'A monorepo platform managing weekly shift rotas, attendance verification, salary ledgers with MongoDB transactions, and an integrated React Native mobile client for employees.',
    problem:
      'Organizations struggle with managing fluctuating shift rosters, manual timecards, and payroll calculations across distributed personnel.',
    architecture: 'React Web Portal (Admin) + React Native Mobile (Staff) ➔ Express REST API ➔ MongoDB Transaction Layer',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB Transactions', 'React Native (Expo)', 'Tailwind CSS'],
    features: [
      'Weekly rota planner with constraint verification',
      'MongoDB transaction-backed salary and attendance ledgers',
      'Cross-platform React Native client for staff check-ins',
      'Excel and PDF attendance report export',
      'Role-based permissions for administrators and staff',
    ],
    whatStudentsLearn:
      'How to build an interconnected web portal and mobile app communicating with the same Express REST API and handling multi-step MongoDB transactions.',
    repoUrl: 'https://github.com/rizwangul-hub/Rota_system',
    isRepoVerified: true,
  },
  {
    id: 'pixxtechnologies',
    title: 'PixxTechnologies — Property & Tenancy Management System',
    category: 'Full-Stack Web Application',
    badge: 'Verified Project',
    tagline: 'Multi-Tenant Commercial Property & Rent Platform',
    shortDescription:
      'A comprehensive commercial property management application with tenancy lifecycle tracking, rent overdue schedules, and Excel data export.',
    problem:
      'Property managers need a centralized way to track tenant agreements, upcoming rent milestones, occupancy rates, and expense ledgers.',
    architecture: 'React 19 Frontend ➔ Express REST API ➔ MongoDB Cloud Database',
    technologies: ['React 19', 'Tailwind CSS 4', 'React Router 7', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Multi-portfolio property, unit, and landlord directory',
      'Occupancy metrics and financial summary visualizations',
      'Tenancy agreement tracking with recurring rent schedules',
      'Excel data export for financial audits and tenant records',
      'Modern modular React component architecture with Tailwind',
    ],
    whatStudentsLearn:
      'How to architect complex relational-like data structures in MongoDB, calculate real-time financial metrics, and export data spreadsheets.',
    repoUrl: 'https://github.com/rizwangul-hub/Pixxtechnologiees',
    isRepoVerified: true,
  },
  {
    id: 'expense-tracker',
    title: 'Pixxtech Expense Tracker — Financial Management Platform',
    category: 'Full-Stack Web Application',
    badge: 'Verified Project',
    tagline: 'Commercial Expense & Financial Ledger App',
    shortDescription:
      'A dedicated financial ledger application tracking recurring expenditures, category breakdowns, and payment verification.',
    problem:
      'Small businesses require transparent expense tracking to monitor cash outflows, categorize costs, and prevent budget overruns.',
    architecture: 'React Client ➔ Express REST API ➔ MongoDB Database',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    features: [
      'Categorized operational and capital expense tracking',
      'Receipt attachment and status verification workflows',
      'Date range filtering and category aggregation queries',
      'Clean responsive dashboard interface',
    ],
    whatStudentsLearn:
      'Building RESTful CRUD operations, filtering queries by date and category, and designing clean financial dashboard interfaces.',
    repoUrl: 'https://github.com/rizwangul-hub/Pixxtech-Expense-Tracker-',
    isRepoVerified: true,
  },
  {
    id: 'react-native-mobile',
    title: 'React Native Mobile App & Android APK Prototype',
    category: 'Cross-Platform Mobile App',
    badge: 'Mobile Capstone',
    tagline: 'Native Mobile Screen Flow & Compiled Android APK',
    shortDescription:
      'A mobile application built using React Native and Expo, featuring stack and tab navigation, local storage caching, API consumption, and Android APK compilation.',
    problem:
      'Web applications often need mobile companion clients providing on-the-go access, touch-friendly interfaces, and offline resilience.',
    architecture: 'React Native (Android/iOS) ➔ Fetch / Axios ➔ Express REST API',
    technologies: ['React Native', 'Expo', 'Mobile Navigation', 'AsyncStorage', 'Android APK Build'],
    features: [
      'Native mobile layout with View, Text, ScrollView, FlatList',
      'Stack and bottom tab navigation transitions',
      'Consuming Express REST APIs with loading and error states',
      'Compiling standalone Android APK for physical device installation',
    ],
    whatStudentsLearn:
      'Translating web skills to native mobile primitives, handling touch gestures, testing on Android emulators and devices, and understanding APK builds.',
    repoUrl: 'https://github.com/rizwangul-hub',
    isRepoVerified: false,
  },
];

export const COURSE_FAQS = [
  {
    q: 'How long is the course?',
    a: 'The course is structured as an intensive three-month program: Month 1 covers Modern Frontend Development & React, Month 2 covers Backend Engineering & MERN Full Stack, and Month 3 covers React Native Mobile Apps, AI Workflows & Cloud Deployment.',
  },
  {
    q: 'Is the course conducted online?',
    a: 'Yes, all classes are conducted online. You can participate from anywhere with a computer and an internet connection. Sessions include live coding walkthroughs, architectural breakdowns, and direct Q&A with instructor Rizwan Ullah.',
  },
  {
    q: 'What technologies are covered in the course?',
    a: 'The curriculum covers HTML5, CSS3, Bootstrap, Tailwind CSS, JavaScript (ES6+), TypeScript, React, Node.js, Express.js, MongoDB, Mongoose, REST APIs, JWT authentication, Git & GitHub, React Native, Expo, Android APK builds, Vercel deployment, and Hostinger DNS configuration.',
  },
  {
    q: 'Do I need previous programming experience to join?',
    a: 'No prior coding experience is strictly required. The course starts from foundational web building blocks in Month 1 before progressing to full-stack engineering. You only need basic computer literacy, English reading ability, and dedication to practice regularly.',
  },
  {
    q: 'How is AI used during learning?',
    a: 'AI is taught as an engineering accelerator. Students learn how to craft contextual prompts for planning project architecture, generating boilerplate, writing tests, and debugging errors. We teach the principle "Don\'t Just Copy AI Code"—students must understand and inspect every line.',
  },
  {
    q: 'Will we build real projects during the course?',
    a: 'Yes, the curriculum is project-focused. You will practice building responsive business websites, a full-stack MERN management system with MongoDB and JWT authentication, and a cross-platform React Native mobile app compiled into an Android APK.',
  },
  {
    q: 'Will I learn React Native and mobile app development?',
    a: 'Yes, Month 3 is dedicated to cross-platform mobile development using React Native and Expo. You will learn mobile layout primitives, navigation, API integration, and how to compile a runnable Android APK file for testing on physical devices.',
  },
  {
    q: 'Will I learn how to deploy applications live to the internet?',
    a: 'Yes. You will learn production deployment workflows: connecting GitHub repositories to Vercel for automated frontend builds, hosting backend APIs, configuring cloud MongoDB database clusters, purchasing and linking custom domains on Hostinger, and configuring DNS records and SSL certificates.',
  },
  {
    q: 'Is there a job guarantee with this course?',
    a: 'No. RizMern is an honest, skills-focused educational program. We do not make misleading claims of "100% job placement" or "guaranteed income." Instead, we focus on helping you build real, demonstrable skills, write clean code, maintain active GitHub repositories, and construct a verifiable portfolio.',
  },
  {
    q: 'How do I join the free demo class?',
    a: 'Click the "Join Free Demo Class" button on this website to open the reservation form. Submit your name, email, phone number, and experience level. Instructor Rizwan Ullah will connect with you via WhatsApp or Email with the upcoming demo class link and schedule. The demo is 100% free with zero obligation.',
  },
];
