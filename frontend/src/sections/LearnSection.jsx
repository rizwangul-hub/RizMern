import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { homePageData } from '../data/siteData'
import TechnologyGrid from './TechnologyGrid'

export default function LearnSection() {
  const section = homePageData.sectionContent.learn
  return (
    <section className="hm-section page-container" id="learn" aria-labelledby="hm-learn-title">
      <ScrollReveal>
        <SectionTitle
          id="hm-learn-title"
          eyebrow={section.eyebrow}
          title={<>{section.titleStart} <span className="gradient-text">{section.titleAccent}</span></>}
          description={section.description}
        />
      </ScrollReveal>
      <TechnologyGrid technologies={homePageData.technologies} />
    </section>
  )
}
