export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://www.rizmern.online').replace(/\/+$/, '')

const whatsappNumber = '923179500901'

export const siteData = {
  brand: 'RizMern',
  siteUrl: SITE_URL,
  courseName: 'MERN Stack + React Native App Development with AI',
  courseTagline: 'Learn MERN Stack & React Native with AI',
  duration: '3 Months',
  classFormat: 'Online Live Classes',
  experienceLevel: 'Beginner Friendly',
  demoCtaText: 'Join Free Demo Class',
  demoChipText: 'Free Demo Class',
  courseTechList: ['HTML', 'CSS', 'Tailwind', 'JavaScript', 'React'],
  instructor: 'Rizwan Ullah',
  instructorTitle: 'MERN Stack and React Native App Developer',
  instructorBio: [
    'Rizwan helps learners turn modern web and mobile technologies into practical, working products.',
    'His teaching focuses on clear project structure, real workflows, and building with confidence.',
  ],
  price: 'PKR XX,XXX',
  whatsappNumber,
  whatsappLink: `https://wa.me/${whatsappNumber}`,
  whatsappGroupLink: 'https://chat.whatsapp.com/Hg61usPuMv25DW9cJKK0dR?s=cl&p=a&mlu=4&ilr=4&iam=0',
  whatsappPrefilledMessage: 'Hello Rizwan, I want to know about the MERN course',
  email: 'mernstack2426@gmail.com',
  timings: 'TBA',
}

export const coursePageData = {
  metaTitle: 'MERN Stack & React Native Course | RizMern',
  metaDescription: 'Explore the 3-month online MERN Stack and React Native App Development with AI course at RizMern.',
  heroDescription: 'A beginner-friendly, project-led path from frontend foundations to full stack websites and a React Native app.',
  badges: ['3 Months', 'Online', 'Beginner Friendly', 'Live Projects'],
  audience: [
    { title: 'Beginners', description: 'Start learning web development with a guided foundation.' },
    { title: 'Students', description: 'Build practical skills alongside your studies.' },
    { title: 'Freelancers', description: 'Expand the kinds of web and mobile projects you can make.' },
    { title: 'Job seekers', description: 'Develop projects and skills to support your next career step.' },
    { title: 'Business owners', description: 'Understand how modern websites and apps come together.' },
  ],
  outcomes: [
    'Build responsive websites with modern frontend tools.',
    'Connect a frontend to APIs and a MongoDB database.',
    'Create a React Native mobile app and generate an Android APK.',
    'Deploy projects and present them through a portfolio and LinkedIn.',
  ],
  requirements: [
    'A laptop or desktop computer',
    'A reliable internet connection',
    'No coding experience needed',
  ],
  roadmap: [
    {
      month: 'Month 1',
      focus: 'Frontend',
      summary: 'Understand how the web works and build a modern portfolio website.',
      weeks: [
        { topic: 'How the web works, HTML and CSS', explanation: 'Learn how browsers load pages and how HTML and CSS define their structure and appearance.', outcome: 'Create and style the first responsive web pages.' },
        { topic: 'Bootstrap, Tailwind CSS and responsive layouts', explanation: 'Explore two approaches to building consistent interfaces that adapt to screen sizes.', outcome: 'Build polished layouts with reusable styling patterns.' },
        { topic: 'JavaScript and TypeScript introductions', explanation: 'Learn the language fundamentals behind interactive websites and an introduction to typed JavaScript.', outcome: 'Understand core programming ideas and write simple interactive code.' },
        { topic: 'React, components, props, state and routing', explanation: 'Learn to compose user interfaces from components and manage data and navigation.', outcome: 'Build a multi-page React interface with reusable components.' },
        { topic: 'Project structure and portfolio with AI', explanation: 'Organize a real project and use AI to plan, review and improve your implementation.', outcome: 'Build a modern portfolio website and understand its folder structure.' },
      ],
    },
    {
      month: 'Month 2',
      focus: 'Backend and Database',
      summary: 'Build APIs and connect your frontend to persistent data.',
      weeks: [
        { topic: 'Node.js and Express.js', explanation: 'Run JavaScript on the server and organize application logic into API routes.', outcome: 'Create a structured backend server with Express.' },
        { topic: 'REST APIs', explanation: 'Learn how clients and servers exchange data through predictable HTTP endpoints.', outcome: 'Design and test endpoints for common application tasks.' },
        { topic: 'MongoDB and database basics', explanation: 'Store application data in a document database and work with it from your backend.', outcome: 'Create and query a MongoDB-backed data model.' },
        { topic: 'Connecting frontend and backend', explanation: 'Send requests between a React interface and your API; introduce authentication basics.', outcome: 'Connect user flows to live data and understand basic authentication.' },
        { topic: 'Full stack admission website', explanation: 'Bring frontend, backend, and database concepts together in one practical build.', outcome: 'Build a full stack admission website with a connected database.' },
      ],
    },
    {
      month: 'Month 3',
      focus: 'Mobile, Deployment, and Career',
      summary: 'Build a mobile app, publish your work, and prepare your professional presence.',
      weeks: [
        { topic: 'React Native foundations', explanation: 'Use React concepts to create interfaces designed for mobile devices.', outcome: 'Build the screens and navigation for a React Native app.' },
        { topic: 'Mobile app project and APK', explanation: 'Connect app screens to project data and prepare an Android install package.', outcome: 'Build a React Native app and generate an Android APK.' },
        { topic: 'GitHub and Vercel deployment', explanation: 'Track your code and publish a web project so it can be shared online.', outcome: 'Push project code to GitHub and deploy a website with Vercel.' },
        { topic: 'Hostinger, domains and LinkedIn', explanation: 'Connect a domain to hosting and present your projects professionally.', outcome: 'Understand domain connection steps and improve your LinkedIn profile.' },
        { topic: 'Final project and personal branding', explanation: 'Polish your work, share your project story, and review your learning journey.', outcome: 'Complete a final project and present it in your portfolio.' },
      ],
    },
  ],
  aiWorkflow: {
    eyebrow: 'A thoughtful AI workflow',
    titleStart: 'Use AI to build',
    titleAccent: 'with understanding.',
    description: 'Learn to use AI tools to plan a project, generate a starting point, debug issues, and improve your work. The focus stays on understanding project structure and architecture—not memorizing syntax or accepting code you cannot explain.',
    steps: [
      { title: 'Plan', description: 'Break a product idea into clear screens, data, and tasks.' },
      { title: 'Generate', description: 'Use AI to explore code patterns and create a useful starting point.' },
      { title: 'Debug', description: 'Investigate errors, ask better questions, and verify suggested fixes.' },
      { title: 'Improve', description: 'Review the structure and iterate toward a clearer, more complete product.' },
    ],
  },
  inclusions: [
    { id: 'liveClasses', label: 'Live classes', enabled: true },
    { id: 'recordedLessons', label: 'Recorded lessons (if applicable)', enabled: true },
    { id: 'projectFiles', label: 'Project files', enabled: true },
    { id: 'whatsappSupport', label: 'WhatsApp support group', enabled: true },
    { id: 'deploymentHelp', label: 'Deployment help', enabled: true },
    { id: 'linkedinGuidance', label: 'LinkedIn guidance', enabled: true },
    { id: 'certificate', label: 'Course completion certificate', enabled: true },
  ],
  schedule: {
    daysPerWeek: 'TBA',
    classTiming: 'TBA',
    durationPerClass: 'TBA',
    batchStartDate: 'TBA',
    mode: 'Online',
  },
  finalCta: {
    title: 'Join the Free Demo Class',
    description: 'Meet the instructor and learn more about the course in a free demo class.',
  },
}

export const pricingPageData = {
  metaTitle: 'MERN Stack Course Fees & Admission Plans | RizMern',
  metaDescription: 'Review MERN Stack course fees, flexible payment plans, and admission details for the 3-month online full-stack web and mobile development course at RizMern.',
  title: 'MERN Stack Course Fees & Admission Details',
  regularPrice: siteData.price,
  discountedPrice: '',
  paymentNote: 'One-time payment. Payment details will be shared after admission confirmation.',
  includedItems: [
    'Complete 3-month learning journey',
    'Live classes and practical project guidance',
    'Web, backend, database, and React Native topics',
    'Project files and deployment guidance',
    'WhatsApp support group and LinkedIn guidance',
    'Course completion certificate',
  ],
  installmentPlan: {
    enabled: false,
    count: 'TBA',
    amounts: ['PKR XX,XXX', 'PKR XX,XXX'],
    note: 'Installment details will be confirmed before admission.',
  },
  paymentMethods: [
    { name: 'JazzCash', enabled: true },
    { name: 'EasyPaisa', enabled: true },
    { name: 'Bank Transfer', enabled: true },
  ],
  paymentMethodsNote: 'Payment details will be shared after admission confirmation.',
  admissionSteps: [
    { title: 'Join free demo', description: 'Attend a free introduction and learn about the course.' },
    { title: 'Talk to instructor', description: 'Ask questions and discuss your learning goals.' },
    { title: 'Confirm admission and pay', description: 'Review the confirmed fee and complete admission.' },
    { title: 'Join WhatsApp group and start', description: 'Get class updates and begin the learning journey.' },
  ],
  seatPolicy: 'Refund and seat reservation policy: TBA. Please confirm the current policy before making a payment.',
  limitedSeats: {
    enabled: false,
    count: 0,
    label: 'Seats available for this batch',
  },
  faqs: [
    { question: 'What is the course fee?', answer: 'The course fee is shown above. Contact us to confirm current admission and payment details.' },
    { question: 'Can I pay in installments?', answer: 'Installment availability and amounts are controlled by the course team. Check this page or contact us for the latest details.' },
    { question: 'Which payment methods are available?', answer: 'Payment instructions for the listed methods will be shared after admission confirmation.' },
    { question: 'What is the refund or seat policy?', answer: 'The current refund and seat reservation policy is listed above. Please confirm it with the instructor before paying.' },
  ],
}

export const instructorPageData = {
  metaTitle: 'Meet Rizwan Ullah | RizMern Instructor',
  metaDescription: 'Meet Rizwan Ullah, MERN Stack and React Native App Developer and instructor at RizMern.',
  bio: [
    'Rizwan Ullah is a MERN Stack and React Native App Developer who works across modern web and mobile technologies.',
    'He guides learners through project structure, application architecture, and the practical decisions behind building useful products.',
    'In the RizMern course, students explore frontend, backend, database, and mobile development through connected projects.',
    'His teaching approach uses AI as a workflow partner while keeping understanding and clear engineering habits at the center.',
  ],
  skills: [
    'HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React',
    'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'GitHub', 'Vercel',
    'React Native', 'AI-assisted development',
  ],
  teachingApproach: 'Rizwan teaches project structure, architecture, and a thoughtful AI workflow for building real products—not syntax memorization. Learners practice understanding what each part does and how the pieces work together.',
  journey: [
    { date: 'TBA', title: 'Development experience', description: 'Professional experience details to be added.' },
    { date: 'TBA', title: 'Web and mobile projects', description: 'Selected project and milestone details to be added.' },
    { date: 'TBA', title: 'RizMern teaching journey', description: 'Teaching milestones to be added.' },
  ],
  linkedinUrl: 'https://www.linkedin.com/in/rizwanmerndev',
  githubUrl: 'https://github.com/rizwangul-hub',
  finalCta: 'Learn directly from Rizwan',
}

export const homePageData = {
  hero: {
    title: 'Learn Full Stack Web Development with AI in 3 Months',
    titlePrefix: 'Learn Full Stack Web Development with AI',
    titleAccent: 'in 3 Months',
    description: 'Master MERN stack, React Native, and AI-assisted workflows in Pakistan. Build and launch live full-stack websites and mobile apps step by step with Rizwan Ullah.',
    eyebrow: 'Learn by building, step by step',
    typingPrefix: 'Learn to build',
    demoButton: 'Join Free Demo Class',
    courseButton: 'View Course Details',
    rotatingPhrases: [
      'Full Stack Websites',
      'React Native Apps',
      'Portfolio Websites',
      'Live Projects with AI',
    ],
    trustLine: 'Free demo class • Online • Beginner friendly',
    editorTitle: 'your-next-project.jsx',
    editorLines: [
      { number: '01', keyword: 'const', variable: 'idea', value: '"your next big thing"' },
      { number: '02', keyword: 'build', variable: 'web', value: 'React + Node.js' },
      { number: '03', keyword: 'build', variable: 'mobile', value: 'React Native' },
      { number: '04', keyword: 'ship', variable: 'with', value: 'AI in your workflow' },
    ],
    editorLaunchLine: { number: '05', keyword: 'launch', variable: 'your future', suffix: ';' },
    editorStatus: 'Everything ready to build',
    editorDomain: 'rizmern.dev',
    techItems: ['React', 'Node.js', 'MongoDB', 'AI'],
  },
  sectionContent: {
    learn: {
      eyebrow: 'A modern developer toolkit',
      titleStart: 'What you’ll',
      titleAccent: 'learn',
      description: 'Understand the tools behind modern websites and apps—and how to bring them together into real projects.',
    },
    teaching: {
      eyebrow: 'A better way to learn',
      titleStart: 'Why',
      titleAccent: 'RizMern',
    },
    projects: {
      eyebrow: 'Learn by making',
      titleStart: 'What you’ll',
      titleAccent: 'build',
      description: 'Turn each new skill into something useful, tangible, and ready to show.',
    },
    journey: {
      eyebrow: 'Three months, step by step',
      titleStart: 'Your',
      titleAccent: 'learning journey',
      description: 'A clear progression from frontend foundations to full stack, mobile, and launch.',
      button: 'See Full Roadmap',
    },
    faq: {
      eyebrow: 'Questions, answered',
      titleStart: 'A few things you might be',
      titleAccent: 'wondering',
      description: 'Still have a question? Join the demo class and ask us directly.',
    },
    instructor: {
      eyebrow: 'Learn with a builder',
      label: 'YOUR INSTRUCTOR',
      button: 'LinkedIn',
      moreLink: 'Know More',
    },
    editorImageLabel: 'Animated code editor with React, Node.js, MongoDB, and AI technology badges',
  },
  stats: [
    { value: 3, suffix: '', label: 'Months', detail: 'A focused learning journey' },
    { value: 10, suffix: '+', label: 'Technologies', detail: 'Modern tools, practical skills' },
    { value: 4, suffix: '', label: 'Live Projects', detail: 'Build as you learn' },
    { value: 1, suffix: '', label: 'Android APK', detail: 'A mobile app you can install' },
  ],
  technologies: [
    { name: 'HTML', icon: 'code', description: 'Structure web pages so browsers and people can understand them.' },
    { name: 'CSS', icon: 'palette', description: 'Style responsive interfaces that feel polished on every screen.' },
    { name: 'Bootstrap', icon: 'layout', description: 'Build familiar layouts quickly with a proven UI toolkit.' },
    { name: 'Tailwind CSS', icon: 'wind', description: 'Compose custom designs efficiently with utility-first styling.' },
    { name: 'JavaScript', icon: 'braces', description: 'Add the logic and interactivity behind modern web experiences.' },
    { name: 'TypeScript', icon: 'file-code', description: 'Catch mistakes earlier with safer, clearer JavaScript.' },
    { name: 'React', icon: 'atom', description: 'Create reusable interfaces from small, focused components.' },
    { name: 'Node.js', icon: 'server', description: 'Run JavaScript on the server to power your applications.' },
    { name: 'Express.js', icon: 'route', description: 'Build API routes that connect your frontend to your data.' },
    { name: 'MongoDB', icon: 'database', description: 'Store and organize the information your app depends on.' },
    { name: 'GitHub', icon: 'git-branch', description: 'Track code changes and share projects with collaborators.' },
    { name: 'Vercel', icon: 'cloud', description: 'Deploy websites and share updates with the world.' },
    { name: 'Hostinger and Domain', icon: 'globe', description: 'Connect hosting and a domain to publish your own website.' },
    { name: 'LinkedIn', icon: 'briefcase', description: 'Present your skills and projects professionally online.' },
    { name: 'React Native', icon: 'smartphone', description: 'Use React skills to make apps for Android and iOS.' },
    { name: 'APK Build', icon: 'package', description: 'Package your Android app so it is ready to install and test.' },
  ],
  teaching: {
    description: 'We don’t waste months on boring syntax theory. You learn what every technology is, how it works, how to structure a project, and how to build real products with the help of AI.',
    features: [
      { title: 'AI-Powered Workflow', description: 'Use AI thoughtfully to explore ideas, solve problems, and move through your build.' , icon: 'sparkles' },
      { title: 'Real Folder Structure', description: 'Learn how to organize code so your projects are easier to understand and grow.', icon: 'folders' },
      { title: 'Frontend + Backend + App', description: 'See how interfaces, APIs, databases, and mobile apps fit together.', icon: 'layers' },
      { title: 'Go Live with Domain', description: 'Take a website from your local machine to a real domain online.', icon: 'globe' },
      { title: 'LinkedIn and Portfolio Branding', description: 'Show your projects clearly and build a professional online presence.', icon: 'briefcase' },
      { title: 'Live Support Group', description: 'Learn alongside a community and get support as you work through projects.', icon: 'users' },
    ],
    comparison: {
      oldTitle: 'The old way',
      newTitle: 'The RizMern way',
      oldItems: [
        'Endless theory before making anything',
        'Disconnected tutorials and copy-paste code',
        'Unsure how to structure a real project',
        'Finish learning without a finished product',
      ],
      newItems: [
        'Learn the concept, then build with it',
        'Follow one connected path across the stack',
        'Practice real folder structures and workflows',
        'Ship projects for web, mobile, and your portfolio',
      ],
    },
  },
  projects: [
    { title: 'Modern Portfolio Website', description: 'Create a polished home for your story, skills, and projects.', icon: 'panels', accent: 'violet' },
    { title: 'Full Stack Website with Login and Database', description: 'Connect a working interface to authentication and saved data.', icon: 'database', accent: 'blue' },
    { title: 'Online Admission Website', description: 'Build a practical online flow for collecting admission details.', icon: 'graduation', accent: 'cyan' },
    { title: 'React Native Mobile App (APK)', description: 'Build a mobile experience and package an Android APK.', icon: 'smartphone', accent: 'pink' },
  ],
  journey: [
    { month: 'Month 1', title: 'Frontend', description: 'Learn the web foundations, build responsive interfaces, and get comfortable with React.', icon: 'monitor' },
    { month: 'Month 2', title: 'Backend and Database', description: 'Create APIs, work with MongoDB, and connect full stack features together.', icon: 'database' },
    { month: 'Month 3', title: 'React Native, Deployment, Career', description: 'Build a mobile app, publish your work, and present your projects with confidence.', icon: 'rocket' },
  ],
  demo: {
    title: 'Join the Free Demo Class',
    description: 'See how the learning journey works, meet your instructor, and bring your questions.',
    fields: {
      name: 'Name',
      phone: 'Phone Number',
      email: 'Email',
      preferredDay: 'Which day(s) are you free?',
      preferredTime: 'Which time are you free?',
    },
    submitLabel: 'Reserve My Free Seat',
    successMessage: 'Thanks for your interest! Your details are ready, and we’ll be in touch soon.',
    groupLabel: 'Join WhatsApp Group',
    date: 'TBA',
    time: 'TBA',
    benefits: [
      'See how the MERN and React Native learning path is structured.',
      'Get a feel for project-based classes and the AI workflow.',
      'Ask questions directly and decide if the course fits your goals.',
    ],
  },
  faqs: [
    { question: 'Do I need coding experience?', answer: 'No. The course is beginner friendly and starts with the foundations before moving into complete projects.' },
    { question: 'What is the course duration?', answer: `The guided course runs for ${siteData.duration}, moving step by step from frontend fundamentals to full stack and mobile app development.` },
    { question: 'Is it online?', answer: `Yes. Classes are online. ${siteData.timings === 'TBA' ? 'Class days and times will be shared with the upcoming batch.' : `The schedule is ${siteData.timings.toLowerCase()}.`} A live support group is available for your learning journey.` },
    { question: 'Will I get a certificate?', answer: 'Course completion and certificate details will be shared with enrolled learners.' },
    { question: 'How do I pay?', answer: 'Join the free demo or contact us directly to get current fee and payment instructions.' },
    { question: 'What if I miss a class?', answer: 'Reach out to the live support group to get guidance on the class topics and how to catch up.' },
  ],
  finalCta: {
    title: 'Your journey to becoming a full stack developer starts here',
    description: 'Take the first step. Join a free demo class and see what you can build.',
  },
}

export const admissionFormData = {
  title: 'Apply for Admission',
  description: 'Share a few details and Rizwan will contact you to confirm the next steps.',
  fields: {
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email',
    city: 'City',
    education: 'Education (optional)',
    preferredBatch: 'Preferred Batch (optional)',
    paymentPlan: 'Payment Plan',
    message: 'Message (optional)',
  },
  paymentPlans: [
    { value: 'full', label: 'Full Payment', description: 'Pay the course fee in one payment.' },
    { value: 'installment', label: 'Installment', description: 'Ask about available installment details.' },
  ],
  submitLabel: 'Send Admission Request',
  courseSummaryTitle: 'Your course',
}

export const thankYouData = {
  demo: {
    title: 'You are registered for the free demo class',
    description: 'We’re looking forward to meeting you. Here are your next steps:',
    steps: ['Join the WhatsApp group', 'Check your email or phone', 'Attend the demo'],
  },
  admission: {
    title: 'Your admission request has been received.',
    description: 'Rizwan will contact you shortly to confirm.',
    steps: [],
  },
  generic: {
    title: 'Thank you for reaching out.',
    description: 'Your next step toward building with RizMern starts here.',
    steps: [],
  },
  groupButton: 'Join WhatsApp Group',
  homeButton: 'Back to Home',
}

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Course', href: '/course' },
  { label: 'Curriculum', href: '/curriculum' },
  { label: 'My Work', href: '/projects' },
  { label: 'Roadmap', href: '/#roadmap' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Instructor', href: '/instructor' },
  { label: 'FAQ', href: '/#faq' },
]

export const socialLinks = [
  { label: 'LinkedIn', href: instructorPageData.linkedinUrl, icon: 'linkedin' },
  { label: 'WhatsApp', href: siteData.whatsappLink, icon: 'whatsapp' },
  { label: 'GitHub', href: instructorPageData.githubUrl, icon: 'github' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@mernstackdeveloper', icon: 'tiktok' },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
]
