import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import SEO from '../components/SEO'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import WhatsAppButton from '../components/WhatsAppButton'
import { thankYouData } from '../data/siteData'

function Celebration() {
  const reduceMotion = useReducedMotion()
  const pieces = useMemo(() => Array.from({ length: 18 }, (_, index) => ({
    left: `${(index * 37 + 7) % 100}%`,
    delay: `${(index % 6) * 0.16}s`,
    duration: `${2.4 + (index % 5) * 0.35}s`,
    hue: 255 + (index % 4) * 28,
  })), [])
  if (reduceMotion) return null

  return (
    <div className="thankyou-confetti" aria-hidden="true">
      {pieces.map((piece, index) => (
        <motion.i
          key={index}
          style={{ left: piece.left, backgroundColor: `hsl(${piece.hue} 85% 72%)` }}
          initial={{ y: -30, opacity: 0, rotate: 0 }}
          animate={{ y: [0, 250, 520], opacity: [0, 1, 0], rotate: [0, 180, 380] }}
          transition={{ duration: Number.parseFloat(piece.duration), delay: Number.parseFloat(piece.delay), repeat: Infinity, repeatDelay: 2.6, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

export default function ThankYouPage() {
  const location = useLocation()
  const type = location.state?.type
  const content = type === 'demo' ? thankYouData.demo : type === 'admission' ? thankYouData.admission : thankYouData.generic

  return (
    <>
      <SEO
        title="Thank You | RizMern"
        description="Thanks for getting in touch with RizMern. See the next steps for your demo or admission request."
        path="/thank-you"
        noindex
      />
      <section className="thankyou-page page-container" aria-labelledby="thankyou-title">
        <Celebration />
        <ScrollReveal>
          <GlassCard className="thankyou-card">
            <span className="thankyou-spark"><Sparkles size={24} /></span>
            <span className="thankyou-kicker">THANK YOU</span>
            <h1 id="thankyou-title">{content.title}</h1>
            <p className="thankyou-description">{content.description}</p>
            {content.steps.length > 0 && (
              <ol className="thankyou-steps">
                {content.steps.map((step, index) => <li key={step}><span><Check size={15} /></span><b>0{index + 1}</b>{step}</li>)}
              </ol>
            )}
            <div className="thankyou-actions">
              <WhatsAppButton mode="group" className="button button--primary thankyou-whatsapp">{thankYouData.groupButton} <ArrowUpRight size={16} /></WhatsAppButton>
              <Button to="/" variant="outline">{thankYouData.homeButton}</Button>
            </div>
            <Link className="thankyou-home-link" to="/">Continue exploring RizMern</Link>
          </GlassCard>
        </ScrollReveal>
      </section>
    </>
  )
}
