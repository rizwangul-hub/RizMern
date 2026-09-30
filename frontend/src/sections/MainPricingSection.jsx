import { useReducedMotion } from 'framer-motion'
import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, Check, Clock3, Sparkles } from 'lucide-react'
import Button from '../components/Button'
import ScrollReveal from '../components/ScrollReveal'
import { pricingPageData, siteData } from '../data/siteData'

export default function MainPricingSection() {
  const reduceMotion = useReducedMotion()
  const hasDiscount = Boolean(pricingPageData.discountedPrice)
  const limitedSeats = pricingPageData.limitedSeats.enabled

  return (
    <section className="pp-main page-container" aria-label="Course fee">
      <ScrollReveal>
        <motion.div
          className="pp-price-card"
          animate={reduceMotion ? undefined : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          <div className="pp-price-card-inner">
            {limitedSeats && <span className="pp-limited-badge"><Sparkles size={13} /> {pricingPageData.limitedSeats.count} {pricingPageData.limitedSeats.label}</span>}
            <div className="pp-price-top">
              <span className="pp-course-tag"><span className="live-dot" /> COMPLETE COURSE</span>
              <h2>{siteData.courseName}</h2>
              <span className="pp-duration"><Clock3 size={14} /> {siteData.duration} · Online</span>
            </div>
            <div className="pp-price">
              {hasDiscount && <span className="pp-regular-price">{pricingPageData.regularPrice}</span>}
              <strong>{hasDiscount ? pricingPageData.discountedPrice : pricingPageData.regularPrice}</strong>
              <small>one-time course fee</small>
            </div>
            <p className="pp-payment-note">{pricingPageData.paymentNote}</p>
            <div className="pp-includes">
              <h3><BadgeCheck size={16} /> What&apos;s included</h3>
              {pricingPageData.includedItems.map((item) => <div className="pp-include-item" key={item}><span><Check size={14} /></span>{item}</div>)}
            </div>
            <div className="pp-price-actions">
              <Button to="/admission">Apply for Admission <ArrowRight size={16} /></Button>
              <Button to="/demo" variant="outline">Join Free Demo Class</Button>
            </div>
          </div>
        </motion.div>
      </ScrollReveal>
    </section>
  )
}
