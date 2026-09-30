const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  phone: { type: String, required: true, trim: true, maxlength: 16 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  source: { type: String, default: 'website', trim: true, maxlength: 80 },
  status: {
    type: String,
    enum: ['new', 'contacted', 'joined_demo', 'not_interested'],
    default: 'new',
  },
  notes: { type: String, default: '', trim: true, maxlength: 2000 },
}, { timestamps: true })

leadSchema.index({ createdAt: -1 })
leadSchema.index({ status: 1, createdAt: -1 })
leadSchema.index({ phone: 1 }, { unique: true })
leadSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('Lead', leadSchema)
