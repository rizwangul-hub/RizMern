import { useEffect, useState } from 'react'

export default function useDeviceCapability() {
  const [capability, setCapability] = useState({
    supportsWebGL: false,
    reducedMotion: false,
    isMobile: false,
    lowPower: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 768px)')

    const detect = () => {
      const canvas = document.createElement('canvas')
      const supportsWebGL = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )

      const reducedMotion = mediaQuery.matches
      const isMobile = mobileQuery.matches || navigator.maxTouchPoints > 0
      const lowPower =
        (typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 4)

      setCapability({
        supportsWebGL,
        reducedMotion,
        isMobile,
        lowPower: lowPower || !supportsWebGL,
      })
    }

    detect()
    mediaQuery.addEventListener?.('change', detect)
    mobileQuery.addEventListener?.('change', detect)

    return () => {
      mediaQuery.removeEventListener?.('change', detect)
      mobileQuery.removeEventListener?.('change', detect)
    }
  }, [])

  return capability
}
