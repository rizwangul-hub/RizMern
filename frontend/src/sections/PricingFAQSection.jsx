import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { pricingPageData } from '../data/siteData'

export default function PricingFAQSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <section className="pp-section pp-faq-section" aria-labelledby="pricing-faq-title">
      <div className="page-container">
        <ScrollReveal><SectionTitle id="pricing-faq-title" eyebrow="Pricing questions" title={<>Fee and admission <span className="gradient-text">FAQs</span></>} /></ScrollReveal>
        <div className="pp-faq-list">
          {pricingPageData.faqs.map((faq, index) => {
            const open = openIndex === index
            const answerId = `pricing-faq-answer-${index}`
            return (
              <ScrollReveal key={faq.question} delay={index * 0.05}>
                <GlassCard className={`hm-faq-item ${open ? 'hm-faq-item--open' : ''}`}>
                  <h3><button type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpenIndex(open ? -1 : index)}><span className="hm-faq-number">0{index + 1}</span><span>{faq.question}</span><ChevronDown size={18} aria-hidden="true" /></button></h3>
                  <AnimatePresence initial={false}>{open && <motion.div id={answerId} className="hm-faq-answer" key="answer" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: reduceMotion ? 'auto' : 0, opacity: reduceMotion ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}><p>{faq.answer}</p></motion.div>}</AnimatePresence>
                </GlassCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
