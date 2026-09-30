import { ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { instructorPageData } from '../data/siteData'

export default function InstructorCTASection() {
  return (
    <section className="page-container ip-final-section">
      <ScrollReveal>
        <div className="ip-final-banner">
          <span className="eyebrow">LEARN WITH RIZWAN</span>
          <h2>{instructorPageData.finalCta}</h2>
          <p>Meet Rizwan and discover the course in a free demo class.</p>
          <Button to="/demo">Join Free Demo Class <ArrowUpRight size={16} /></Button>
        </div>
      </ScrollReveal>
    </section>
  )
}
