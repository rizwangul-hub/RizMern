import { useCallback } from 'react'
import useAuth from './useAuth'
import { API_BASE_URL } from '../config/api'

export function useAdminAuth() {
  const auth = useAuth()
  const apiBase = API_BASE_URL

  const authFetch = useCallback(async (endpoint, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }
    const token = localStorage.getItem('rizmern_admin_token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`
    const res = await fetch(url, {
      ...options,
      headers,
    })
    return res
  }, [apiBase])

  return {
    ...auth,
    authFetch,
    user: auth.admin,
  }
}

export default useAdminAuth
