require('../config/env')
const mongoose = require('mongoose')
const connectDatabase = require('../config/db')
const Admin = require('../models/Admin')

async function seedAdmin() {
  const { assertRequiredEnv } = require('../config/env')
  assertRequiredEnv(['MONGO_URI', 'ADMIN_NAME', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'])

  if (process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters long.')
  }

  await connectDatabase()
  const email = process.env.ADMIN_EMAIL.trim().toLowerCase()
  const existing = await Admin.findOne({}).select('_id email')
  if (existing) {
    console.log(`An admin account already exists (${existing.email}); no changes made.`)
    return
  }

  await Admin.create({
    name: process.env.ADMIN_NAME.trim(),
    email,
    password: process.env.ADMIN_PASSWORD,
  })
  console.log(`Admin account created for ${email}.`)
}

seedAdmin()
  .catch((error) => {
    console.error(`Admin seed failed: ${error.message}`)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
