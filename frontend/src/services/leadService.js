import api from './api'

export async function createLead(lead) {
  return api.post('/leads', lead)
}
