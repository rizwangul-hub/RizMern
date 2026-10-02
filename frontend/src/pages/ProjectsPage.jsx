import { useMemo, useState } from 'react'
import Button from '../components/Button'
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
        title="MERN Stack Projects & Full Stack Web Portfolio | RizMern"
        description="Explore real-world MERN Stack websites, React applications, and React Native mobile apps built with AI-assisted workflows by Rizwan Ullah."
        path="/projects"
      />
      <section className="page-container projects-page" aria-labelledby="projects-page-title">
        <SectionTitle
          id="projects-page-title"
          as="h1"
          eyebrow="Portfolio & Case Studies"
          title={<>MERN Stack &amp; Web <span className="gradient-text">Projects</span></>}
          description="Explore live websites, full-stack applications, and mobile apps built with React, Node.js, Express, MongoDB, and AI-assisted workflows."
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
        <div style={{ textAlign: 'center', marginTop: '3.5rem', padding: '2.5rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#fff' }}>
            Want to Build Projects Like These?
          </h2>
          <p style={{ color: 'var(--text-secondary, #94a3b8)', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Learn how to build production-ready MERN stack web applications and React Native mobile apps with AI-assisted workflows in our 3-month course.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button to="/demo" variant="primary">Join Free Demo Class</Button>
            <Button to="/course" variant="secondary">View Full Course Details</Button>
          </div>
        </div>
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
