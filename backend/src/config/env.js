const dotenv = require('dotenv')

dotenv.config()

function assertRequiredEnv(keys) {
  const missing = keys.filter((key) => !process.env[key]?.trim())
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

function getAllowedOrigins() {
  return (process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

module.exports = { assertRequiredEnv, getAllowedOrigins }
