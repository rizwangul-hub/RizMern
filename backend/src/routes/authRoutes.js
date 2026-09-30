const express = require('express')
const { body } = require('express-validator')
const { getCurrentAdmin, login } = require('../controllers/authController')
const requireAdmin = require('../middleware/auth')
const validateRequest = require('../middleware/validate')
const { createLoginLimiter } = require('../middleware/rateLimiter')

const router = express.Router()

router.post(
  '/login',
  createLoginLimiter(),
  body('email').trim().isEmail().withMessage('Enter a valid email address.').bail().normalizeEmail(),
  body('password').isString().withMessage('Password is required.').bail().notEmpty().withMessage('Password is required.'),
  validateRequest,
  login,
)
router.get('/me', requireAdmin, getCurrentAdmin)

module.exports = router
