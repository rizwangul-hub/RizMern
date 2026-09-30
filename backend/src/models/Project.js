const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 140 },
  category: { type: String, required: true, trim: true, maxlength: 80 },
  imageUrl: { type: String, required: true, trim: true, maxlength: 2048 },
  liveUrl: { type: String, default: '', trim: true, maxlength: 2048 },
  technologies: {
    type: [{ type: String, trim: true, maxlength: 40 }],
    validate: {
      validator: (technologies) => technologies.length > 0 && technologies.length <= 12,
      message: 'A project must have between 1 and 12 technologies.',
    },
  },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  order: { type: Number, default: 0, min: 0, max: 10000 },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
}, { timestamps: true })

projectSchema.index({ published: 1, featured: -1, order: 1 })
projectSchema.index({ title: 'text', category: 'text', description: 'text' })

projectSchema.pre('validate', function createSlug() {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

module.exports = mongoose.model('Project', projectSchema)
