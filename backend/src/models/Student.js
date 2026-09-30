const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const allowedStudentStatuses = ['invited', 'active', 'suspended', 'completed'];

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    status: {
      type: String,
      enum: allowedStudentStatuses,
      default: 'active',
    },
    avatar: {
      type: String,
      default: null,
    },
    enrolledCourses: {
      type: [String],
      default: ['rizmern-3month'],
    },
    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inquiry',
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compare candidate password
studentSchema.methods.isValidPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Safe object representation (omits passwordHash)
studentSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

const Student = mongoose.model('Student', studentSchema);

module.exports = {
  Student,
  allowedStudentStatuses,
};
