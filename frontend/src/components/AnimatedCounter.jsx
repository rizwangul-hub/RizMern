import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ value, suffix = '', label, detail }) {
  const ref = useRef(null)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [inView, setInView] = useState(() => reduceMotion || !('IntersectionObserver' in window))
  const [display, setDisplay] = useState(() => reduceMotion ? value : 0)

  useEffect(() => {
    if (inView) return undefined
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.4 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [inView])

  useEffect(() => {
    if (!inView) return undefined
    if (reduceMotion) return undefined

    let frameId
    let startTime
    const duration = 1100
    const animate = (time) => {
      if (startTime === undefined) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      setDisplay(Math.round(value * progress))
      if (progress < 1) frameId = window.requestAnimationFrame(animate)
    }
    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [inView, reduceMotion, value])

  return (
    <div className="stat hm-stat" ref={ref}>
      <strong><span>{reduceMotion ? (inView ? value : 0) : display}</span>{suffix}</strong>
      <span>{label}</span>
      {detail && <small>{detail}</small>}
    </div>
  )
}
