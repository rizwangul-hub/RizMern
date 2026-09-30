import { Sparkles } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { pricingPageData } from '../data/siteData'

export default function PricingHeroSection() {
  return (
    <section className="pp-hero page-container" aria-labelledby="pricing-page-title">
      <ScrollReveal>
        <span className="eyebrow"><Sparkles size={14} /> START WITH CLARITY</span>
        <h1 id="pricing-page-title">{pricingPageData.title}</h1>
        <p>Review the course details, what&apos;s included, and the steps to get started.</p>
      </ScrollReveal>
    </section>
  )
}
