const express = require('express');
const router = express.Router();
const { getPublicCourseConfig } = require('../controllers/courseConfigController');

// GET /api/course-config - Publicly accessible course information
router.get('/', getPublicCourseConfig);

module.exports = router;
