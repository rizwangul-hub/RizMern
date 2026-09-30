const express = require('express')
const { body, matchedData, param, query } = require('express-validator')
const projectController = require('../controllers/projectController')
const requireAdmin = require('../middleware/auth')
const validateRequest = require('../middleware/validate')

const router = express.Router()
const httpUrl = (value) => {
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) && Boolean(url.hostname) && !url.username && !url.password
  } catch {
    return false
  }
}

const projectFields = (optional = false) => [
  body('title').if((value) => !optional || value !== undefined).trim().stripLow().notEmpty().withMessage('Project title is required.').bail().isLength({ max: 120 }).withMessage('Project title must be 120 characters or fewer.'),
  body('category').if((value) => !optional || value !== undefined).trim().stripLow().notEmpty().withMessage('Project category is required.').bail().isLength({ max: 80 }).withMessage('Category must be 80 characters or fewer.'),
  body('imageUrl').if((value) => !optional || value !== undefined).trim().notEmpty().withMessage('Project image URL is required.').bail().isLength({ max: 2048 }).bail().custom(httpUrl).withMessage('Enter an image URL starting with http:// or https://.'),
  body('liveUrl')
    .optional({ values: 'undefined' })
    .trim()
    .isLength({ max: 2048 })
    .bail()
    .custom((value) => value === '' || httpUrl(value))
    .withMessage('Enter a live URL starting with http:// or https://.'),
  body('technologies').if((value) => !optional || value !== undefined)
    .isArray({ min: 1, max: 12 })
    .withMessage('Add between 1 and 12 technologies.')
    .bail()
    .custom((values) => values.every((value) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= 40))
    .withMessage('Each technology must be non-empty and 40 characters or fewer.')
    .customSanitizer((values) => [...new Set(values.map((value) => value.trim()))]),
  body('description').if((value) => !optional || value !== undefined).trim().stripLow().notEmpty().withMessage('Project description is required.').bail().isLength({ max: 1000 }).withMessage('Description must be 1000 characters or fewer.'),
  body('order').optional().isInt({ min: 0, max: 10000 }).withMessage('Display order must be between 0 and 10000.').toInt(),
  body('featured').optional().isBoolean().withMessage('Featured must be true or false.').toBoolean(),
  body('published').optional().isBoolean().withMessage('Published must be true or false.').toBoolean(),
]

router.get('/', projectController.listPublicProjects)
router.get(
  '/admin',
  requireAdmin,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
  query('search').optional().trim().isLength({ max: 120 }).withMessage('Search must be 120 characters or fewer.'),
  query('published').optional().isIn(['true', 'false']).withMessage('Published filter must be true or false.'),
  validateRequest,
  projectController.listAdminProjects,
)
router.post('/', requireAdmin, projectFields(), validateRequest, projectController.createProject)
router.patch(
  '/:id',
  requireAdmin,
  param('id').isMongoId().withMessage('Project ID is invalid.'),
  ...projectFields(true),
  validateRequest,
  (req, res, next) => {
    req.validatedUpdates = matchedData(req, { locations: ['body'] })
    return next()
  },
  projectController.updateProject,
)
router.delete('/:id', requireAdmin, param('id').isMongoId().withMessage('Project ID is invalid.'), validateRequest, projectController.deleteProject)

module.exports = router
