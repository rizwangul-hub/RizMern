import { CreditCard, Receipt } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import { pricingPageData } from '../data/siteData'

export default function InstallmentSection() {
  const plan = pricingPageData.installmentPlan
  if (!plan.enabled) return null

  return (
    <section className="pp-section page-container" aria-labelledby="installment-title">
      <ScrollReveal>
        <GlassCard className="pp-installment-card">
          <span className="pp-installment-icon"><CreditCard size={20} /></span>
          <div><span className="eyebrow">PAYMENT PLAN</span><h2 id="installment-title">{plan.count} installments</h2><p>{plan.note}</p></div>
          <div className="pp-installment-amounts">{plan.amounts.map((amount, index) => <span key={`${amount}-${index}`}><Receipt size={14} />Part {index + 1}<b>{amount}</b></span>)}</div>
        </GlassCard>
      </ScrollReveal>
    </section>
  )
}
