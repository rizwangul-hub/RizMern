const express = require('express');
const router = express.Router();
const { createInquiry } = require('../controllers/inquiryController');
const { createPublicLimiter } = require('../middleware/rateLimiter');

// POST /api/inquiries - Submit a new demo class inquiry with rate limiting
router.post('/', createPublicLimiter(), createInquiry);

module.exports = router;
