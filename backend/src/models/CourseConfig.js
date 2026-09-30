const mongoose = require('mongoose');

const allowedAdmissionStatuses = ['open', 'coming_soon', 'closed'];

const scheduleItemSchema = new mongoose.Schema(
  {
    day: { type: String, required: true, trim: true },
    startTime: { type: String, required: true, trim: true },
    endTime: { type: String, required: true, trim: true },
    timezone: { type: String, default: 'PKT', trim: true },
  },
  { _id: false }
);

const courseConfigSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      default: 'Three-Month MERN Stack & React Native App Development',
      trim: true,
    },
    duration: {
      type: String,
      default: 'Three Months',
      trim: true,
    },
    format: {
      type: String,
      default: 'Live Online Classes',
      trim: true,
    },
    focus: {
      type: String,
      default: 'Modern Web & Mobile App Development with AI',
      trim: true,
    },
    fee: {
      type: Number,
      default: null,
      min: [0, 'Course fee cannot be negative'],
    },
    currency: {
      type: String,
      default: 'PKR',
      trim: true,
    },
    feeIncludes: {
      type: [String],
      default: [
        'Live online interactive classes',
        'Comprehensive 3-month curriculum access',
        'Hands-on full-stack & mobile project blueprints',
        'Direct architectural mentorship from Rizwan Ullah',
        'AI-assisted engineering workflows',
        'GitHub version control & cloud deployment coaching',
      ],
    },
    classSchedule: {
      type: [scheduleItemSchema],
      default: [],
    },
    demoClass: {
      enabled: { type: Boolean, default: true },
      date: { type: String, default: '', trim: true },
      startTime: { type: String, default: '', trim: true },
      endTime: { type: String, default: '', trim: true },
      timezone: { type: String, default: 'PKT', trim: true },
      meetingPlatform: { type: String, default: 'Google Meet / Zoom', trim: true },
      meetingLink: { type: String, default: '', trim: true },
      isMeetingLinkPublic: { type: Boolean, default: false },
      instructions: {
        type: String,
        default:
          'Meeting details and class links are shared directly with registered participants via WhatsApp and Email prior to session time.',
        trim: true,
      },
    },
    admissionStatus: {
      type: String,
      enum: {
        values: allowedAdmissionStatuses,
        message: 'Invalid admission status. Allowed: open, coming_soon, closed',
      },
      default: 'open',
    },
    admissionNotice: {
      type: String,
      default: 'Registration is currently open for the upcoming cohort demo class.',
      trim: true,
    },
    whatsapp: {
      enabled: { type: Boolean, default: false },
      phone: { type: String, default: '', trim: true },
      groupLink: { type: String, default: '', trim: true },
      directChatEnabled: { type: Boolean, default: false },
      message: {
        type: String,
        default:
          'Hello Rizwan Ullah, I am interested in the RizMern 3-month development course and would like to know more about the demo class.',
        trim: true,
      },
    },
    updatedBy: {
      type: String,
      default: 'system',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Safe default values generator
function getDefaultConfig() {
  return {
    courseName: 'Three-Month MERN Stack & React Native App Development',
    duration: 'Three Months',
    format: 'Live Online Classes',
    focus: 'Modern Web & Mobile App Development with AI',
    fee: null, // Null when fee is coming soon / not set
    currency: 'PKR',
    feeIncludes: [
      'Live online interactive classes',
      'Comprehensive 3-month curriculum access',
      'Hands-on full-stack & mobile project blueprints',
      'Direct architectural mentorship from Rizwan Ullah',
      'AI-assisted engineering workflows',
      'GitHub version control & cloud deployment coaching',
    ],
    classSchedule: [],
    demoClass: {
      enabled: true,
      date: '',
      startTime: '',
      endTime: '',
      timezone: 'PKT',
      meetingPlatform: 'Google Meet / Zoom',
      meetingLink: '',
      isMeetingLinkPublic: false,
      instructions:
        'Meeting details and class links are shared directly with registered participants via WhatsApp and Email prior to session time.',
    },
    admissionStatus: 'open',
    admissionNotice: 'Registration is currently open for the upcoming cohort demo class.',
    whatsapp: {
      enabled: false,
      phone: '',
      groupLink: '',
      directChatEnabled: false,
      message:
        'Hello Rizwan Ullah, I am interested in the RizMern 3-month development course and would like to know more about the demo class.',
    },
    updatedBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

module.exports = {
  CourseConfig: mongoose.model('CourseConfig', courseConfigSchema),
  allowedAdmissionStatuses,
  getDefaultConfig,
};
