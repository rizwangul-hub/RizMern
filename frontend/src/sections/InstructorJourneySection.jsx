import { useReducedMotion } from 'framer-motion'
import { ArrowDown, CircleDot } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { instructorPageData } from '../data/siteData'

export default function InstructorJourneySection() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="ip-section ip-journey-section" aria-labelledby="instructor-journey-title">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle id="instructor-journey-title" eyebrow="Experience and milestones" title={<>A developer&apos;s <span className="gradient-text">journey</span></>} description="More experience and project milestones can be added here as the story grows." />
        </ScrollReveal>
        <div className="ip-milestones">
          <span className={`ip-milestone-line ${reduceMotion ? 'ip-milestone-line--static' : ''}`} />
          {instructorPageData.journey.map((item, index) => (
            <ScrollReveal key={`${item.title}-${item.date}`} delay={index * 0.08}>
              <article className="ip-milestone">
                <span className="ip-milestone-node"><CircleDot size={19} /></span>
                <GlassCard className="ip-milestone-card"><span>{item.date}</span><h3>{item.title}</h3><p>{item.description}</p></GlassCard>
              </article>
            </ScrollReveal>
          ))}
          <div className="ip-milestone-foot"><ArrowDown size={13} /> More milestones can be added here</div>
        </div>
      </div>
    </section>
  )
}
