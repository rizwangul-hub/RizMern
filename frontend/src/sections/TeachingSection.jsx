import {
  BriefcaseBusiness,
  Check,
  FolderTree,
  Globe,
  Layers3,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'
import { homePageData } from '../data/siteData'

const featureIcons = {
  sparkles: Sparkles,
  folders: FolderTree,
  layers: Layers3,
  globe: Globe,
  briefcase: BriefcaseBusiness,
  users: UsersRound,
}

export default function TeachingSection() {
  const { teaching } = homePageData
  const section = homePageData.sectionContent.teaching
  return (
    <section className="hm-section hm-teaching-section" aria-labelledby="hm-teaching-title">
      <div className="page-container">
        <ScrollReveal>
          <SectionTitle
            id="hm-teaching-title"
            eyebrow={section.eyebrow}
            title={<>{section.titleStart} <span className="gradient-text">{section.titleAccent}</span></>}
            description={teaching.description}
          />
        </ScrollReveal>
        <div className="hm-feature-grid">
          {teaching.features.map((feature, index) => {
            const Icon = featureIcons[feature.icon]
            return (
              <ScrollReveal key={feature.title} delay={(index % 3) * 0.06}>
                <GlassCard className="hm-feature-card">
                  <span className="hm-feature-icon"><Icon size={19} aria-hidden="true" /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </GlassCard>
              </ScrollReveal>
            )
          })}
        </div>
        <div className="hm-comparison" aria-label="The old way compared with the RizMern way">
          {[teaching.comparison.oldTitle, teaching.comparison.newTitle].map((title, column) => {
            const isNewWay = column === 1
            const items = isNewWay ? teaching.comparison.newItems : teaching.comparison.oldItems
            return (
              <ScrollReveal className={`hm-comparison-card ${isNewWay ? 'hm-comparison-card--new' : ''}`} key={title}>
                <GlassCard className="hm-comparison-inner">
                  <span className="hm-comparison-kicker">{isNewWay ? 'THE RIZMERN APPROACH' : 'A COMMON APPROACH'}</span>
                  <h3>{title}</h3>
                  <ul>
                    {items.map((item, index) => (
                      <li key={item}>
                        <span
                          className="hm-comparison-check hm-comparison-check--reveal"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {isNewWay ? <Check size={15} /> : <span aria-hidden="true">–</span>}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
