const express = require('express')
const { getStats } = require('../controllers/statsController')
const requireAdmin = require('../middleware/auth')
const admissionRoutes = require('./admissionRoutes')
const authRoutes = require('./authRoutes')
const leadRoutes = require('./leadRoutes')
const projectRoutes = require('./projectRoutes')
const apiResponse = require('../utils/apiResponse')

const router = express.Router()

router.get('/health', (req, res) => apiResponse(res, 200, {
  success: true,
  message: 'Service is healthy.',
  data: { status: 'ok' },
}))
router.use('/auth', authRoutes)
router.use('/leads', leadRoutes)
router.use('/admissions', admissionRoutes)
router.use('/projects', projectRoutes)
router.get('/stats', requireAdmin, getStats)

module.exports = router
