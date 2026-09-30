require('./config/env')
const cors = require('cors')
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const { getAllowedOrigins } = require('./config/env')
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler')
const apiRoutes = require('./routes')
const connectDatabase = require('./config/db')

const app = express()
const allowedOrigins = new Set(getAllowedOrigins())

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(helmet())
app.use(compression())
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true)
    const error = new Error('CORS origin is not allowed.')
    error.status = 403
    return callback(error)
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '10kb', strict: true }))
app.use(express.urlencoded({ extended: false, limit: '10kb', parameterLimit: 20 }))
if (process.env.NODE_ENV !== 'test') {
  morgan.token('path', (req) => req.path)
  app.use(morgan(':method :path :status :response-time ms'))
}

// Ensure MongoDB is connected on every serverless invocation
app.use(async (req, res, next) => {
  try {
    await connectDatabase()
    next()
  } catch (error) {
    next(error)
  }
})

app.get('/', (req, res) => res.json({ message: 'RizMern API running' }))
app.use('/api', apiRoutes)
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
