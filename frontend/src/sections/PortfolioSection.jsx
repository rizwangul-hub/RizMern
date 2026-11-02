import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import ProjectGallery from '../components/ProjectGallery'
import ProjectDetailModal from '../components/ProjectDetailModal'
import useProjects from '../hooks/useProjects'

export default function PortfolioSection() {
  const { projects, loading, error, retry } = useProjects()
  const [selectedProject, setSelectedProject] = useState(null)
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    const list = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))]
    return list
  }, [projects])

  const visibleProjects = useMemo(() => {
    if (category === 'All') {
      const featured = projects.filter((p) => p.featured)
      return (featured.length >= 6 ? featured : projects).slice(0, 8)
    }
    return projects.filter((p) => p.category === category).slice(0, 8)
  }, [projects, category])

  return (
    <section className="hm-section page-container work-section company-selected-work" id="work" aria-labelledby="work-section-title">
      <SectionTitle
        id="work-section-title"
        eyebrow="My Work & Portfolio"
        title={<>Real Software, Websites &amp; Mobile <span className="gradient-text">Apps</span></>}
        description="Explore live software applications, restaurant POS platforms, property dealer systems, e-commerce stores, and mobile apps built by RizMern."
      />

      {/* Category filter tabs */}
      {!loading && !error && categories.length > 1 && (
        <div className="work-filters" aria-label="Filter portfolio projects by category" style={{ marginBottom: '28px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={category === cat ? 'is-active' : ''}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <ProjectGallery
        projects={loading || error ? [] : visibleProjects}
        loading={loading}
        error={error}
        onRetry={retry}
        onSelect={setSelectedProject}
      />

      {/* Link to all projects */}
      {!loading && !error && projects.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link className="work-view-all" to="/projects">
            Explore all {projects.length} real-world projects <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Interactive Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
