require('./config/env')
const app = require('./app')
const connectDatabase = require('./config/db')
const { assertRequiredEnv } = require('./config/env')

const port = Number.parseInt(process.env.PORT || '5000', 10)

async function startServer() {
  assertRequiredEnv(['MONGO_URI', 'JWT_SECRET'])
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port between 1 and 65535.')
  }
  if (process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long.')
  }

  await connectDatabase()
  const server = app.listen(port, () => {
    console.log(`RizMern API listening on port ${port} (${process.env.NODE_ENV || 'development'}).`)
  })

  const shutdown = (signal) => {
    console.log(`${signal} received; shutting down gracefully.`)
    server.close(async (error) => {
      if (error) {
        console.error('HTTP server shutdown failed:', error)
        process.exitCode = 1
      }
      const mongoose = require('mongoose')
      await mongoose.disconnect()
    })
  }
  process.once('SIGINT', () => shutdown('SIGINT'))
  process.once('SIGTERM', () => shutdown('SIGTERM'))
  return server
}

startServer().catch((error) => {
  console.error(`Server startup failed: ${error.message}`)
  process.exit(1)
})
