const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true, minlength: 12, select: false },
}, { timestamps: true })

adminSchema.set('toJSON', {
  transform(document, result) {
    delete result.password
    delete result.__v
    return result
  },
})

adminSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

adminSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.model('Admin', adminSchema)
