import { Check, Clock3, Monitor, Sparkles } from 'lucide-react'
import DemoForm from '../components/DemoForm'
import GlassCard from '../components/GlassCard'
import SEO from '../components/SEO'
import ScrollReveal from '../components/ScrollReveal'
import WhatsAppButton from '../components/WhatsAppButton'
import { homePageData, siteData } from '../data/siteData'

export default function DemoPage() {
  const demo = homePageData.demo
  return (
    <>
      <SEO
        title="Free MERN Course Demo Class Online | RizMern"
        description="Join a free online demo class to explore the MERN Stack, React Native, and AI-assisted development course at RizMern."
        path="/demo"
      />
      <section className="form-page page-container" aria-labelledby="demo-page-title">
        <ScrollReveal className="form-page-heading">
          <span className="eyebrow"><span className="live-dot" /> ONLINE · FREE · BEGINNER FRIENDLY</span>
          <h1 id="demo-page-title">Join the Free Demo Class</h1>
          <p>Meet {siteData.instructor}, explore the course, and see how you can start building real projects.</p>
        </ScrollReveal>
        <div className="demo-page-layout">
          <ScrollReveal>
            <GlassCard className="demo-benefits-card">
              <span className="demo-benefits-icon"><Sparkles size={20} /></span>
              <h2>What to expect</h2>
              <ul>{demo.benefits.map((benefit) => <li key={benefit}><Check size={16} />{benefit}</li>)}</ul>
              <div className="demo-details">
                <span><Clock3 size={16} /><b>Duration</b>{siteData.duration}</span>
                <span><Monitor size={16} /><b>Mode</b>Online</span>
                <span><Clock3 size={16} /><b>Demo date</b>{demo.date}</span>
                <span><Clock3 size={16} /><b>Demo time</b>{demo.time}</span>
              </div>
            </GlassCard>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <GlassCard className="demo-form-card">
              <h2>Save your free seat</h2>
              <p>Enter your details and we&apos;ll share the next steps.</p>
              <DemoForm />
              <WhatsAppButton mode="group" className="demo-page-whatsapp"><span>{demo.groupLabel}</span></WhatsAppButton>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
