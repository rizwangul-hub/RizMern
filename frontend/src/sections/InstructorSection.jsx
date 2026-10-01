import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { homePageData, instructorPageData, siteData } from '../data/siteData'
import profileImage from '../assets/profile.jpg'

export default function InstructorSection() {
  const section = homePageData.sectionContent.instructor
  return (
    <section className="hm-section page-container" aria-labelledby="hm-instructor-title">
      <div className="hm-instructor-layout">
        <ScrollReveal className="hm-instructor-portrait">
          <div className="hm-portrait-ring hm-portrait-ring--outer" />
          <div className="hm-portrait-ring hm-portrait-ring--inner" />
          <img
            className="hm-portrait-placeholder"
            src={profileImage}
            alt={`${siteData.instructor}, ${siteData.instructorTitle}`}
            width="155"
            height="155"
            loading="lazy"
          />
          <i className="hm-portrait-badge" aria-hidden="true"><Sparkles size={16} /></i>
          <span className="hm-portrait-caption"><BriefcaseBusiness size={14} /> {section.label}</span>
        </ScrollReveal>
        <ScrollReveal className="hm-instructor-copy" delay={0.12}>
          <span className="eyebrow">{section.eyebrow}</span>
          <h2 id="hm-instructor-title">Meet <span className="gradient-text">{siteData.instructor}</span></h2>
          <h3>{siteData.instructorTitle}</h3>
          {siteData.instructorBio.map((line) => <p key={line}>{line}</p>)}
          <div className="hm-instructor-links">
            <Button href={instructorPageData.linkedinUrl} target="_blank" rel="noreferrer">{section.button} <ArrowUpRight size={15} /></Button>
            <Link className="hm-text-link" to="/instructor">{section.moreLink} <ArrowRight size={15} /></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
