import { BriefcaseBusiness, Check, CircleHelp, GraduationCap, Laptop, UsersRound, Wifi } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { coursePageData } from '../data/siteData'

const audienceIcons = [GraduationCap, UsersRound, BriefcaseBusiness, BriefcaseBusiness, Laptop]

export default function CourseOverviewSection() {
  return (
    <section className="ph-section page-container" aria-labelledby="course-overview-title">
      <ScrollReveal>
        <SectionTitle id="course-overview-title" eyebrow="A practical place to start" title={<>A course built around <span className="gradient-text">your next step</span></>} description="Learn through a connected series of web, backend, database, and mobile app projects." />
      </ScrollReveal>
      <div className="ph-overview-grid">
        <ScrollReveal>
          <GlassCard className="ph-overview-card">
            <span className="ph-card-icon"><UsersRound size={19} /></span>
            <h3>Who this course is for</h3>
            <div className="ph-audience-grid">
              {coursePageData.audience.map((item, index) => {
                const Icon = audienceIcons[index]
                return <div className="ph-audience-item" key={item.title}><Icon size={15} /><span><b>{item.title}</b><small>{item.description}</small></span></div>
              })}
            </div>
          </GlassCard>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <GlassCard className="ph-overview-card">
            <span className="ph-card-icon"><Check size={19} /></span>
            <h3>What you&apos;ll be able to do</h3>
            <ul className="ph-check-list">{coursePageData.outcomes.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
          </GlassCard>
        </ScrollReveal>
        <ScrollReveal delay={0.16}>
          <GlassCard className="ph-overview-card ph-requirements-card">
            <span className="ph-card-icon"><CircleHelp size={19} /></span>
            <h3>What you need</h3>
            <ul className="ph-check-list">
              {coursePageData.requirements.map((item, index) => <li key={item}>{index === 0 ? <Laptop size={15} /> : index === 1 ? <Wifi size={15} /> : <Check size={15} />}{item}</li>)}
            </ul>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
