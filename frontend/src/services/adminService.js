import api from './api'

export async function getDashboardStats() {
  const response = await api.get('/stats')
  return response.data
}

export async function getAdminRecords(type, params = {}) {
  const response = await api.get(`/${type}`, { params })
  return response.data
}

export async function getAdminProjects(params = {}) {
  const response = await api.get('/projects/admin', { params })
  return response.data
}

export async function createAdminProject(project) {
  const response = await api.post('/projects', project)
  return response.data
}

export async function updateAdminProject(id, updates) {
  const response = await api.patch(`/projects/${id}`, updates)
  return response.data
}

export async function deleteAdminProject(id) {
  const response = await api.delete(`/projects/${id}`)
  return response.data
}

export async function updateAdminRecord(type, id, updates) {
  const response = await api.patch(`/${type}/${id}`, updates)
  return response.data
}

export async function deleteAdminRecord(type, id) {
  const response = await api.delete(`/${type}/${id}`)
  return response.data
}

export async function getAllAdminRecords(type, params = {}) {
  const firstPage = await getAdminRecords(type, { ...params, page: 1, limit: 100 })
  const records = [...firstPage.items]
  for (let page = 2; page <= firstPage.pagination.pages; page += 1) {
    const result = await getAdminRecords(type, { ...params, page, limit: 100 })
    records.push(...result.items)
  }
  return records
}
