const express = require('express')
const { getStats } = require('../controllers/statsController')
const requireAdmin = require('../middleware/auth')
const admissionRoutes = require('./admissionRoutes')
const authRoutes = require('./authRoutes')
const leadRoutes = require('./leadRoutes')
const projectRoutes = require('./projectRoutes')
const studentRoutes = require('./studentRoutes')
const courseConfigRoutes = require('./courseConfigRoutes')
const inquiryRoutes = require('./inquiryRoutes')
const adminLmsRoutes = require('./adminLmsRoutes')
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
router.use('/student', studentRoutes)
router.use('/course-config', courseConfigRoutes)
router.use('/inquiries', inquiryRoutes)
router.use('/admin', adminLmsRoutes)
router.get('/stats', requireAdmin, getStats)

module.exports = router
