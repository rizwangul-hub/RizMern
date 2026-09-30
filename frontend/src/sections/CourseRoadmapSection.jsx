import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Check, ChevronDown, Layers3 } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { coursePageData } from '../data/siteData'

export default function CourseRoadmapSection() {
  const [openMonth, setOpenMonth] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <section className="ph-section ph-roadmap-section" id="roadmap" aria-labelledby="course-roadmap-title">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle id="course-roadmap-title" eyebrow="A clear three-month path" title={<>The full <span className="gradient-text">course roadmap</span></>} description="Each month builds on the last, with weekly topics and practical outcomes to help connect the dots." />
        </ScrollReveal>
        <div className="ph-course-timeline">
          {coursePageData.roadmap.map((month, index) => {
            const isOpen = openMonth === index
            const panelId = `course-month-panel-${index}`
            return (
              <ScrollReveal key={month.month} delay={index * 0.06}>
                <article className={`ph-month ${isOpen ? 'ph-month--open' : ''}`}>
                  <span className="ph-month-node"><Layers3 size={18} aria-hidden="true" /></span>
                  <GlassCard className="ph-month-card">
                    <h3>
                      <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenMonth(isOpen ? -1 : index)}>
                        <span className="ph-month-heading"><span>{month.month}</span><b>{month.focus}</b><small>{month.summary}</small></span>
                        <ChevronDown size={19} aria-hidden="true" />
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="ph-week-list"
                          id={panelId}
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: reduceMotion ? 'auto' : 0, opacity: reduceMotion ? 1 : 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
                        >
                          {month.weeks.map((week, weekIndex) => (
                            <div className="ph-week-card" key={week.topic}>
                              <span className="ph-week-number">WEEK {weekIndex + 1}</span>
                              <div><h4>{week.topic}</h4><p>{week.explanation}</p><span className="ph-outcome"><Check size={14} />{week.outcome}</span></div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </article>
              </ScrollReveal>
            )
          })}
          <div className="ph-timeline-hint"><ArrowDown size={13} /> From foundations to projects you can share</div>
        </div>
      </div>
    </section>
  )
}
