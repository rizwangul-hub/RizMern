import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll } from 'framer-motion'
import { Sparkles, ArrowDown } from 'lucide-react'
import { THREE_CONFIG } from '../../data/threeConfig'
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
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
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
        {THREE_CONFIG.stages.map((stage) => (
          <div key={stage.id} className="laptop-fallback-card">
            <span className="laptop-stage-badge">{stage.badge}</span>
            <h3 className="laptop-stage-heading">{stage.title}</h3>
            <div className="laptop-stage-subheading">{stage.subtitle}</div>
            <p className="laptop-stage-description">{stage.description}</p>
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
      if (latest >= 0.75) stage = 3
      else if (latest >= 0.5) stage = 2
      else if (latest >= 0.25) stage = 1

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

    // Map stage to scroll percentage: 0 -> 0.05, 1 -> 0.35, 2 -> 0.65, 3 -> 0.95
    const stagePercents = [0.05, 0.35, 0.65, 0.95]
    const targetScroll = sectionStart + sectionHeight * stagePercents[targetStage]

    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }, [])

  // Fallback for reduced motion or devices without WebGL
  if (prefersReducedMotion || !hasWebGL) {
    return <StaticFallbackView />
  }

  const currentStageInfo = THREE_CONFIG.stages[activeStage] || THREE_CONFIG.stages[0]

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

            {/* 4-Dots Progress Navigation */}
            <div className="laptop-dots-nav" role="tablist" aria-label="Development stages">
              {THREE_CONFIG.stages.map((stg) => (
                <button
                  key={stg.id}
                  type="button"
                  role="tab"
                  aria-selected={activeStage === stg.id}
                  aria-label={`Jump to stage ${stg.id + 1}: ${stg.title}`}
                  className={`laptop-dot ${activeStage === stg.id ? 'active' : ''}`}
                  onClick={() => handleDotClick(stg.id)}
                />
              ))}
            </div>

            <div className="laptop-scroll-hint">
              <ArrowDown size={12} aria-hidden="true" />
              <span>Scroll to navigate through the 3D development pipeline</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollLaptopSection
