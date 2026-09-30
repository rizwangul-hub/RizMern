const express = require('express');
const router = express.Router();
const requireStudentAuth = require('../middleware/studentAuth');
const {
  studentLogin,
  studentLogout,
  getStudentProfile,
  updateStudentProfile,
  changeStudentPassword,
  getStudentCourses,
  getStudentCourseDetails,
  getStudentLesson,
  completeLesson,
  getStudentProgress,
} = require('../controllers/studentController');

// Public Student Authentication Routes
router.post('/login', studentLogin);
router.post('/logout', studentLogout);

// Protected Student Profile Routes
router.get('/me', requireStudentAuth, getStudentProfile);
router.patch('/profile', requireStudentAuth, updateStudentProfile);
router.patch('/password', requireStudentAuth, changeStudentPassword);

// Protected Student Course & Curriculum Routes
router.get('/courses', requireStudentAuth, getStudentCourses);
router.get('/courses/:courseId', requireStudentAuth, getStudentCourseDetails);
router.get('/lessons/:lessonId', requireStudentAuth, getStudentLesson);
router.post('/lessons/:lessonId/complete', requireStudentAuth, completeLesson);
router.get('/progress', requireStudentAuth, getStudentProgress);

module.exports = router;
