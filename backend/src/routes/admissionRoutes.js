const express = require('express')
const { body, param, query, matchedData } = require('express-validator')
const admissionController = require('../controllers/admissionController')
const requireAdmin = require('../middleware/auth')
const validateRequest = require('../middleware/validate')
const { createPublicLimiter } = require('../middleware/rateLimiter')
const apiResponse = require('../utils/apiResponse')
const { normalizePakistaniPhone } = require('../utils/phone')

const router = express.Router()
const admissionStatuses = ['pending', 'confirmed', 'rejected']

const createAdmissionValidation = [
  body('fullName').trim().stripLow().escape().notEmpty().withMessage('Full name is required.').bail().isLength({ max: 120 }).withMessage('Full name must be 120 characters or fewer.'),
  body('phone')
    .trim()
    .custom((value) => Boolean(normalizePakistaniPhone(value)))
    .withMessage('Enter a valid Pakistani phone number, such as 03XXXXXXXXX or +923XXXXXXXXX.')
    .customSanitizer((value) => normalizePakistaniPhone(value)),
  body('email').trim().isEmail().withMessage('Enter a valid email address.').bail().normalizeEmail(),
  body('city').trim().stripLow().escape().notEmpty().withMessage('City is required.').bail().isLength({ max: 100 }).withMessage('City must be 100 characters or fewer.'),
  body('education').optional().trim().stripLow().escape().isLength({ max: 160 }).withMessage('Education must be 160 characters or fewer.'),
  body('courseName').trim().stripLow().escape().notEmpty().withMessage('Course name is required.').bail().isLength({ max: 180 }).withMessage('Course name must be 180 characters or fewer.'),
  body('preferredBatch').optional().trim().stripLow().escape().isLength({ max: 100 }).withMessage('Preferred batch must be 100 characters or fewer.'),
  body('paymentPlan').optional().isIn(['full', 'installment']).withMessage('Payment plan must be full or installment.'),
  body('message').optional().trim().stripLow().escape().isLength({ max: 2000 }).withMessage('Message must be 2000 characters or fewer.'),
]

function validateUpdate(req, res, next) {
  if (!req.validatedUpdates || Object.keys(req.validatedUpdates).length === 0) {
    return apiResponse(res, 422, {
      success: false,
      message: 'Please provide a status or notes update.',
      data: { errors: [{ field: 'body', message: 'At least one supported field is required.' }] },
    })
  }
  return next()
}

router.post('/', createPublicLimiter(), createAdmissionValidation, validateRequest, admissionController.createAdmission)
router.get(
  '/',
  requireAdmin,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
  query('search').optional().trim().isLength({ max: 120 }).withMessage('Search must be 120 characters or fewer.'),
  query('status').optional().isIn(admissionStatuses).withMessage('Status filter is invalid.'),
  validateRequest,
  admissionController.listAdmissions,
)
router.patch(
  '/:id',
  requireAdmin,
  param('id').isMongoId().withMessage('Admission ID is invalid.'),
  body('status').optional().isIn(admissionStatuses).withMessage('Status is invalid.'),
  body('notes').optional().isString().withMessage('Notes must be text.').bail().trim().stripLow().escape().isLength({ max: 2000 }).withMessage('Notes must be 2000 characters or fewer.'),
  validateRequest,
  (req, res, next) => {
    req.validatedUpdates = matchedData(req, { locations: ['body'] })
    return next()
  },
  validateUpdate,
  admissionController.updateAdmission,
)
router.delete('/:id', requireAdmin, param('id').isMongoId().withMessage('Admission ID is invalid.'), validateRequest, admissionController.deleteAdmission)

module.exports = router
