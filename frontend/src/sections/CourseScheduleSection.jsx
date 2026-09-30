import { CalendarDays, Clock3, Monitor, Timer } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { coursePageData } from '../data/siteData'

const scheduleFields = [
  { key: 'daysPerWeek', label: 'Days per week', icon: CalendarDays },
  { key: 'classTiming', label: 'Class timing', icon: Clock3 },
  { key: 'durationPerClass', label: 'Duration per class', icon: Timer },
  { key: 'batchStartDate', label: 'Batch start date', icon: CalendarDays },
  { key: 'mode', label: 'Mode', icon: Monitor },
]

export default function CourseScheduleSection() {
  return (
    <section className="ph-section ph-schedule-section">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle eyebrow="Plan your learning" title={<>Class schedule <span className="gradient-text">at a glance</span></>} description="Schedule details will be confirmed with the upcoming batch." />
        </ScrollReveal>
        <ScrollReveal>
          <GlassCard className="ph-schedule-card">
            {scheduleFields.map(({ key, label, icon: Icon }) => (
              <div className="ph-schedule-item" key={key}><span className="ph-schedule-icon"><Icon size={18} /></span><span>{label}<b>{coursePageData.schedule[key]}</b></span></div>
            ))}
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
