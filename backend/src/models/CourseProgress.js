const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
      index: true,
    },
    courseId: {
      type: String,
      required: true,
      default: 'rizmern-3month',
      index: true,
    },
    completedLessons: {
      type: [String],
      default: [],
    },
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    lastLessonId: {
      type: String,
      default: null,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one progress document per student per course
courseProgressSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

module.exports = {
  CourseProgress,
};
