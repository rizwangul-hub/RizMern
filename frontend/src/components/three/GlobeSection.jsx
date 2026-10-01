import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Globe2 } from 'lucide-react'
import Button from '../Button'
import useDeviceCapability from '../../hooks/useDeviceCapability'
import { siteData } from '../../data/siteData'

const GlobeScene = lazy(() => import('./GlobeScene'))

function GlobeIllustration() {
  return (
    <div className="globe-static" aria-hidden="true">
      <div className="globe-static__sphere">
        <span className="globe-static__latitude globe-static__latitude--one" />
        <span className="globe-static__latitude globe-static__latitude--two" />
        <span className="globe-static__longitude" />
        <span className="globe-static__land globe-static__land--one" />
        <span className="globe-static__land globe-static__land--two" />
        <span className="globe-static__marker"><i /></span>
      </div>
      <span className="globe-static__orbit" />
    </div>
  )
}

function StaticFallback() {
  return <GlobeIllustration />
}

export default function GlobeSection() {
  const sectionRef = useRef(null)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [contextLost, setContextLost] = useState(false)
  const { supportsWebGL, reducedMotion, lowPower } = useDeviceCapability()
  const useFallback = !supportsWebGL || reducedMotion || lowPower || contextLost

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true)
      setIsVisible(true)
      return undefined
    }

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          loadObserver.disconnect()
        }
      },
      { rootMargin: '500px 0px' }
    )
    const visibleObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.04 }
    )

    loadObserver.observe(section)
    visibleObserver.observe(section)
    return () => {
      loadObserver.disconnect()
      visibleObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = sectionRef.current?.querySelector('.globe-canvas canvas')
    if (!canvas || useFallback) return undefined

    const handleContextLost = (event) => {
      event.preventDefault()
      setContextLost(true)
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    return () => canvas.removeEventListener('webglcontextlost', handleContextLost)
  }, [isNearViewport, useFallback])

  return (
    <section ref={sectionRef} className="globe-section page-container" aria-labelledby="globe-section-title">
      <div className="globe-section__copy">
        <span className="globe-section__eyebrow">
          <Globe2 size={16} aria-hidden="true" />
          Learn without borders
        </span>
        <h2 id="globe-section-title">Learn Online from <span className="gradient-text">Anywhere</span></h2>
        <p>Live online classes for students in Pakistan and across the world</p>
        <div className="globe-section__actions">
          <Button href={siteData.whatsappGroupLink} target="_blank" rel="noreferrer">
            Join the WhatsApp Group <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
          <Button to="/demo" variant="outline">Book a Free Demo</Button>
        </div>
      </div>

      <div className="globe-section__visual" role="img" aria-label="A globe showing RizMern online learning connections from Pakistan">
        {useFallback ? (
          <StaticFallback />
        ) : (
          <>
            <div className="globe-canvas-placeholder">
              <GlobeIllustration />
            </div>
            {isNearViewport && (
              <Suspense fallback={<StaticFallback />}>
                <div className="globe-canvas">
                  <GlobeScene isVisible={isVisible} />
                </div>
              </Suspense>
            )}
          </>
        )}
      </div>
    </section>
  )
}
