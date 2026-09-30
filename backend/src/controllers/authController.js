const jwt = require('jsonwebtoken')
const { matchedData } = require('express-validator')
const Admin = require('../models/Admin')
const apiResponse = require('../utils/apiResponse')

async function login(req, res) {
  const { email, password } = matchedData(req, { locations: ['body'] })
  const admin = await Admin.findOne({ email }).select('+password')
  const passwordMatches = admin ? await admin.comparePassword(password) : false

  if (!admin || !passwordMatches) {
    return apiResponse(res, 401, { success: false, message: 'Invalid email or password.', data: null })
  }

  const token = jwt.sign({}, process.env.JWT_SECRET, { subject: admin.id, expiresIn: '7d' })
  return apiResponse(res, 200, {
    success: true,
    message: 'Login successful.',
    data: {
      token,
      expiresIn: '7d',
      admin: { id: admin.id, name: admin.name, email: admin.email },
    },
  })
}

function getCurrentAdmin(req, res) {
  return apiResponse(res, 200, {
    success: true,
    message: 'Admin profile retrieved.',
    data: { id: req.admin.id, name: req.admin.name, email: req.admin.email },
  })
}

module.exports = { getCurrentAdmin, login }
