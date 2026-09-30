import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { homePageData } from '../data/siteData'
import TechnologyGrid from './TechnologyGrid'

export default function CourseTechnologiesSection() {
  return (
    <section className="ph-section page-container" aria-labelledby="course-tech-title">
      <ScrollReveal>
        <SectionTitle id="course-tech-title" eyebrow="Tools you will explore" title={<>The technologies behind <span className="gradient-text">your projects</span></>} description="A broad toolkit—from web foundations and full stack development to publishing your work." />
      </ScrollReveal>
      <TechnologyGrid technologies={homePageData.technologies} className="ph-course-tech-grid" />
    </section>
  )
}
