import { Blocks, BrainCircuit, Network } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { instructorPageData } from '../data/siteData'

const approachItems = [
  { title: 'Understand the structure', description: 'Learn how a project is organized and where each piece belongs.', icon: Blocks },
  { title: 'Think about architecture', description: 'See how interfaces, APIs, and data fit together as a product.', icon: Network },
  { title: 'Use AI with intention', description: 'Use AI to plan, generate, debug, and improve work you understand.', icon: BrainCircuit },
]

export default function InstructorTeachingSection() {
  return (
    <section className="ip-section page-container" aria-labelledby="instructor-approach-title">
      <ScrollReveal>
        <SectionTitle id="instructor-approach-title" eyebrow="How Rizwan teaches" title={<>Build understanding, <span className="gradient-text">not memorization</span></>} description={instructorPageData.teachingApproach} />
      </ScrollReveal>
      <div className="ip-approach-grid">
        {approachItems.map(({ title, description, icon: Icon }, index) => (
          <ScrollReveal key={title} delay={index * 0.08}>
            <GlassCard className="ip-approach-card"><span className="ip-approach-icon"><Icon size={20} /></span><h3>{title}</h3><p>{description}</p></GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
