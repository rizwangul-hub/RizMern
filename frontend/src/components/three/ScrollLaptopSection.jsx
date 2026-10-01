import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { Sparkles, ArrowDown } from 'lucide-react'
import { THREE_CONFIG } from '../../data/threeConfig'
import { siteData } from '../../data/siteData'
import Button from '../Button'
import './ScrollLaptopSection.css'

// Lazy load the 3D canvas so Three.js bundle is separated and only loaded when near viewport
const LaptopScene = lazy(() => import('./LaptopScene'))

/**
 * Checks WebGL hardware acceleration availability
 */
function checkWebGLSupport() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const supportsWebGL = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
    const lowPower =
      typeof navigator !== 'undefined' &&
      (navigator.hardwareConcurrency <= 4 || (navigator.deviceMemory && navigator.deviceMemory <= 4))
    return supportsWebGL && !lowPower
  } catch {
    return false
  }
}

/**
 * Static fallback for reduced motion, no WebGL, or low-end devices
 */
function StaticFallbackView() {
  return (
    <section className="laptop-fallback-section page-container" aria-labelledby="static-story-title">
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px' }}>
        <span className="laptop-story-eyebrow">
          <Sparkles size={13} aria-hidden="true" />
          {THREE_CONFIG.section.eyebrow}
        </span>
        <h2 id="static-story-title" className="laptop-story-title" style={{ marginTop: '8px' }}>
          {THREE_CONFIG.section.title}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '10px' }}>
          {THREE_CONFIG.section.subtitle}
        </p>
      </div>

      <div className="laptop-fallback-grid">
        {THREE_CONFIG.laptop.screens.map((screen) => (
          <div key={screen.id} className="laptop-fallback-card">
            <span className="laptop-stage-badge">{screen.badge}</span>
            <h3 className="laptop-stage-heading">{screen.title}</h3>
            <div className="laptop-stage-subheading">{screen.subtitle}</div>
            <ul className="laptop-fallback-screen-lines">
              {screen.fallbackLines.map((line) => <li key={line}>{line}</li>)}
            </ul>
            {screen.id === 'summary' && (
              <>
                <p className="laptop-stage-description">
                  {siteData.courseName} · {siteData.duration} · {siteData.classFormat} · {siteData.experienceLevel} · {siteData.instructor}
                </p>
                <Button to="/demo">{siteData.demoCtaText}</Button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export function ScrollLaptopSection() {
  const containerRef = useRef(null)
  const scrollProgressRef = useRef(0)
  const [activeStage, setActiveStage] = useState(0)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true)

  const prefersReducedMotion = useReducedMotion()
  const stages = THREE_CONFIG.laptop.screens

  // Track scroll progress via framer-motion useScroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Detect WebGL support on mount
  useEffect(() => {
    setHasWebGL(checkWebGLSupport())
  }, [])

  // Listen to scroll progress: update ref without triggering React re-render per pixel
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      scrollProgressRef.current = latest

      // Update HTML text stage only when boundary is crossed
      let stage = 0
      if (latest >= 0.808) stage = 4
      else if (latest >= 0.616) stage = 3
      else if (latest >= 0.424) stage = 2
      else if (latest >= 0.232) stage = 1

      setActiveStage((prev) => (prev !== stage ? stage : prev))
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // Lazy-load when within 600px of viewport, pause rendering when fully off-screen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true)
      setIsInViewport(true)
      return
    }

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
        }
      },
      { rootMargin: '600px 0px' }
    )

    const visibleObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    nearObserver.observe(containerRef.current)
    visibleObserver.observe(containerRef.current)

    return () => {
      nearObserver.disconnect()
      visibleObserver.disconnect()
    }
  }, [])

  // Dot click to scroll to corresponding milestone
  const handleDotClick = useCallback((targetStage) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const sectionStart = rect.top + scrollTop
    const sectionHeight = containerRef.current.offsetHeight - window.innerHeight

    const stagePercents = [0.14, 0.33, 0.52, 0.71, 0.9]
    const targetScroll = sectionStart + sectionHeight * stagePercents[targetStage]

    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }, [])

  // Fallback for reduced motion or devices without WebGL
  if (prefersReducedMotion || !hasWebGL) {
    return <StaticFallbackView />
  }

  const currentStageInfo = stages[activeStage] || stages[0]

  return (
    <section
      ref={containerRef}
      className="scroll-laptop-container"
      aria-label="3D Interactive Development Journey"
    >
      <div className="scroll-laptop-sticky">
        <div className="scroll-laptop-stage">
          {/* Left Column: 3D Canvas Stage */}
          <div className="laptop-canvas-wrapper" aria-hidden="true">
            <div className="laptop-canvas-glow" />
            {isNearViewport && (
              <Suspense
                fallback={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      color: '#94a3b8',
                      fontSize: '13px',
                    }}
                  >
                    Loading 3D Canvas…
                  </div>
                }
              >
                <LaptopScene
                  scrollProgressRef={scrollProgressRef}
                  onStageChange={setActiveStage}
                  isVisible={isInViewport}
                />
              </Suspense>
            )}
          </div>

          {/* Right Column: HTML Story & Captions */}
          <div className="laptop-story-panel">
            <div>
              <span className="laptop-story-eyebrow">
                <Sparkles size={13} aria-hidden="true" />
                {THREE_CONFIG.section.eyebrow}
              </span>
              <h2 className="laptop-story-title">{THREE_CONFIG.section.title}</h2>
            </div>

            {/* Stage Caption Card with subtle entry animation */}
            <motion.div
              key={currentStageInfo.id}
              className="laptop-story-caption-card"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="laptop-stage-badge">{currentStageInfo.badge}</span>
              <h3 className="laptop-stage-heading">{currentStageInfo.title}</h3>
              <div className="laptop-stage-subheading">{currentStageInfo.subtitle}</div>
              <p className="laptop-stage-description">{currentStageInfo.description}</p>
            </motion.div>

            <div className="laptop-dots-nav" role="tablist" aria-label="Course project stages">
              {stages.map((stg, index) => (
                <button
                  key={stg.id}
                  type="button"
                  role="tab"
                  aria-selected={activeStage === index}
                  aria-label={`Jump to stage ${index + 1}: ${stg.title}`}
                  className={`laptop-dot ${activeStage === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>

            <div className="laptop-scroll-hint">
              <ArrowDown size={12} aria-hidden="true" />
              <span>{THREE_CONFIG.section.scrollHint}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollLaptopSection
