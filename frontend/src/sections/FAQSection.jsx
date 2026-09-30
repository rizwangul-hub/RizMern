import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { homePageData } from '../data/siteData'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const section = homePageData.sectionContent.faq

  return (
    <section className="hm-section hm-faq-section" id="faq" aria-labelledby="hm-faq-title">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle
            id="hm-faq-title"
            eyebrow={section.eyebrow}
            title={<>{section.titleStart} <span className="gradient-text">{section.titleAccent}</span></>}
            description={section.description}
          />
        </ScrollReveal>
        <div className="hm-faq-list">
          {homePageData.faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const answerId = `hm-faq-answer-${index}`
            return (
              <ScrollReveal key={faq.question} delay={index * 0.04}>
                <GlassCard className={`hm-faq-item ${isOpen ? 'hm-faq-item--open' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="hm-faq-number">0{index + 1}</span>
                      <span>{faq.question}</span>
                      <ChevronDown size={18} aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={answerId}
                    className={`hm-faq-answer ${isOpen ? 'hm-faq-answer--open' : ''}`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
