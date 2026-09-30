const mongoose = require('mongoose');

const allowedExperienceLevels = [
  'Beginner',
  'Basic knowledge',
  'Intermediate',
  'Already developing projects',
];

const allowedInterests = [
  'Frontend Web Development',
  'MERN Stack Full-Stack Development',
  'React Native App Development',
  'AI-Assisted Development',
  'Deployment and Hosting',
  'Portfolio Development',
];

const allowedSources = [
  'LinkedIn',
  'WhatsApp',
  'Facebook',
  'YouTube',
  'Friend / Classmate',
  'Google Search',
  'Other',
];

const allowedStatuses = [
  'new',
  'contacted',
  'demo_scheduled',
  'demo_attended',
  'enrolled',
  'follow_up',
  'not_interested',
];

const inquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [80, 'Full name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      maxlength: [120, 'Email cannot exceed 120 characters'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone / WhatsApp number is required'],
      trim: true,
      minlength: [7, 'Phone number must be at least 7 characters'],
      maxlength: [25, 'Phone number cannot exceed 25 characters'],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [60, 'City cannot exceed 60 characters'],
      default: '',
    },
    experienceLevel: {
      type: String,
      required: [true, 'Experience level is required'],
      enum: {
        values: allowedExperienceLevels,
        message: 'Invalid experience level selection',
      },
    },
    interests: {
      type: [String],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: 'Please select at least one learning interest',
      },
      enum: {
        values: allowedInterests,
        message: 'One or more selected interests are invalid',
      },
    },
    message: {
      type: String,
      trim: true,
      maxlength: [500, 'Message cannot exceed 500 characters'],
      default: '',
    },
    source: {
      type: String,
      enum: {
        values: allowedSources,
        message: 'Invalid source selection',
      },
      default: 'Other',
    },
    consentToContact: {
      type: Boolean,
      required: [true, 'Consent to contact is required'],
      validate: {
        validator: function (val) {
          return val === true;
        },
        message: 'You must agree to be contacted regarding the demo class',
      },
    },
    status: {
      type: String,
      enum: {
        values: allowedStatuses,
        message: 'Invalid inquiry status',
      },
      default: 'new',
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Admin notes cannot exceed 2000 characters'],
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Targeted indexes for query performance and duplicate checking
inquirySchema.index({ email: 1, createdAt: -1 });
inquirySchema.index({ phone: 1, createdAt: -1 });
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ experienceLevel: 1 });
inquirySchema.index({ source: 1 });

module.exports = {
  Inquiry: mongoose.model('Inquiry', inquirySchema),
  allowedExperienceLevels,
  allowedInterests,
  allowedSources,
  allowedStatuses,
};
