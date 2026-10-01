const dotenv = require('dotenv')

dotenv.config()

const DEFAULT_ALLOWED_ORIGINS = [
  'https://riz-mern.vercel.app',
  'https://rizmern.vercel.app',
  'https://www.rizmern.online',
  'https://rizmern.online',
  'https://www.rizmern.com',
  'https://rizmern.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
]

function assertRequiredEnv(keys) {
  const missing = keys.filter((key) => !process.env[key]?.trim())
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

function getAllowedOrigins() {
  return (process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function isOriginAllowed(origin) {
  if (!origin) return true
  const configured = getAllowedOrigins()
  if (DEFAULT_ALLOWED_ORIGINS.includes(origin) || configured.includes(origin)) {
    return true
  }
  try {
    const url = new URL(origin)
    // Allow all Vercel deployment URLs for this project
    if (url.hostname.endsWith('.vercel.app') && (url.hostname.includes('riz-mern') || url.hostname.includes('rizmern'))) {
      return true
    }
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return true
    }
  } catch {
    return false
  }
  return false
}

module.exports = { assertRequiredEnv, getAllowedOrigins, isOriginAllowed, DEFAULT_ALLOWED_ORIGINS }
