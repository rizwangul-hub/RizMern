require('../config/env')
const mongoose = require('mongoose')
const connectDatabase = require('../config/db')
const Admin = require('../models/Admin')

async function setAdmin() {
  const args = process.argv.slice(2)
  const email = (args[0] || process.env.ADMIN_EMAIL || 'admin@example.com').trim().toLowerCase()
  const password = args[1] || process.env.ADMIN_PASSWORD || 'RizMernLocalOnly-ReplaceBeforeDeploy-2026!'
  const name = args[2] || process.env.ADMIN_NAME || 'RizMern Admin'

  if (password.length < 12) {
    throw new Error('Password must be at least 12 characters long.')
  }

  await connectDatabase()

  let admin = await Admin.findOne({})
  if (admin) {
    admin.name = name
    admin.email = email
    admin.password = password
    await admin.save()
    console.log(`Updated admin account: ${email}`)
  } else {
    admin = await Admin.create({ name, email, password })
    console.log(`Created new admin account: ${email}`)
  }

  console.log(`Admin email: ${email}`)
  console.log(`Admin password: ${password}`)
}

setAdmin()
  .catch((err) => {
    console.error('Failed to set admin:', err.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
