import { ArrowRight, Bug, Lightbulb, Sparkles, WandSparkles } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { coursePageData } from '../data/siteData'

const workflowIcons = [Lightbulb, WandSparkles, Bug, Sparkles]

export default function CourseAISection() {
  const { aiWorkflow } = coursePageData
  return (
    <section className="ph-section ph-ai-section">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle eyebrow={aiWorkflow.eyebrow} title={<>{aiWorkflow.titleStart} <span className="gradient-text">{aiWorkflow.titleAccent}</span></>} description={aiWorkflow.description} />
        </ScrollReveal>
        <div className="ph-ai-grid">
          {aiWorkflow.steps.map((step, index) => {
            const Icon = workflowIcons[index]
            return <ScrollReveal key={step.title} delay={index * 0.07}><GlassCard className="ph-ai-card"><span className="ph-card-icon"><Icon size={19} /></span><span className="ph-ai-step">STEP 0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></GlassCard></ScrollReveal>
          })}
        </div>
        <div className="ph-ai-note"><span><Sparkles size={17} /></span><p>AI is a tool in the workflow—not a replacement for understanding the structure and architecture of what you build.</p><ArrowRight size={17} /></div>
      </div>
    </section>
  )
}
