import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearAdminToken, getCurrentAdmin, hasAdminToken, loginAdmin } from '../services/authService'
import { setUnauthorizedHandler } from '../services/api'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(() => hasAdminToken())

  const logout = useCallback((redirect = true) => {
    clearAdminToken()
    setAdmin(null)
    setLoading(false)
    if (redirect && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    setUnauthorizedHandler(() => logout())
    return () => setUnauthorizedHandler(() => {})
  }, [logout])

  useEffect(() => {
    let active = true
    if (!hasAdminToken()) {
      return () => { active = false }
    }
    getCurrentAdmin()
      .then((profile) => { if (active) setAdmin(profile) })
      .catch(() => { if (active) logout(false) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [logout])

  const login = useCallback(async (credentials) => {
    const profile = await loginAdmin(credentials)
    setAdmin(profile)
    return profile
  }, [])

  const value = useMemo(() => ({ admin, loading, login, logout }), [admin, loading, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
