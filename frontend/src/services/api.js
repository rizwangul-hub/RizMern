import axios from 'axios'

let unauthorizedHandler = () => {}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rizmern_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  else delete config.headers.Authorization
  return config
})

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('rizmern_admin_token')) {
      unauthorizedHandler()
    }
    const message = error.response?.data?.message
      || (error.code === 'ECONNABORTED'
        ? 'The request took too long. Please try again.'
        : error.response
          ? 'Something went wrong. Please try again.'
          : 'Unable to connect to the server. Check your connection and try again.')
    const apiError = new Error(message)
    apiError.status = error.response?.status
    apiError.code = error.code
    return Promise.reject(apiError)
  },
)

export default api
