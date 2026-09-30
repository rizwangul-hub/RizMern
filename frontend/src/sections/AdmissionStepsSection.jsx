import { ArrowRight, CheckCircle2, MessageCircle, PlayCircle, UserRoundCheck } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { pricingPageData } from '../data/siteData'

const stepIcons = [PlayCircle, MessageCircle, CheckCircle2, UserRoundCheck]

export default function AdmissionStepsSection() {
  return (
    <section className="pp-section pp-admission-section" aria-labelledby="admission-steps-title">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle id="admission-steps-title" eyebrow="A simple process" title={<>How admission <span className="gradient-text">works</span></>} description="Get to know the course and instructor, then decide on your next step." />
        </ScrollReveal>
        <div className="pp-steps-grid">
          {pricingPageData.admissionSteps.map((step, index) => {
            const Icon = stepIcons[index]
            return <ScrollReveal key={step.title} delay={index * 0.08}><GlassCard className="pp-step-card"><div className="pp-step-top"><span>0{index + 1}</span><i><Icon size={19} /></i></div><h3>{step.title}</h3><p>{step.description}</p>{index < pricingPageData.admissionSteps.length - 1 && <ArrowRight className="pp-step-arrow" size={16} />}</GlassCard></ScrollReveal>
          })}
        </div>
      </div>
    </section>
  )
}
