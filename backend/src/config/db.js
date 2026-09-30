const mongoose = require('mongoose')

async function connectDatabase() {
  if (!process.env.MONGO_URI?.trim()) {
    throw new Error('MONGO_URI is not configured. Set it to your MongoDB Atlas connection string.')
  }
  const connection = await mongoose.connect(process.env.MONGO_URI)
  console.info(`MongoDB connected: ${connection.connection.host}`)
  return connection
}

module.exports = connectDatabase
