import {
  Atom,
  Braces,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  LayoutGrid,
  PackageCheck,
  Palette,
  Route,
  Server,
  Smartphone,
  Wind,
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'

const technologyIcons = {
  code: Code2,
  palette: Palette,
  layout: LayoutGrid,
  wind: Wind,
  braces: Braces,
  'file-code': FileCode2,
  atom: Atom,
  server: Server,
  route: Route,
  database: Database,
  'git-branch': GitBranch,
  cloud: Cloud,
  globe: Globe,
  briefcase: BriefcaseBusiness,
  smartphone: Smartphone,
  package: PackageCheck,
}

const technologyLogos = {
  HTML: 'html5/html5-original.svg',
  CSS: 'css3/css3-original.svg',
  Bootstrap: 'bootstrap/bootstrap-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  TypeScript: 'typescript/typescript-original.svg',
  React: 'react/react-original.svg',
  'Node.js': 'nodejs/nodejs-original.svg',
  'Express.js': 'express/express-original.svg',
  MongoDB: 'mongodb/mongodb-original.svg',
  GitHub: 'github/github-original.svg',
  Vercel: 'vercel/vercel-original.svg',
  LinkedIn: 'linkedin/linkedin-original.svg',
  'React Native': 'react/react-original.svg',
  'APK Build': 'android/android-original.svg',
}

const deviconBaseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

export default function TechnologyGrid({ technologies, className = '' }) {
  return (
    <div className={`hm-tech-grid ${className}`.trim()}>
      {technologies.map((technology, index) => {
        const Icon = technologyIcons[technology.icon]
        const logoPath = technologyLogos[technology.name]
        return (
          <ScrollReveal key={technology.name} delay={(index % 4) * 0.045}>
            <GlassCard className="hm-tech-card">
              <span className={`hm-tech-icon${logoPath ? ' hm-tech-icon--logo' : ''}`}>
                {logoPath
                  ? <img src={`${deviconBaseUrl}/${logoPath}`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  : <Icon size={20} strokeWidth={1.8} aria-hidden="true" />}
              </span>
              <h3>{technology.name}</h3>
              <p>{technology.description}</p>
            </GlassCard>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
