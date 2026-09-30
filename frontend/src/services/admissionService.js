import api from './api'

export async function createAdmission(admission) {
  return api.post('/admissions', admission)
}
