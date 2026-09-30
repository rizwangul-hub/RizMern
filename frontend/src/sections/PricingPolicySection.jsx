import { Info } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import { pricingPageData } from '../data/siteData'

export default function PricingPolicySection() {
  return (
    <section className="page-container pp-policy-section">
      <ScrollReveal>
        <GlassCard className="pp-policy-card"><span><Info size={18} /></span><div><h2>Refund and seat policy</h2><p>{pricingPageData.seatPolicy}</p></div></GlassCard>
      </ScrollReveal>
    </section>
  )
}
