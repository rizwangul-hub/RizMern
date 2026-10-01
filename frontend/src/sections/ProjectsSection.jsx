import { Database, GraduationCap, PanelsTopLeft, Smartphone } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import TiltCard from '../components/three/TiltCard'
import { homePageData } from '../data/siteData'

const projectIcons = {
  panels: PanelsTopLeft,
  database: Database,
  graduation: GraduationCap,
  smartphone: Smartphone,
}

export default function ProjectsSection() {
  const section = homePageData.sectionContent.projects
  return (
    <section className="hm-section page-container" aria-labelledby="hm-projects-title">
      <ScrollReveal>
        <SectionTitle
          id="hm-projects-title"
          eyebrow={section.eyebrow}
          title={<>{section.titleStart} <span className="gradient-text">{section.titleAccent}</span></>}
          description={section.description}
        />
      </ScrollReveal>
      <div className="hm-project-grid">
        {homePageData.projects.map((project, index) => {
          const Icon = projectIcons[project.icon]
          return (
            <ScrollReveal key={project.title} delay={index * 0.07}>
              <TiltCard className="project-tilt-card">
                <GlassCard className={`hm-project-card hm-project-card--${project.accent}`}>
                  <div className="hm-project-art" role="img" aria-label={`${project.title} project preview illustration`}>
                    <div className="hm-project-art-glow" />
                    <div className="hm-project-browser">
                      <div className="hm-project-browser-bar"><i /><i /><i /><span>project-preview</span></div>
                      <div className="hm-project-browser-content">
                        <span className="hm-project-brand">R.</span>
                        <span className="hm-project-lines"><i /><i /><i /></span>
                        <span className="hm-project-icon"><Icon size={25} aria-hidden="true" /></span>
                      </div>
                    </div>
                    <span className="hm-project-count">0{index + 1} / 04</span>
                  </div>
                  <div className="hm-project-copy"><h3>{project.title}</h3><p>{project.description}</p></div>
                </GlassCard>
              </TiltCard>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
