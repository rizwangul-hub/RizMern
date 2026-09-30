const { matchedData } = require('express-validator')
const Admission = require('../models/Admission')
const apiResponse = require('../utils/apiResponse')
const { escapeRegex, getPagination } = require('../utils/pagination')

async function createAdmission(req, res) {
  const payload = matchedData(req, { locations: ['body'] })
  const admission = await Admission.create(payload)
  return apiResponse(res, 201, { success: true, message: 'Admission request received.', data: admission })
}

async function listAdmissions(req, res) {
  const { page, limit, skip } = getPagination(req.query)
  const filter = {}
  if (req.query.status) filter.status = req.query.status
  if (req.query.search) {
    const search = new RegExp(escapeRegex(req.query.search.trim()), 'i')
    filter.$or = [{ fullName: search }, { phone: search }, { email: search }]
  }

  const [items, total] = await Promise.all([
    Admission.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Admission.countDocuments(filter),
  ])
  return apiResponse(res, 200, {
    success: true,
    message: 'Admission requests retrieved.',
    data: { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
  })
}

async function updateAdmission(req, res) {
  const admission = await Admission.findByIdAndUpdate(req.params.id, { $set: req.validatedUpdates }, {
    new: true,
    runValidators: true,
  })
  if (!admission) return apiResponse(res, 404, { success: false, message: 'Admission request not found.', data: null })
  return apiResponse(res, 200, { success: true, message: 'Admission request updated.', data: admission })
}

async function deleteAdmission(req, res) {
  const admission = await Admission.findByIdAndDelete(req.params.id)
  if (!admission) return apiResponse(res, 404, { success: false, message: 'Admission request not found.', data: null })
  return apiResponse(res, 200, { success: true, message: 'Admission request deleted.', data: { id: admission.id } })
}

module.exports = { createAdmission, deleteAdmission, listAdmissions, updateAdmission }
