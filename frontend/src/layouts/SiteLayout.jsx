import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Analytics from '../components/Analytics'
import BackgroundEffects from '../components/BackgroundEffects'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsAppButton'

export default function SiteLayout() {
  return (
    <>
      <BackgroundEffects />
      <Analytics />
      <Navbar />
      <Breadcrumbs />
      <main className="site-main"><Outlet /></main>
      <Footer />
      <WhatsAppButton className="whatsapp-float" />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#17182b', color: '#f4f5ff', border: '1px solid rgba(179,182,221,.18)' },
        }}
      />
    </>
  )
}
