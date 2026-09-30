import { ArrowRight, Database, Monitor, Rocket } from 'lucide-react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { homePageData } from '../data/siteData'

const journeyIcons = { monitor: Monitor, database: Database, rocket: Rocket }

export default function JourneySection() {
  const section = homePageData.sectionContent.journey
  return (
    <section className="hm-section hm-journey-section" id="roadmap" aria-labelledby="hm-journey-title">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle
            id="hm-journey-title"
            eyebrow={section.eyebrow}
            title={<>{section.titleStart} <span className="gradient-text">{section.titleAccent}</span></>}
            description={section.description}
          />
        </ScrollReveal>
        <div className="hm-timeline">
          <span className="hm-timeline-track" aria-hidden="true" />
          {homePageData.journey.map((milestone, index) => {
            const Icon = journeyIcons[milestone.icon]
            return (
              <ScrollReveal key={milestone.month} delay={index * 0.1}>
                <article className="hm-timeline-item">
                  <span className="hm-timeline-node"><Icon size={18} aria-hidden="true" /></span>
                  <div className="hm-timeline-content">
                    <span className="hm-month-label">{milestone.month}</span>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
        <ScrollReveal className="hm-journey-action">
          <Button to="/course" variant="outline">{section.button} <ArrowRight size={16} /></Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
