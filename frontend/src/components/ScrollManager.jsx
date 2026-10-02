import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '')
      let attempts = 0
      const maxAttempts = 6

      const tryScroll = () => {
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          return true
        }
        attempts += 1
        if (attempts < maxAttempts) {
          setTimeout(tryScroll, 100)
        }
        return false
      }

      // Initial try on next frame
      requestAnimationFrame(tryScroll)
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
