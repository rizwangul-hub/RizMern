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

export default function TechnologyGrid({ technologies, className = '' }) {
  return (
    <div className={`hm-tech-grid ${className}`.trim()}>
      {technologies.map((technology, index) => {
        const Icon = technologyIcons[technology.icon]
        return (
          <ScrollReveal key={technology.name} delay={(index % 4) * 0.045}>
            <GlassCard className="hm-tech-card">
              <span className="hm-tech-icon"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
              <h3>{technology.name}</h3>
              <p>{technology.description}</p>
            </GlassCard>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
