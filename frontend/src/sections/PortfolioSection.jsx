import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import ProjectGallery from '../components/ProjectGallery'
import useProjects from '../hooks/useProjects'

export default function PortfolioSection() {
  const { projects, loading, error, retry } = useProjects()
  const highlightedProjects = projects.filter((project) => project.featured)
  const featuredProjects = (highlightedProjects.length ? highlightedProjects : projects).slice(0, 6)

  return (
    <section className="hm-section page-container work-section" aria-labelledby="work-section-title">
      <SectionTitle
        id="work-section-title"
        eyebrow="Selected work"
        title={<>Websites and apps I&apos;ve <span className="gradient-text">built</span></>}
        description="A selection of real websites and applications, built for clients, businesses, and products."
      />
      <ProjectGallery
        projects={loading || error ? [] : featuredProjects}
        loading={loading}
        error={error}
        onRetry={retry}
      />
      {!loading && !error && featuredProjects.length > 0 && (
        <Link className="work-view-all" to="/projects">Explore all {projects.length} projects <ArrowRight size={16} /></Link>
      )}
    </section>
  )
}
