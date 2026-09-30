const Admission = require('../models/Admission')
const Lead = require('../models/Lead')
const apiResponse = require('../utils/apiResponse')

async function getStats(req, res) {
  const startOfToday = new Date()
  startOfToday.setUTCHours(0, 0, 0, 0)

  const [totalLeads, leadsToday, totalAdmissions, pendingAdmissions, confirmedAdmissions] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ createdAt: { $gte: startOfToday } }),
    Admission.countDocuments(),
    Admission.countDocuments({ status: 'pending' }),
    Admission.countDocuments({ status: 'confirmed' }),
  ])

  return apiResponse(res, 200, {
    success: true,
    message: 'Dashboard statistics retrieved.',
    data: { totalLeads, leadsToday, totalAdmissions, pendingAdmissions, confirmedAdmissions },
  })
}

module.exports = { getStats }
