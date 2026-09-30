const express = require('express')
const router = express.Router()
const requireAdmin = require('../middleware/auth')
const {
  getAdminCourseConfig,
  updateAdminCourseConfig,
} = require('../controllers/courseConfigController')
const {
  getAdminStudents,
  getAdminStudentById,
  createAdminStudent,
  updateAdminStudent,
  enrollInquiryStudent,
  getAdminCourseContent,
  createAdminModule,
  updateAdminModule,
  createAdminLesson,
  updateAdminLesson,
  deleteAdminLesson,
} = require('../controllers/adminLmsController')

// Protect all LMS routes with existing admin auth middleware
router.use(requireAdmin)

// Course Configuration
router.get('/course-config', getAdminCourseConfig)
router.put('/course-config', updateAdminCourseConfig)

// Student Management
router.get('/students', getAdminStudents)
router.get('/students/:id', getAdminStudentById)
router.post('/students', createAdminStudent)
router.patch('/students/:id', updateAdminStudent)
router.post('/inquiries/:id/enroll', enrollInquiryStudent)

// Course Content & Lessons Management
router.get('/course-content', getAdminCourseContent)
router.post('/modules', createAdminModule)
router.patch('/modules/:id', updateAdminModule)
router.post('/lessons', createAdminLesson)
router.patch('/lessons/:id', updateAdminLesson)
router.delete('/lessons/:id', deleteAdminLesson)

module.exports = router
