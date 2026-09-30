import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { homePageData, siteData } from '../data/siteData'

export default function InstructorSection() {
  const section = homePageData.sectionContent.instructor
  return (
    <section className="hm-section page-container" aria-labelledby="hm-instructor-title">
      <div className="hm-instructor-layout">
        <ScrollReveal className="hm-instructor-portrait">
          <div className="hm-portrait-ring hm-portrait-ring--outer" />
          <div className="hm-portrait-ring hm-portrait-ring--inner" />
          <div className="hm-portrait-placeholder" role="img" aria-label={`Portrait placeholder for ${siteData.instructor}`}>
            <span>RU</span><i><Sparkles size={16} /></i>
          </div>
          <span className="hm-portrait-caption"><BriefcaseBusiness size={14} /> {section.label}</span>
        </ScrollReveal>
        <ScrollReveal className="hm-instructor-copy" delay={0.12}>
          <span className="eyebrow">{section.eyebrow}</span>
          <h2 id="hm-instructor-title">Meet <span className="gradient-text">{siteData.instructor}</span></h2>
          <h3>{siteData.instructorTitle}</h3>
          {siteData.instructorBio.map((line) => <p key={line}>{line}</p>)}
          <div className="hm-instructor-links">
            <Button href="https://www.linkedin.com/" target="_blank" rel="noreferrer">{section.button} <ArrowUpRight size={15} /></Button>
            <Link className="hm-text-link" to="/instructor">{section.moreLink} <ArrowRight size={15} /></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
