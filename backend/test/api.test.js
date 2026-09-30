const { after, before, test } = require('node:test')
const assert = require('node:assert/strict')

process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-only-secret-that-is-long-enough-to-sign-jwt-tokens'
process.env.CLIENT_URL = 'http://allowed.test,https://www.rizmern.com,https://rizmern.com'

const Lead = require('../src/models/Lead')
const Admission = require('../src/models/Admission')
const Admin = require('../src/models/Admin')
const app = require('../src/app')

const originals = {
  leadFindOne: Lead.findOne,
  leadCreate: Lead.create,
  leadFind: Lead.find,
  leadCount: Lead.countDocuments,
  leadUpdate: Lead.findByIdAndUpdate,
  leadDelete: Lead.findByIdAndDelete,
  admissionCreate: Admission.create,
  admissionFind: Admission.find,
  admissionCount: Admission.countDocuments,
  admissionUpdate: Admission.findByIdAndUpdate,
  admissionDelete: Admission.findByIdAndDelete,
  adminFindOne: Admin.findOne,
  adminFindById: Admin.findById,
}

let server
let baseUrl
let hasDuplicateLead = false
let lastLeadUpdates
const fakeAdmin = {
  id: '64b64c3f4f24c00123456789',
  _id: '64b64c3f4f24c00123456789',
  name: 'Test Admin',
  email: 'admin@example.com',
  password: 'hashed-test-password',
  comparePassword: async (password) => password === 'correct-test-password',
}
const fakeLead = {
  _id: '64b64c3f4f24c00123456780',
  name: 'Ayesha Khan',
  phone: '+923001234567',
  email: 'ayesha@example.com',
  source: 'website',
  status: 'new',
  notes: '',
  createdAt: new Date('2026-09-30T10:00:00.000Z'),
}
const fakeAdmission = {
  _id: '64b64c3f4f24c00123456781',
  fullName: 'Ayesha Khan',
  phone: '+923001234567',
  email: 'ayesha@example.com',
  city: 'Lahore',
  courseName: 'MERN Stack + React Native App Development with AI',
  paymentPlan: 'full',
  status: 'pending',
  notes: '',
  createdAt: new Date('2026-09-30T10:00:00.000Z'),
}

function fakeQuery(value) {
  return {
    sort() { return this },
    skip() { return this },
    limit() { return this },
    lean() { return Promise.resolve(value) },
  }
}

async function request(path, { method = 'GET', body, token, origin = 'http://allowed.test' } = {}) {
  const headers = { Origin: origin }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  return { status: response.status, body: await response.json() }
}

before(async () => {
  Lead.findOne = () => ({ select: () => Promise.resolve(hasDuplicateLead ? { _id: fakeLead._id } : null) })
  Lead.create = async (payload) => ({ ...fakeLead, ...payload })
  Lead.find = () => fakeQuery([fakeLead])
  Lead.countDocuments = async () => 21
  Lead.findByIdAndUpdate = async (_id, updates) => {
    lastLeadUpdates = updates
    return { ...fakeLead, ...updates.$set }
  }
  Lead.findByIdAndDelete = async () => fakeLead

  Admission.create = async (payload) => ({ ...fakeAdmission, ...payload })
  Admission.find = () => fakeQuery([fakeAdmission])
  Admission.countDocuments = async (filter = {}) => {
    if (filter.status === 'pending') return 1
    if (filter.status === 'confirmed') return 0
    return 1
  }
  Admission.findByIdAndUpdate = async (_id, updates) => ({ ...fakeAdmission, ...updates.$set })
  Admission.findByIdAndDelete = async () => fakeAdmission

  Admin.findOne = () => ({ select: () => Promise.resolve(fakeAdmin) })
  Admin.findById = () => ({ select: () => Promise.resolve(fakeAdmin) })

  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve)
  })
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  Lead.findOne = originals.leadFindOne
  Lead.create = originals.leadCreate
  Lead.find = originals.leadFind
  Lead.countDocuments = originals.leadCount
  Lead.findByIdAndUpdate = originals.leadUpdate
  Lead.findByIdAndDelete = originals.leadDelete
  Admission.create = originals.admissionCreate
  Admission.find = originals.admissionFind
  Admission.countDocuments = originals.admissionCount
  Admission.findByIdAndUpdate = originals.admissionUpdate
  Admission.findByIdAndDelete = originals.admissionDelete
  Admin.findOne = originals.adminFindOne
  Admin.findById = originals.adminFindById
})

test('health, public validation, duplicate prevention, and CORS', async () => {
  const root = await request('/')
  assert.equal(root.status, 200)
  assert.deepEqual(root.body, { message: 'RizMern API running' })

  const health = await request('/api/health')
  assert.equal(health.status, 200)
  assert.deepEqual(health.body.data, { status: 'ok' })

  const lead = await request('/api/leads', {
    method: 'POST',
    body: { name: ' Ayesha Khan ', phone: '03 001-234567', email: 'AYESHA@example.com' },
  })
  assert.equal(lead.status, 201)
  assert.equal(lead.body.data.phone, '+923001234567')
  assert.equal(lead.body.data.name, 'Ayesha Khan')

  hasDuplicateLead = true
  const duplicate = await request('/api/leads', {
    method: 'POST',
    body: { name: 'Ayesha Khan', phone: '03001234567', email: 'ayesha@example.com' },
  })
  hasDuplicateLead = false
  assert.equal(duplicate.status, 409)

  const invalidLead = await request('/api/leads', {
    method: 'POST',
    body: { name: '', phone: '12345', email: 'invalid' },
  })
  assert.equal(invalidLead.status, 422)
  assert.equal(invalidLead.body.success, false)

  const admission = await request('/api/admissions', {
    method: 'POST',
    body: {
      fullName: 'Ayesha Khan',
      phone: '+923001234567',
      email: 'ayesha@example.com',
      city: 'Lahore',
      courseName: 'MERN Stack + React Native App Development with AI',
    },
  })
  assert.equal(admission.status, 201)
  assert.equal(admission.body.data.paymentPlan, 'full')

  const invalidAdmission = await request('/api/admissions', {
    method: 'POST',
    body: { fullName: 'Ayesha', phone: '000', email: 'bad', city: '', courseName: '' },
  })
  assert.equal(invalidAdmission.status, 422)

  const blockedOrigin = await request('/api/health', { origin: 'https://unlisted.example' })
  assert.equal(blockedOrigin.status, 403)
  assert.equal((await request('/api/health', { origin: 'https://www.rizmern.com' })).status, 200)
  assert.equal((await request('/api/health', { origin: 'https://rizmern.com' })).status, 200)
})

test('admin login, protected lead and admission routes, stats, and 404', async () => {
  const unauthorized = await request('/api/leads')
  assert.equal(unauthorized.status, 401)

  const badLogin = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'admin@example.com', password: 'wrong-password' },
  })
  assert.equal(badLogin.status, 401)

  const login = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'admin@example.com', password: 'correct-test-password' },
  })
  assert.equal(login.status, 200)
  assert.equal(login.body.data.admin.password, undefined)
  const { token } = login.body.data
  assert.ok(token)

  const me = await request('/api/auth/me', { token })
  assert.equal(me.status, 200)
  assert.equal(me.body.data.password, undefined)

  const leads = await request('/api/leads?page=2&limit=10&search=ayesha&status=new', { token })
  assert.equal(leads.status, 200)
  assert.equal(leads.body.data.pagination.total, 21)
  assert.equal(leads.body.data.pagination.pages, 3)

  const leadUpdate = await request(`/api/leads/${fakeLead._id}`, { method: 'PATCH', token, body: { status: 'contacted', notes: 'Follow up' } })
  assert.equal(leadUpdate.status, 200)
  assert.deepEqual(lastLeadUpdates, { $set: { status: 'contacted', notes: 'Follow up' } })
  assert.equal(leadUpdate.body.data.status, 'contacted')
  assert.equal((await request(`/api/leads/${fakeLead._id}`, { method: 'DELETE', token })).status, 200)

  const admissions = await request('/api/admissions?status=pending&search=ayesha', { token })
  assert.equal(admissions.status, 200)
  assert.equal(admissions.body.data.items.length, 1)
  const admissionUpdate = await request(`/api/admissions/${fakeAdmission._id}`, { method: 'PATCH', token, body: { status: 'confirmed' } })
  assert.equal(admissionUpdate.status, 200)
  assert.equal(admissionUpdate.body.data.status, 'confirmed')
  assert.equal((await request(`/api/admissions/${fakeAdmission._id}`, { method: 'DELETE', token })).status, 200)

  const stats = await request('/api/stats', { token })
  assert.equal(stats.status, 200)
  assert.deepEqual(Object.keys(stats.body.data), ['totalLeads', 'leadsToday', 'totalAdmissions', 'pendingAdmissions', 'confirmedAdmissions'])

  const missing = await request('/api/not-a-route')
  assert.equal(missing.status, 404)
  assert.equal(missing.body.success, false)

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const result = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'admin@example.com', password: 'wrong-password' },
    })
    assert.equal(result.status, 401)
  }
  const rateLimited = await request('/api/auth/login', {
    method: 'POST',
    body: { email: 'admin@example.com', password: 'wrong-password' },
  })
  assert.equal(rateLimited.status, 429)
  assert.match(rateLimited.body.message, /too many login attempts/i)
})
