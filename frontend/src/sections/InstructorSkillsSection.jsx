import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { instructorPageData } from '../data/siteData'

export default function InstructorSkillsSection() {
  const reduceMotion = useReducedMotion()
  return (
    <section className="ip-section ip-skills-section" aria-labelledby="instructor-skills-title">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle id="instructor-skills-title" eyebrow="Tools and technologies" title={<>A toolkit for <span className="gradient-text">modern products</span></>} description="Explore the technologies Rizwan works with and guides learners through." />
        </ScrollReveal>
        <div className="ip-skill-tags">
          {instructorPageData.skills.map((skill, index) => (
            <motion.span
              key={skill}
              className="ip-skill-tag"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : (index % 6) * 0.05 }}
            ><Sparkles size={12} aria-hidden="true" />{skill}</motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
