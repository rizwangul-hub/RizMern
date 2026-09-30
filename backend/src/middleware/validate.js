const { validationResult } = require('express-validator')
const apiResponse = require('../utils/apiResponse')

function validateRequest(req, res, next) {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return apiResponse(res, 422, {
      success: false,
      message: 'Please check the submitted information.',
      data: { errors: result.array().map(({ path, msg }) => ({ field: path, message: msg })) },
    })
  }
  return next()
}

module.exports = validateRequest
