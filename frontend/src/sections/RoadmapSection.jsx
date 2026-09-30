import { Bot, Braces, Code2, Smartphone } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import SectionTitle from '../components/SectionTitle'

const roadmap = [
  { number: '01', title: 'Frontend foundations', text: 'Create responsive interfaces with HTML, CSS, JavaScript and React.', icon: Code2, tags: ['HTML & CSS', 'JavaScript', 'React'] },
  { number: '02', title: 'Full-stack engineering', text: 'Build APIs, connect databases, and ship complete MERN applications.', icon: Braces, tags: ['Node.js', 'Express', 'MongoDB'] },
  { number: '03', title: 'Mobile app development', text: 'Take your React skills mobile and build for iOS and Android.', icon: Smartphone, tags: ['React Native', 'Expo', 'Native UX'] },
  { number: '04', title: 'AI-powered products', text: 'Use modern AI tools to move faster and add intelligent features.', icon: Bot, tags: ['AI workflows', 'Integrations', 'Launch'] },
]

export default function RoadmapSection() {
  return (
    <section className="section page-container" id="roadmap">
      <ScrollReveal>
        <SectionTitle
          eyebrow="The learning journey"
          title={<>One path. <span className="gradient-text">Real momentum.</span></>}
          description="A practical roadmap designed to take you from the fundamentals to products you can proudly put your name on."
        />
      </ScrollReveal>
      <div className="roadmap-grid">
        {roadmap.map(({ number, title, text, icon: Icon, tags }, index) => (
          <ScrollReveal key={number} delay={index * 0.08}>
            <GlassCard className="roadmap-card">
              <div className="roadmap-top"><span className="step-number">{number}</span><span className="icon-tile"><Icon size={20} /></span></div>
              <h3>{title}</h3><p>{text}</p>
              <div className="tag-row">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
