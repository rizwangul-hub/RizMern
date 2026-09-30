import { ArrowUpRight, MessageCircle } from 'lucide-react'
import Button from '../components/Button'
import DemoForm from '../components/DemoForm'
import ScrollReveal from '../components/ScrollReveal'
import { homePageData, siteData } from '../data/siteData'

export default function DemoSection() {
  const demo = homePageData.demo

  return (
    <section className="hm-section page-container" id="demo" aria-labelledby="hm-demo-title">
      <ScrollReveal>
        <div className="hm-demo-panel">
          <div className="hm-demo-decoration hm-demo-decoration--one" />
          <div className="hm-demo-decoration hm-demo-decoration--two" />
          <div className="hm-demo-content">
            <div className="hm-demo-copy">
              <span className="eyebrow"><span className="live-dot" /> YOUR FIRST STEP IS FREE</span>
              <h2 id="hm-demo-title">{demo.title}</h2>
              <p>{demo.description}</p>
              <Button href={siteData.whatsappGroupLink} target="_blank" rel="noopener noreferrer" variant="outline">
                <MessageCircle size={17} /> {demo.groupLabel} <ArrowUpRight size={15} />
              </Button>
            </div>
            <DemoForm compact />
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
