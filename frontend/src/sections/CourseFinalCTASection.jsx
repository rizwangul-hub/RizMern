import { ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { coursePageData } from '../data/siteData'

export default function CourseFinalCTASection() {
  return (
    <section className="page-container ph-final-section">
      <ScrollReveal>
        <div className="ph-final-banner">
          <span className="eyebrow">TAKE THE FIRST STEP</span>
          <h2>{coursePageData.finalCta.title}</h2>
          <p>{coursePageData.finalCta.description}</p>
          <Button to="/demo">{coursePageData.finalCta.title} <ArrowUpRight size={16} /></Button>
        </div>
      </ScrollReveal>
    </section>
  )
}
