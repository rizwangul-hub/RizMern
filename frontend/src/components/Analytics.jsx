import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const measurementId = import.meta.env.VITE_GA_ID

export default function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!measurementId || document.querySelector('[data-rizmern-ga]')) return
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    script.dataset.rizmernGa = 'true'
    document.head.appendChild(script)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', measurementId, { send_page_view: false })
  }, [])

  useEffect(() => {
    if (measurementId && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: `${pathname}${search}` })
    }
  }, [pathname, search])

  return null
}
