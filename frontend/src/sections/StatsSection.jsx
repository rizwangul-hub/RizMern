import AnimatedCounter from '../components/AnimatedCounter'
import ScrollReveal from '../components/ScrollReveal'
import { homePageData } from '../data/siteData'

export default function StatsSection() {
  return (
    <ScrollReveal className="page-container">
      <section className="hm-stats glass-card stats-3d-container" aria-label="Course highlights">
        <div className="stats-3d-accent" aria-hidden="true">
          <div className="stats-3d-ring stats-3d-ring--1" />
          <div className="stats-3d-ring stats-3d-ring--2" />
        </div>
        {homePageData.stats.map((stat) => (
          <AnimatedCounter key={stat.label} {...stat} />
        ))}
      </section>
    </ScrollReveal>
  )
}
