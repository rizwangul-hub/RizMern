const mongoose = require('mongoose');
const { CourseConfig, getDefaultConfig } = require('../models/CourseConfig');
const { validateCourseConfig } = require('../validators/courseConfigValidator');

// Resilient memory fallback for development/testing without active MongoDB
let memoryCourseConfig = getDefaultConfig();

/**
 * Helper to strip private fields from public response
 */
function sanitizePublicConfig(rawConfig) {
  const cfg = rawConfig.toObject ? rawConfig.toObject() : { ...rawConfig };

  // Guard: Never expose private meeting links publicly if not marked explicitly public
  const safeDemoClass = {
    enabled: cfg.demoClass?.enabled ?? true,
    date: cfg.demoClass?.date || '',
    startTime: cfg.demoClass?.startTime || '',
    endTime: cfg.demoClass?.endTime || '',
    timezone: cfg.demoClass?.timezone || 'PKT',
    meetingPlatform: cfg.demoClass?.meetingPlatform || 'Google Meet / Zoom',
    meetingLink: cfg.demoClass?.isMeetingLinkPublic ? cfg.demoClass?.meetingLink : null,
    isMeetingLinkPublic: Boolean(cfg.demoClass?.isMeetingLinkPublic),
    instructions:
      cfg.demoClass?.instructions ||
      'Meeting details will be shared directly with registered participants via WhatsApp/Email.',
  };

  // Guard: Safe WhatsApp public configuration
  const safeWhatsapp = {
    enabled: Boolean(cfg.whatsapp?.enabled),
    phone: cfg.whatsapp?.enabled && cfg.whatsapp?.directChatEnabled ? cfg.whatsapp?.phone : '',
    groupLink: cfg.whatsapp?.enabled ? cfg.whatsapp?.groupLink || '' : '',
    directChatEnabled: Boolean(cfg.whatsapp?.enabled && cfg.whatsapp?.directChatEnabled),
    message: cfg.whatsapp?.message || '',
  };

  return {
    courseName: cfg.courseName,
    duration: cfg.duration,
    format: cfg.format,
    focus: cfg.focus,
    fee: cfg.fee,
    currency: cfg.currency || 'PKR',
    feeIncludes: cfg.feeIncludes || [],
    classSchedule: cfg.classSchedule || [],
    demoClass: safeDemoClass,
    admissionStatus: cfg.admissionStatus || 'open',
    admissionNotice: cfg.admissionNotice || '',
    whatsapp: safeWhatsapp,
    updatedAt: cfg.updatedAt,
  };
}

/**
 * GET /api/course-config
 * Public endpoint returning only safe course information
 */
async function getPublicCourseConfig(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      let config = await CourseConfig.findOne().sort({ updatedAt: -1 });
      if (!config) {
        config = await CourseConfig.create(getDefaultConfig());
      }
      return res.status(200).json({
        success: true,
        config: sanitizePublicConfig(config),
      });
    } else {
      return res.status(200).json({
        success: true,
        config: sanitizePublicConfig(memoryCourseConfig),
      });
    }
  } catch (error) {
    console.error('Error retrieving public course config:', error);
    // Graceful fallback to default config
    return res.status(200).json({
      success: true,
      config: sanitizePublicConfig(getDefaultConfig()),
    });
  }
}

/**
 * GET /api/admin/course-config
 * Protected endpoint returning complete course configuration for admin editing
 */
async function getAdminCourseConfig(req, res) {
  try {
    if (mongoose.connection.readyState === 1) {
      let config = await CourseConfig.findOne().sort({ updatedAt: -1 }).lean();
      if (!config) {
        config = await CourseConfig.create(getDefaultConfig());
      }
      return res.status(200).json({
        success: true,
        config,
      });
    } else {
      return res.status(200).json({
        success: true,
        config: memoryCourseConfig,
      });
    }
  } catch (error) {
    console.error('Error retrieving admin course config:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve course configuration.',
    });
  }
}

/**
 * PUT /api/admin/course-config
 * Protected endpoint updating course configuration
 */
async function updateAdminCourseConfig(req, res) {
  try {
    const { isValid, errors, sanitizedData } = validateCourseConfig(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for course configuration.',
        errors,
      });
    }

    sanitizedData.updatedBy = req.admin?.email || 'admin';

    if (mongoose.connection.readyState === 1) {
      let config = await CourseConfig.findOne().sort({ updatedAt: -1 });
      if (!config) {
        config = new CourseConfig(sanitizedData);
      } else {
        Object.assign(config, sanitizedData);
      }
      const updated = await config.save();
      return res.status(200).json({
        success: true,
        message: 'Course settings updated successfully.',
        config: updated,
      });
    } else {
      memoryCourseConfig = {
        ...memoryCourseConfig,
        ...sanitizedData,
        updatedAt: new Date().toISOString(),
      };
      return res.status(200).json({
        success: true,
        message: 'Course settings updated successfully.',
        config: memoryCourseConfig,
      });
    }
  } catch (error) {
    console.error('Error updating course configuration:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update course settings.',
    });
  }
}

/**
 * Reset memory config for test isolation
 */
function _resetMemoryCourseConfig() {
  memoryCourseConfig = getDefaultConfig();
}

module.exports = {
  getPublicCourseConfig,
  getAdminCourseConfig,
  updateAdminCourseConfig,
  _resetMemoryCourseConfig,
};
