import AnimatedCounter from '../components/AnimatedCounter'
import ScrollReveal from '../components/ScrollReveal'
import { homePageData } from '../data/siteData'

export default function StatsSection() {
  return (
    <ScrollReveal className="page-container">
      <section className="hm-stats glass-card" aria-label="Course highlights">
        {homePageData.stats.map((stat) => (
          <AnimatedCounter key={stat.label} {...stat} />
        ))}
      </section>
    </ScrollReveal>
  )
}
