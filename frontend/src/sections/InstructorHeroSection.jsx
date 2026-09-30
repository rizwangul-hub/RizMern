import { ArrowUpRight, CodeXml, ContactRound, MessageCircle, Sparkles } from 'lucide-react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { instructorPageData, siteData } from '../data/siteData'

export default function InstructorHeroSection() {
  return (
    <section className="ip-hero page-container" aria-labelledby="instructor-page-title">
      <ScrollReveal className="ip-portrait-wrap">
        <div className="ip-portrait-glow" />
        <div className="ip-portrait-ring ip-portrait-ring--outer" />
        <div className="ip-portrait-ring ip-portrait-ring--inner" />
        <div className="ip-portrait-placeholder" role="img" aria-label={`Portrait placeholder for ${siteData.instructor}`}><span>RU</span><i><Sparkles size={17} /></i></div>
        <span className="ip-portrait-label">YOUR INSTRUCTOR</span>
      </ScrollReveal>
      <ScrollReveal className="ip-hero-copy" delay={0.12}>
        <span className="eyebrow">MEET YOUR INSTRUCTOR</span>
        <h1 id="instructor-page-title">{siteData.instructor}</h1>
        <p className="ip-title">{siteData.instructorTitle}</p>
        <p className="ip-hero-description">Learn modern web and mobile development through connected projects, practical workflows, and a thoughtful approach to AI.</p>
        <div className="ip-social-actions">
          <Button href={instructorPageData.linkedinUrl} target="_blank" rel="noreferrer"><ContactRound size={16} /> LinkedIn <ArrowUpRight size={14} /></Button>
          <Button href={siteData.whatsappLink} target="_blank" rel="noreferrer" variant="outline"><MessageCircle size={16} /> WhatsApp</Button>
          <Button href={instructorPageData.githubUrl} target="_blank" rel="noreferrer" variant="outline"><CodeXml size={16} /> GitHub</Button>
        </div>
      </ScrollReveal>
    </section>
  )
}
