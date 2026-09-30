import ProjectCard from './ProjectCard'

export default function ProjectGallery({ projects, loading, error, onRetry, onSelect }) {
  if (loading) {
    return <p className="work-feedback" role="status">Loading project work…</p>
  }
  if (error) {
    return (
      <div className="work-feedback work-feedback--error" role="alert">
        <p>Projects are unavailable right now. {error}</p>
        <button type="button" onClick={onRetry}>Try again</button>
      </div>
    )
  }
  if (!projects.length) {
    return <p className="work-feedback">New projects are coming soon.</p>
  }

  return (
    <div className="work-grid">
      {projects.map((project) => <ProjectCard key={project._id || project.slug} project={project} onSelect={onSelect} />)}
    </div>
  )
}
