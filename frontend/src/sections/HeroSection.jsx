import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, Braces, Code2, Database, Terminal } from 'lucide-react'
import Button from '../components/Button'
import { homePageData, siteData } from '../data/siteData'

const HeroScene = lazy(() => import('../components/three/HeroScene'))

const techGlyphs = {
  React: { icon: Code2, className: 'hm-tech--react' },
  'Node.js': { icon: Terminal, className: 'hm-tech--node' },
  MongoDB: { icon: Database, className: 'hm-tech--mongo' },
  AI: { icon: Braces, className: 'hm-tech--ai' },
}

function TypingLine() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const phrases = homePageData.hero.rotatingPhrases
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) return undefined

    const phrase = phrases[phraseIndex]
    const finishedTyping = visibleText === phrase
    const finishedDeleting = visibleText.length === 0 && deleting
    const wait = finishedTyping ? 1500 : finishedDeleting ? 240 : deleting ? 34 : 65
    const timer = window.setTimeout(() => {
      if (finishedTyping) setDeleting(true)
      else if (finishedDeleting) {
        setDeleting(false)
        setPhraseIndex((current) => (current + 1) % phrases.length)
      } else {
        setVisibleText(phrase.slice(0, visibleText.length + (deleting ? -1 : 1)))
      }
    }, wait)

    return () => window.clearTimeout(timer)
  }, [deleting, phraseIndex, phrases, reduceMotion, visibleText])

  return (
    <span className="hm-typing-line">
      <span aria-hidden="true">{reduceMotion ? phrases[0] : visibleText}</span>{!reduceMotion && <span className="hm-caret" aria-hidden="true" />}
    </span>
  )
}

function CodeMockup() {
  return (
    <div className="hm-hero-art" role="img" aria-label={homePageData.sectionContent.editorImageLabel}>
      <div className="hm-hero-halo" />
      <div className="hm-hero-orbit hm-hero-orbit--one" />
      <div className="hm-hero-orbit hm-hero-orbit--two" />
      <Suspense fallback={<div className="three-hero-placeholder" aria-hidden="true" />}>
        <HeroScene />
      </Suspense>
      <div className="hm-code-editor hm-hero-enter" style={{ animationDelay: '0.28s' }}>
        <div className="hm-editor-bar">
          <span className="hm-editor-dots"><i /><i /><i /></span>
          <span>{homePageData.hero.editorTitle}</span>
          <Terminal size={15} aria-hidden="true" />
        </div>
        <div className="hm-editor-body">
          {homePageData.hero.editorLines.map((line) => (
            <div className="hm-editor-line" key={line.number}>
              <span className="hm-line-number">{line.number}</span>
              <code><b>{line.keyword}</b> <em>{line.variable}</em> <span>=</span> <strong>{line.value}</strong></code>
            </div>
          ))}
          <div className="hm-editor-line"><span className="hm-line-number">{homePageData.hero.editorLaunchLine.number}</span><code><b>{homePageData.hero.editorLaunchLine.keyword}</b>(<em>{homePageData.hero.editorLaunchLine.variable}</em>)<i>{homePageData.hero.editorLaunchLine.suffix}</i><span className="hm-caret" /></code></div>
        </div>
        <div className="hm-editor-foot"><span><i /> {homePageData.hero.editorStatus}</span><span>{homePageData.hero.editorDomain}</span></div>
      </div>
      {homePageData.hero.techItems.map((name, index) => {
        const tech = techGlyphs[name]
        const Icon = tech.icon
        return (
          <div
            key={name}
            className={`hm-tech-float ${tech.className}`}
            style={{ animationDelay: `${index * 0.25}s`, animationDuration: `${5 + index * 0.6}s` }}
          >
            <span><Icon size={17} aria-hidden="true" /></span>{name}
          </div>
        )
      })}
    </div>
  )
}

export default function HeroSection() {
  const entrance = (delay) => ({ className: 'hm-hero-enter', style: { animationDelay: `${delay}s` } })

  return (
    <section className="hm-hero page-container" aria-labelledby="home-hero-title">
      <div className="hm-hero-copy">
        <span className={`hm-hero-eyebrow ${entrance(0.05).className}`} style={entrance(0.05).style}>
          <span className="live-dot" /> {homePageData.hero.eyebrow}
        </span>
        <h1 id="home-hero-title">
          {homePageData.hero.titlePrefix} <span className="gradient-text">{homePageData.hero.titleAccent}</span>
        </h1>
        <p className={`hm-hero-description ${entrance(0.23).className}`} style={entrance(0.23).style}>{homePageData.hero.description}</p>
        <div className={`hm-typing-wrap ${entrance(0.3).className}`} style={entrance(0.3).style}>
          <span className="hm-typing-label">{homePageData.hero.typingPrefix}</span><TypingLine />
        </div>
        <div className={`hm-hero-actions ${entrance(0.38).className}`} style={entrance(0.38).style}>
          <Button to="/demo">{homePageData.hero.demoButton} <ArrowUpRight size={16} /></Button>
          <Button to="/course" variant="outline">{homePageData.hero.courseButton} <ArrowRight size={16} /></Button>
        </div>
        <p className={`hm-trust-line ${entrance(0.46).className}`} style={entrance(0.46).style}>
          <span><i /> {homePageData.hero.trustLine}</span>
          <small>{siteData.duration} with {siteData.instructor}</small>
        </p>
      </div>
      <CodeMockup />
    </section>
  )
}
