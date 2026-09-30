const mongoose = require('mongoose')

const admissionSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 120 },
  phone: { type: String, required: true, trim: true, maxlength: 16 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  city: { type: String, required: true, trim: true, maxlength: 100 },
  education: { type: String, default: '', trim: true, maxlength: 160 },
  courseName: { type: String, required: true, trim: true, maxlength: 180 },
  preferredBatch: { type: String, default: '', trim: true, maxlength: 100 },
  paymentPlan: { type: String, enum: ['full', 'installment'], default: 'full' },
  message: { type: String, default: '', trim: true, maxlength: 2000 },
  status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' },
  notes: { type: String, default: '', trim: true, maxlength: 2000 },
}, { timestamps: true })

admissionSchema.index({ createdAt: -1 })
admissionSchema.index({ status: 1, createdAt: -1 })

module.exports = mongoose.model('Admission', admissionSchema)
