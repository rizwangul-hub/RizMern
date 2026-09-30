import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-800.css'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const application = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (root.hasChildNodes()) {
  document.head.querySelectorAll(
    'title, meta[name="description"], meta[name="robots"], meta[name="googlebot"], meta[name="google-site-verification"], meta[http-equiv="content-language"], meta[name="theme-color"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], script[type="application/ld+json"]',
  ).forEach((element) => element.remove())
}

createRoot(root).render(application)
