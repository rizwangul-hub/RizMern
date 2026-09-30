import api from './api'

export async function getPublicProjects() {
  const response = await api.get('/projects')
  return response.data
}
