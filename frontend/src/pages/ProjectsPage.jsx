import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import SEO from '../components/SEO'
import SectionTitle from '../components/SectionTitle'
import ProjectGallery from '../components/ProjectGallery'
import ProjectDetailModal from '../components/ProjectDetailModal'
import useProjects from '../hooks/useProjects'
import { siteData } from '../data/siteData'

export default function ProjectsPage() {
  const { projects, loading, error, retry } = useProjects()
  const [selectedProject, setSelectedProject] = useState(null)
  const [category, setCategory] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(projects.map((project) => project.category))], [projects])
  const visibleProjects = category === 'All' ? projects : projects.filter((project) => project.category === category)
  const chat = `${siteData.whatsappLink}?text=${encodeURIComponent('Hello RizMern, I would like to discuss a software/web project after seeing your portfolio.')}`

  return (
    <>
      <SEO
        title="Web & Business Software Projects Portfolio | RizMern Lahore"
        description="Explore custom business software, MERN stack websites, React applications, and mobile apps built by RizMern software company in Bahria Town, Lahore."
        path="/projects"
      />
      <section className="page-container projects-page" aria-labelledby="projects-page-title">
        <SectionTitle
          id="projects-page-title"
          as="h1"
          eyebrow="Portfolio & Case Studies"
          title={<>Software, Web &amp; Mobile <span className="gradient-text">Projects</span></>}
          description="Explore live websites, custom business software, and mobile applications built by RizMern using modern MERN stack, React Native, and cloud databases."
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
            Have a Business Software or Web Project in Mind?
          </h2>
          <p style={{ color: 'var(--text-secondary, #94a3b8)', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Whether you need a custom property dealer CRM, restaurant POS, pizza delivery system, or a high-converting website, our team in Bahria Town, Lahore is ready to build it.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href={chat} variant="primary">
              Discuss Your Project on WhatsApp <ArrowUpRight size={15} />
            </Button>
            <Button to="/contact" variant="outline">
              Get a Free Quote
            </Button>
            <Button to="/course" variant="secondary">
              Learn Coding at RizMern Academy
            </Button>
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
