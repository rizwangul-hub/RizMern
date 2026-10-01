/**
 * Shared configuration for the 3D visual layers used across the site.
 * Adjust colors, counts, and motion here without touching component logic.
 */

export const THREE_CONFIG = {
  hero: {
    orbGlow: '#8b5cf6',
    orbSecondary: '#06b6d4',
    ringColor: '#38bdf8',
    particles: 180,
    mobileParticles: 90,
  },
  floatingBackground: {
    particleCount: 80,
    colors: ['#8b5cf6', '#3b82f6', '#06b6d4', '#c4b5fd'],
    motion: 0.08,
  },
  section: {
    eyebrow: 'DEVELOPMENT JOURNEY IN 3D',
    title: 'From Idea to Live Website',
    subtitle: 'Scroll to explore the 4-phase transformation from raw concept to a published full-stack application.',
  },

  colors: {
    laptopBody: '#13141f',
    laptopMetallic: 0.85,
    laptopRoughness: 0.25,
    neonEdgePurple: '#9333ea',
    neonEdgeCyan: '#06b6d4',
    keyboardPlate: '#0c0d14',
    keyCap: '#181a26',
    keyCapHighlight: '#222536',
    trackpad: '#1c1e2d',
    screenBezel: '#08090f',
    screenBorder: '#2e1065',
    logoBackGlow: '#a855f7',
    floorReflection: '#4f46e5',
    particles: ['#a855f7', '#38bdf8', '#c084fc', '#818cf8'],
  },

  dimensions: {
    baseWidth: 3.4,
    baseDepth: 2.3,
    baseHeight: 0.09,
    lidWidth: 3.4,
    lidDepth: 2.25,
    lidHeight: 0.06,
    screenWidth: 3.15,
    screenHeight: 2.0,
    trackpadWidth: 1.1,
    trackpadDepth: 0.75,
  },

  stages: [
    {
      id: 0,
      badge: 'Step 01',
      title: '1. Plan with AI',
      subtitle: 'System Design & Prompting',
      description:
        'Harness AI assistants to map out component trees, relational database schemas, and clean directory architectures before laying down code.',
      screenType: 'ai_plan',
      chatPrompt: 'RizMern Assistant: "Drafting schema for Courses, Students, Progress, and Auth..."',
      progressPercent: '25%',
      // 3D Transform targets for stage 0
      transform: {
        lidAngle: 0.2, // mostly closed, just peeling open
        rotX: 0.35,
        rotY: -0.45,
        rotZ: 0.06,
        camZ: 5.4,
        camY: 1.2,
      },
    },
    {
      id: 1,
      badge: 'Step 02',
      title: '2. Build the Frontend',
      subtitle: 'React & Modern Tailwind UI',
      description:
        'Construct fluid, responsive interfaces using React components, Framer Motion transitions, and accessible Tailwind styling.',
      screenType: 'frontend_code',
      codeSnippet: `export function App() {\n  return (\n    <SiteLayout>\n      <Hero title="Build Modern Apps" />\n      <ProjectGallery live={true} />\n    </SiteLayout>\n  );\n}`,
      progressPercent: '50%',
      // 3D Transform targets for stage 1
      transform: {
        lidAngle: 1.85, // fully open (~106 deg)
        rotX: 0.16,
        rotY: 0.44, // rotated ~25 degrees
        rotZ: -0.02,
        camZ: 4.8,
        camY: 1.0,
      },
    },
    {
      id: 2,
      badge: 'Step 03',
      title: '3. Connect Backend and Database',
      subtitle: 'Node, Express, MongoDB & JWT',
      description:
        'Implement resilient REST APIs, JWT authentication middlewares, input validation guards, and MongoDB Atlas persistence.',
      screenType: 'terminal_backend',
      terminalOutput: [
        '$ npm run dev',
        '[RizMern API] listening on port 5000',
        '✔ MongoDB connected: cluster0.mongodb.net',
        '✔ JWT Auth & CORS Origin verified',
        'Ready for client connections...',
      ],
      progressPercent: '75%',
      // 3D Transform targets for stage 2
      transform: {
        lidAngle: 1.9,
        rotX: 0.22,
        rotY: 1.18, // side profile view
        rotZ: 0.02,
        camZ: 4.1, // closer camera
        camY: 0.95,
      },
    },
    {
      id: 3,
      badge: 'Step 04',
      title: '4. Go Live with Your Domain',
      subtitle: 'Cloud Deployment & Launch',
      description:
        'Push your code to GitHub, deploy full-stack to Vercel, attach your custom domain with SSL, and launch your verified portfolio to the world.',
      screenType: 'live_site',
      liveUrl: 'https://rizmern.com',
      liveBadgeText: '● LIVE & VERIFIED',
      progressPercent: '100%',
      // 3D Transform targets for stage 3
      transform: {
        lidAngle: 1.85,
        rotX: 0.08,
        rotY: 0.0, // front-facing hero angle
        rotZ: 0.0,
        camZ: 4.25,
        camY: 0.85,
      },
    },
  ],
}

export default THREE_CONFIG
