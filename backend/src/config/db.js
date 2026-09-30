const mongoose = require('mongoose')

// Cache the connection across serverless invocations so Vercel warm
// instances reuse an existing connection instead of reconnecting each time.
let cached = global._mongooseConnection

async function connectDatabase() {
  if (!process.env.MONGO_URI?.trim()) {
    throw new Error('MONGO_URI is not configured. Set it to your MongoDB Atlas connection string.')
  }
  if (cached && mongoose.connection.readyState === 1) return cached
  cached = await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 20000,
  })
  global._mongooseConnection = cached
  console.info(`MongoDB connected: ${mongoose.connection.host}`)
  return cached
}

module.exports = connectDatabase
