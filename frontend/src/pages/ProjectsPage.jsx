import { useMemo, useState } from 'react'
import SEO from '../components/SEO'
import SectionTitle from '../components/SectionTitle'
import ProjectGallery from '../components/ProjectGallery'
import ProjectDetailModal from '../components/ProjectDetailModal'
import useProjects from '../hooks/useProjects'

export default function ProjectsPage() {
  const { projects, loading, error, retry } = useProjects()
  const [selectedProject, setSelectedProject] = useState(null)
  const [category, setCategory] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(projects.map((project) => project.category))], [projects])
  const visibleProjects = category === 'All' ? projects : projects.filter((project) => project.category === category)

  return (
    <>
      <SEO
        title="Projects by Rizwan Ullah | RizMern"
        description="Explore websites, full-stack applications, and mobile apps built by Rizwan Ullah."
        path="/projects"
      />
      <section className="page-container projects-page" aria-labelledby="projects-page-title">
        <SectionTitle
          id="projects-page-title"
          eyebrow="Portfolio"
          title={<>Things I&apos;ve <span className="gradient-text">built</span></>}
          description="Explore live websites and applications across full-stack, frontend, and mobile development."
        />
        {!loading && !error && categories.length > 1 && (
          <div className="work-filters" aria-label="Filter projects by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? 'is-active' : ''}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
        <ProjectGallery
          projects={visibleProjects}
          loading={loading}
          error={error}
          onRetry={retry}
          onSelect={setSelectedProject}
        />
      </section>
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}
