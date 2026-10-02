const express = require('express')
const { body, matchedData, param, query } = require('express-validator')
const leadController = require('../controllers/leadController')
const requireAdmin = require('../middleware/auth')
const validateRequest = require('../middleware/validate')
const { createPublicLimiter } = require('../middleware/rateLimiter')
const apiResponse = require('../utils/apiResponse')
const { normalizePakistaniPhone } = require('../utils/phone')

const router = express.Router()
const leadStatuses = ['new', 'contacted', 'joined_demo', 'not_interested']

const createLeadValidation = [
  body('name').trim().stripLow().escape().notEmpty().withMessage('Name is required.').bail().isLength({ max: 120 }).withMessage('Name must be 120 characters or fewer.'),
  body('phone')
    .trim()
    .custom((value) => Boolean(normalizePakistaniPhone(value)))
    .withMessage('Enter a valid Pakistani phone number, such as 03XXXXXXXXX or +923XXXXXXXXX.')
    .customSanitizer((value) => normalizePakistaniPhone(value)),
  body('email').trim().isEmail().withMessage('Enter a valid email address.').bail().normalizeEmail(),
  body('preferredDay').optional().trim().stripLow().escape().isLength({ max: 120 }),
  body('preferredTime').optional().trim().stripLow().escape().isLength({ max: 120 }),
  body('source').optional().trim().stripLow().escape().isLength({ max: 80 }).withMessage('Source must be 80 characters or fewer.'),
]

function validateUpdate(req, res, next) {
  const updates = req.validatedUpdates
  if (!updates || Object.keys(updates).length === 0) {
    return apiResponse(res, 422, {
      success: false,
      message: 'Please provide a status or notes update.',
      data: { errors: [{ field: 'body', message: 'At least one supported field is required.' }] },
    })
  }
  return next()
}

router.post('/', createPublicLimiter(), createLeadValidation, validateRequest, leadController.createLead)
router.get(
  '/',
  requireAdmin,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
  query('search').optional().trim().isLength({ max: 120 }).withMessage('Search must be 120 characters or fewer.'),
  query('status').optional().isIn(leadStatuses).withMessage('Status filter is invalid.'),
  validateRequest,
  leadController.listLeads,
)
router.patch(
  '/:id',
  requireAdmin,
  param('id').isMongoId().withMessage('Lead ID is invalid.'),
  body('status').optional().isIn(leadStatuses).withMessage('Status is invalid.'),
  body('preferredDay').optional().isString().trim().stripLow().escape().isLength({ max: 120 }),
  body('preferredTime').optional().isString().trim().stripLow().escape().isLength({ max: 120 }),
  body('notes').optional().isString().withMessage('Notes must be text.').bail().trim().stripLow().escape().isLength({ max: 2000 }).withMessage('Notes must be 2000 characters or fewer.'),
  validateRequest,
  (req, res, next) => {
    req.validatedUpdates = matchedData(req, { locations: ['body'] })
    return next()
  },
  validateUpdate,
  leadController.updateLead,
)
router.delete('/:id', requireAdmin, param('id').isMongoId().withMessage('Lead ID is invalid.'), validateRequest, leadController.deleteLead)

module.exports = router
