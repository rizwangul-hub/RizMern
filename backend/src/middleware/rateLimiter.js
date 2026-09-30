const { rateLimit } = require('express-rate-limit')

function createPublicLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests. Please try again in a few minutes.',
      data: null,
    },
  })
}

function createLoginLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many login attempts. Please try again in a few minutes.',
      data: null,
    },
  })
}

module.exports = { createLoginLimiter, createPublicLimiter }
