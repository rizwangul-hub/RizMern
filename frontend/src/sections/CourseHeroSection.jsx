import { ArrowUpRight, BookOpenCheck, Clock3, Monitor, Sparkles } from 'lucide-react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { coursePageData } from '../data/siteData'
import { siteData } from '../data/siteData'

const badgeIcons = [Clock3, Monitor, Sparkles, BookOpenCheck]

export default function CourseHeroSection() {
  return (
    <section className="ph-hero page-container" aria-labelledby="course-page-title">
      <ScrollReveal className="ph-hero-copy">
        <span className="eyebrow"><BookOpenCheck size={14} /> THE COURSE</span>
        <h1 id="course-page-title">{siteData.courseName}</h1>
        <p>{coursePageData.heroDescription}</p>
        <div className="ph-badges" aria-label="Course details">
          {coursePageData.badges.map((label, index) => {
            const Icon = badgeIcons[index]
            const badgeLabel = label === '3 Months' ? siteData.duration : label
            return <span key={label}><Icon size={14} aria-hidden="true" />{badgeLabel}</span>
          })}
        </div>
        <Button to="/demo">Join Free Demo Class <ArrowUpRight size={16} /></Button>
      </ScrollReveal>
      <ScrollReveal className="ph-hero-art" delay={0.12}>
        <div className="ph-hero-glow" />
        <div className="ph-hero-orbit ph-hero-orbit--one" />
        <div className="ph-hero-orbit ph-hero-orbit--two" />
        <div className="ph-hero-mark" role="img" aria-label="Decorative course illustration">
          <span className="ph-mark-terminal">&lt;/&gt;</span>
          <span className="ph-mark-caption">LEARN <i /> BUILD <i /> LAUNCH</span>
        </div>
      </ScrollReveal>
    </section>
  )
}
