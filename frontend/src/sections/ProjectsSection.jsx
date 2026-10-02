import { motion } from 'framer-motion'
import { Database, GraduationCap, PanelsTopLeft, Smartphone } from 'lucide-react'
import Button from '../components/Button'
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
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 35, rotateX: 18, rotateY: index % 2 === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
              style={{ transformPerspective: 1000 }}
            >
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
            </motion.div>
          )
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Button to="/projects" variant="outline">
          Explore All Real-World Projects &rarr;
        </Button>
      </div>
    </section>
  )
}
