import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Mail, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import { siteData } from '../data/siteData'

const pageContent = {
  course: {
    eyebrow: 'The curriculum',
    title: 'Everything you need to build for the web and mobile.',
    description: `${siteData.courseName} is a guided, hands-on learning journey built around practical skills and real projects.`,
    points: ['Modern JavaScript and React foundations', 'Backend APIs with Node.js and Express', 'MongoDB data modeling and integration', 'React Native app development', 'AI-assisted development workflows', 'Project building, review, and deployment'],
  },
  pricing: {
    eyebrow: 'Straightforward pricing',
    title: 'Invest in the skills that move you forward.',
    description: 'Get a guided learning experience designed to turn new skills into real things you can build.',
    points: ['Full course access for three months', 'Live guided learning sessions', 'Hands-on web and mobile projects', 'AI tools and workflows', 'Practical feedback and direction'],
  },
  instructor: {
    eyebrow: 'Your instructor',
    title: `Learn with ${siteData.instructor}.`,
    description: `${siteData.instructor} is a ${siteData.instructorTitle}, helping learners make sense of the modern web and mobile stack through practical, project-led learning.`,
    points: ['MERN stack development', 'React Native applications', 'Real-world product thinking', 'AI-assisted engineering workflows'],
  },
  demo: {
    eyebrow: 'Start with a conversation',
    title: 'Join the free demo class.',
    description: 'Get a feel for the teaching style, take a look at the learning roadmap, and bring your questions.',
    points: [`Course: ${siteData.courseName}`, `Duration: ${siteData.duration}`, `Class schedule: ${siteData.timings}`, `Instructor: ${siteData.instructor}`],
  },
  admission: {
    eyebrow: 'Your next step',
    title: 'You’re closer than you think.',
    description: 'Connect with us to ask a question, get course details, and find out how to get started.',
    points: ['No previous experience needed', 'A clear path from foundations to projects', 'Learn web, mobile, and AI workflows', 'Get a plan that fits your goals'],
  },
}

export default function InfoPage({ page }) {
  const content = pageContent[page]
  const contactPage = page === 'demo' || page === 'admission'
  return (
    <section className="info-page page-container">
      <Link to="/" className="back-link"><ArrowLeft size={15} /> Back to home</Link>
      <div className="info-layout">
        <ScrollReveal className="info-copy">
          <span className="eyebrow"><Sparkles size={14} /> {content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          {page === 'pricing' && <div className="price-display">{siteData.price}<small> / complete course</small></div>}
          {contactPage && <div className="contact-details"><span><Clock3 size={16} /> {siteData.timings}</span><a href={`mailto:${siteData.email}`}><Mail size={16} /> {siteData.email}</a></div>}
          <Button href={contactPage ? siteData.whatsappLink : `mailto:${siteData.email}`} target={contactPage ? '_blank' : undefined} rel={contactPage ? 'noreferrer' : undefined}>
            {contactPage ? 'Message us on WhatsApp' : 'Get in touch'} <ArrowRight size={16} />
          </Button>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <GlassCard className="info-card">
            <span className="info-card-label"><CheckCircle2 size={15} /> WHAT&apos;S INCLUDED</span>
            {content.points.map((point) => <div className="info-point" key={point}><span><CheckCircle2 size={16} /></span>{point}</div>)}
            <div className="info-card-note"><span className="live-dot" /> Designed to help you build with confidence.</div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
