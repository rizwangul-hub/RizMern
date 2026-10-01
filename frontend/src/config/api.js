/**
 * Centralized API Base URL Resolver
 * 
 * In production or on live domains, defaults to https://riz-mern.vercel.app/api
 * In local development, connects to http://localhost:5000/api
 */
export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL

  if (typeof window !== 'undefined') {
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'

    // If running in production browser on Vercel or custom domain,
    // never attempt to call localhost:5000
    if (!isLocalhost && (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
      return 'https://riz-mern.vercel.app/api'
    }
  }

  if (envUrl) return envUrl
  return import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://riz-mern.vercel.app/api'
}

export const API_BASE_URL = getApiBaseUrl()
export default API_BASE_URL
