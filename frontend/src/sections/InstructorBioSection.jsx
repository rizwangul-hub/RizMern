import { BookOpenText, CodeXml, Lightbulb } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { instructorPageData } from '../data/siteData'

const bioIcons = [CodeXml, BookOpenText, Lightbulb, Lightbulb]

export default function InstructorBioSection() {
  return (
    <section className="ip-section page-container" aria-labelledby="instructor-bio-title">
      <ScrollReveal>
        <SectionTitle id="instructor-bio-title" eyebrow="A little about Rizwan" title={<>The person behind <span className="gradient-text">the projects</span></>} description="Learn from a developer who cares about clear thinking, real workflows, and making useful things." />
      </ScrollReveal>
      <div className="ip-bio-grid">
        {instructorPageData.bio.map((paragraph, index) => {
          const Icon = bioIcons[index]
          return <ScrollReveal key={paragraph} delay={index * 0.06}><GlassCard className="ip-bio-card"><span><Icon size={18} /></span><p>{paragraph}</p></GlassCard></ScrollReveal>
        })}
      </div>
    </section>
  )
}
