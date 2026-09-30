const { matchedData } = require('express-validator')
const Lead = require('../models/Lead')
const apiResponse = require('../utils/apiResponse')
const { escapeRegex, getPagination } = require('../utils/pagination')

async function createLead(req, res) {
  const payload = matchedData(req, { locations: ['body'] })
  const duplicate = await Lead.findOne({
    $or: [{ phone: payload.phone }, { email: payload.email }],
  }).select('_id')

  if (duplicate) {
    return apiResponse(res, 409, {
      success: false,
      message: 'You’re already registered for the demo class. We’ll be in touch soon.',
      data: null,
    })
  }

  try {
    const lead = await Lead.create(payload)
    return apiResponse(res, 201, { success: true, message: 'Demo class registration received.', data: lead })
  } catch (error) {
    if (error.code === 11000) {
      return apiResponse(res, 409, {
        success: false,
        message: 'You’re already registered for the demo class. We’ll be in touch soon.',
        data: null,
      })
    }
    throw error
  }
}

async function listLeads(req, res) {
  const { page, limit, skip } = getPagination(req.query)
  const filter = {}
  if (req.query.status) filter.status = req.query.status
  if (req.query.search) {
    const search = new RegExp(escapeRegex(req.query.search.trim()), 'i')
    filter.$or = [{ name: search }, { phone: search }, { email: search }]
  }

  const [items, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Lead.countDocuments(filter),
  ])
  return apiResponse(res, 200, {
    success: true,
    message: 'Leads retrieved.',
    data: { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
  })
}

async function updateLead(req, res) {
  const updates = req.validatedUpdates
  const lead = await Lead.findByIdAndUpdate(req.params.id, { $set: updates }, {
    new: true,
    runValidators: true,
  })
  if (!lead) return apiResponse(res, 404, { success: false, message: 'Lead not found.', data: null })
  return apiResponse(res, 200, { success: true, message: 'Lead updated.', data: lead })
}

async function deleteLead(req, res) {
  const lead = await Lead.findByIdAndDelete(req.params.id)
  if (!lead) return apiResponse(res, 404, { success: false, message: 'Lead not found.', data: null })
  return apiResponse(res, 200, { success: true, message: 'Lead deleted.', data: { id: lead.id } })
}

module.exports = { createLead, deleteLead, listLeads, updateLead }
