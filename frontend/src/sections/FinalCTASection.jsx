import { lazy, Suspense } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { homePageData } from '../data/siteData'

const CTAShape = lazy(() => import('../components/three/CTAShape'))

export default function FinalCTASection() {
  return (
    <section className="page-container hm-final-section" aria-labelledby="hm-final-title">
      <ScrollReveal>
        <div className="hm-final-banner">
          <Suspense fallback={null}>
            <CTAShape />
          </Suspense>
          <span className="eyebrow"><Sparkles size={14} /> START BUILDING YOUR FUTURE</span>
          <h2 id="hm-final-title">{homePageData.finalCta.title}</h2>
          <p>{homePageData.finalCta.description}</p>
          <Button to="/demo">Join Free Demo Class <ArrowUpRight size={16} /></Button>
          <span className="hm-final-orb hm-final-orb--one" />
          <span className="hm-final-orb hm-final-orb--two" />
        </div>
      </ScrollReveal>
    </section>
  )
}
