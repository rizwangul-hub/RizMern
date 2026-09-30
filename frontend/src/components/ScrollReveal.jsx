import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({ children, className = '', delay = 0, style, ...props }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)
  ))

  useEffect(() => {
    if (visible) return undefined
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? 'scroll-reveal--visible' : ''} ${className}`.trim()}
      style={{ ...style, '--reveal-delay': `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  )
}
