import { Check, CirclePlay, ContactRound, FileArchive, MessageCircle, MonitorPlay, Rocket, ScrollText } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { coursePageData } from '../data/siteData'

const inclusionIcons = {
  liveClasses: MonitorPlay,
  recordedLessons: CirclePlay,
  projectFiles: FileArchive,
  whatsappSupport: MessageCircle,
  deploymentHelp: Rocket,
  linkedinGuidance: ContactRound,
  certificate: ScrollText,
}

export default function CourseInclusionsSection() {
  return (
    <section className="ph-section page-container" aria-labelledby="course-inclusions-title">
      <ScrollReveal>
        <SectionTitle id="course-inclusions-title" eyebrow="Support for the journey" title={<>What you <span className="gradient-text">get</span></>} description="A learning experience designed to help you practice, build, and share your progress." />
      </ScrollReveal>
      <div className="ph-inclusion-grid">
        {coursePageData.inclusions.filter((item) => item.enabled).map((item, index) => {
          const Icon = inclusionIcons[item.id]
          return (
            <ScrollReveal key={item.id} delay={(index % 4) * 0.05}>
              <GlassCard className="ph-inclusion-card"><span className="ph-inclusion-icon"><Icon size={19} /></span><span>{item.label}</span><Check size={15} className="ph-inclusion-check" aria-hidden="true" /></GlassCard>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}
