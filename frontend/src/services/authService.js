import api from './api'

const TOKEN_KEY = 'rizmern_admin_token'

export async function loginAdmin(credentials) {
  const response = await api.post('/auth/login', credentials)
  localStorage.setItem(TOKEN_KEY, response.data.token)
  return response.data.admin
}

export async function getCurrentAdmin() {
  const response = await api.get('/auth/me')
  return response.data
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function hasAdminToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}
