const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const apiResponse = require('../utils/apiResponse')

async function requireAdmin(req, res, next) {
  const authorization = req.get('authorization') || ''
  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return apiResponse(res, 401, { success: false, message: 'Authentication is required.', data: null })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof payload !== 'object' || typeof payload.sub !== 'string') {
      return apiResponse(res, 401, { success: false, message: 'Your session is invalid or has expired.', data: null })
    }
    const admin = await Admin.findById(payload.sub).select('_id name email')
    if (!admin) {
      return apiResponse(res, 401, { success: false, message: 'Your session is no longer valid.', data: null })
    }
    req.admin = admin
    return next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return apiResponse(res, 401, { success: false, message: 'Your session is invalid or has expired.', data: null })
    }
    return next(error)
  }
}

module.exports = requireAdmin
