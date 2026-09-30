const apiResponse = require('../utils/apiResponse')

function notFoundHandler(req, res) {
  return apiResponse(res, 404, {
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    data: null,
  })
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error)

  if (error.type === 'entity.too.large') {
    return apiResponse(res, 413, { success: false, message: 'Request body is too large.', data: null })
  }
  if (error.type === 'entity.parse.failed') {
    return apiResponse(res, 400, { success: false, message: 'Request body must contain valid JSON.', data: null })
  }
  if (error.status === 403 && error.message === 'CORS origin is not allowed.') {
    return apiResponse(res, 403, { success: false, message: error.message, data: null })
  }
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((item) => ({ field: item.path, message: item.message }))
    return apiResponse(res, 422, { success: false, message: 'Please check the submitted information.', data: { errors } })
  }
  if (error.code === 11000) {
    const fields = Object.keys(error.keyPattern || {})
    return apiResponse(res, 409, {
      success: false,
      message: fields.includes('email') ? 'An account with this email already exists.' : 'This record already exists.',
      data: { fields },
    })
  }
  if (error.name === 'CastError') {
    return apiResponse(res, 400, { success: false, message: 'The supplied identifier is invalid.', data: null })
  }

  const production = process.env.NODE_ENV === 'production'
  if (production) console.error('API request failed:', error.message)
  else console.error(error)
  const message = production ? 'An unexpected server error occurred.' : error.message
  return apiResponse(res, 500, { success: false, message, data: null })
}

module.exports = { errorHandler, notFoundHandler }
