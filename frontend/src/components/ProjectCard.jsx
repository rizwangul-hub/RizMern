import { ArrowUpRight } from 'lucide-react'
import GlassCard from './GlassCard'
import { externalLinkProps } from '../utils/externalLinkProps'

export default function ProjectCard({ project }) {
  return (
    <GlassCard className="work-card">
      <div className="work-card-image">
        <img src={project.imageUrl} alt={`${project.title} website preview`} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
        <span className="work-card-category">{project.category}</span>
      </div>
      <div className="work-card-content">
        <div className="work-card-heading">
          <h3>{project.title}</h3>
          {project.featured && <span className="work-featured-label">Featured</span>}
        </div>
        <p>{project.description}</p>
        <ul className="work-tech-list" aria-label="Technologies used">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        {project.liveUrl && (
          <a className="work-card-link" href={project.liveUrl} {...externalLinkProps}>
            View live project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </GlassCard>
  )
}
