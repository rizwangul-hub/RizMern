import { Banknote, Building2, Wallet } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { pricingPageData } from '../data/siteData'

const methodIcons = { JazzCash: Wallet, EasyPaisa: Banknote, 'Bank Transfer': Building2 }

export default function PaymentMethodsSection() {
  const methods = pricingPageData.paymentMethods.filter((method) => method.enabled)
  return (
    <section className="pp-section page-container" aria-labelledby="payment-methods-title">
      <ScrollReveal>
        <SectionTitle id="payment-methods-title" eyebrow="Flexible payment options" title={<>Payment <span className="gradient-text">methods</span></>} description={pricingPageData.paymentMethodsNote} />
      </ScrollReveal>
      <div className="pp-method-grid">
        {methods.map(({ name }, index) => {
          const Icon = methodIcons[name]
          return <ScrollReveal key={name} delay={index * 0.07}><GlassCard className="pp-method-card"><span><Icon size={20} /></span><h3>{name}</h3><small>Details shared after confirmation</small></GlassCard></ScrollReveal>
        })}
      </div>
      <p className="pp-method-note">{pricingPageData.paymentMethodsNote}</p>
    </section>
  )
}
