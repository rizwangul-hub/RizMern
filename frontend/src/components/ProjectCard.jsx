import { ArrowUpRight } from 'lucide-react'
import GlassCard from './GlassCard'
import { externalLinkProps } from '../utils/externalLinkProps'

export default function ProjectCard({ project, onSelect }) {
  return (
    <GlassCard className="work-card">
      <div className="work-card-image" onClick={() => onSelect && onSelect(project)} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
        <img src={project.imageUrl} alt={`${project.title} website preview`} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
        <span className="work-card-category">{project.category}</span>
      </div>
      <div className="work-card-content">
        <div className="work-card-heading">
          <h3 onClick={() => onSelect && onSelect(project)} style={{ cursor: onSelect ? 'pointer' : 'default' }}>{project.title}</h3>
          {project.featured && <span className="work-featured-label">Featured</span>}
        </div>
        <p>{project.description}</p>
        <ul className="work-tech-list" aria-label="Technologies used">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', flexWrap: 'wrap' }}>
          {onSelect && (
            <button
              type="button"
              className="button button--outline"
              style={{ minHeight: '34px', padding: '0 14px', fontSize: '11px' }}
              onClick={() => onSelect(project)}
            >
              View details
            </button>
          )}
          {project.liveUrl && (
            <a className="work-card-link" href={project.liveUrl} {...externalLinkProps}>
              Live site <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
