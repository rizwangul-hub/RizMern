const { allowedAdmissionStatuses } = require('../models/CourseConfig');

const URL_REGEX = /^https?:\/\/[^\s$.?#].[^\s]*$/i;

function validateCourseConfig(input = {}) {
  const errors = {};
  const sanitized = {};

  // 1. Course Basic Info
  if (typeof input.courseName === 'string' && input.courseName.trim()) {
    sanitized.courseName = input.courseName.trim().slice(0, 150);
  }
  if (typeof input.duration === 'string' && input.duration.trim()) {
    sanitized.duration = input.duration.trim().slice(0, 50);
  }
  if (typeof input.format === 'string' && input.format.trim()) {
    sanitized.format = input.format.trim().slice(0, 50);
  }
  if (typeof input.focus === 'string' && input.focus.trim()) {
    sanitized.focus = input.focus.trim().slice(0, 200);
  }

  // 2. Fee & Currency
  if (input.fee === null || input.fee === '' || input.fee === undefined) {
    sanitized.fee = null;
  } else {
    const numericFee = Number(input.fee);
    if (isNaN(numericFee) || numericFee < 0) {
      errors.fee = 'Fee must be a valid non-negative number or left empty for coming soon.';
    } else {
      sanitized.fee = Math.round(numericFee);
    }
  }

  if (typeof input.currency === 'string' && input.currency.trim()) {
    sanitized.currency = input.currency.trim().toUpperCase().slice(0, 10);
  } else {
    sanitized.currency = 'PKR';
  }

  // 3. Fee Includes
  if (Array.isArray(input.feeIncludes)) {
    sanitized.feeIncludes = input.feeIncludes
      .filter((item) => typeof item === 'string' && item.trim())
      .map((item) => item.trim().slice(0, 150));
  }

  // 4. Class Schedule
  if (Array.isArray(input.classSchedule)) {
    const validSchedule = [];
    for (let i = 0; i < input.classSchedule.length; i++) {
      const item = input.classSchedule[i];
      if (typeof item === 'object' && item !== null) {
        const day = typeof item.day === 'string' ? item.day.trim() : '';
        const startTime = typeof item.startTime === 'string' ? item.startTime.trim() : '';
        const endTime = typeof item.endTime === 'string' ? item.endTime.trim() : '';
        const timezone = typeof item.timezone === 'string' ? item.timezone.trim() : 'PKT';

        if (!day || !startTime || !endTime) {
          errors.classSchedule = `Schedule entry #${i + 1} requires Day, Start Time, and End Time.`;
          break;
        }

        validSchedule.push({
          day: day.slice(0, 30),
          startTime: startTime.slice(0, 30),
          endTime: endTime.slice(0, 30),
          timezone: timezone.slice(0, 20) || 'PKT',
        });
      }
    }
    if (!errors.classSchedule) {
      sanitized.classSchedule = validSchedule;
    }
  }

  // 5. Demo Class Information
  if (typeof input.demoClass === 'object' && input.demoClass !== null) {
    const dc = input.demoClass;
    const meetingLink = typeof dc.meetingLink === 'string' ? dc.meetingLink.trim() : '';

    if (meetingLink && !URL_REGEX.test(meetingLink)) {
      errors.demoClass = 'Meeting link must be a valid HTTPS/HTTP URL.';
    }

    sanitized.demoClass = {
      enabled: dc.enabled === true || dc.enabled === 'true',
      date: typeof dc.date === 'string' ? dc.date.trim().slice(0, 50) : '',
      startTime: typeof dc.startTime === 'string' ? dc.startTime.trim().slice(0, 30) : '',
      endTime: typeof dc.endTime === 'string' ? dc.endTime.trim().slice(0, 30) : '',
      timezone: typeof dc.timezone === 'string' ? dc.timezone.trim().slice(0, 20) : 'PKT',
      meetingPlatform:
        typeof dc.meetingPlatform === 'string' ? dc.meetingPlatform.trim().slice(0, 80) : 'Google Meet / Zoom',
      meetingLink: meetingLink.slice(0, 300),
      isMeetingLinkPublic: dc.isMeetingLinkPublic === true || dc.isMeetingLinkPublic === 'true',
      instructions:
        typeof dc.instructions === 'string'
          ? dc.instructions.trim().slice(0, 500)
          : 'Meeting details will be shared directly with registered participants.',
    };
  }

  // 6. Admission Status & Notice
  if (input.admissionStatus !== undefined) {
    if (!allowedAdmissionStatuses.includes(input.admissionStatus)) {
      errors.admissionStatus = `Invalid admission status. Must be one of: ${allowedAdmissionStatuses.join(', ')}`;
    } else {
      sanitized.admissionStatus = input.admissionStatus;
    }
  }

  if (typeof input.admissionNotice === 'string') {
    sanitized.admissionNotice = input.admissionNotice.trim().slice(0, 300);
  }

  // 7. WhatsApp Contact Configuration
  if (typeof input.whatsapp === 'object' && input.whatsapp !== null) {
    const wa = input.whatsapp;
    const groupLink = typeof wa.groupLink === 'string' ? wa.groupLink.trim() : '';

    if (groupLink && !URL_REGEX.test(groupLink)) {
      errors.whatsapp = 'WhatsApp group link must be a valid URL.';
    }

    sanitized.whatsapp = {
      enabled: wa.enabled === true || wa.enabled === 'true',
      phone: typeof wa.phone === 'string' ? wa.phone.trim().slice(0, 30) : '',
      groupLink: groupLink.slice(0, 300),
      directChatEnabled: wa.directChatEnabled === true || wa.directChatEnabled === 'true',
      message:
        typeof wa.message === 'string'
          ? wa.message.trim().slice(0, 300)
          : 'Hello Rizwan Ullah, I am interested in the RizMern 3-month development course.',
    };
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: sanitized,
  };
}

module.exports = {
  validateCourseConfig,
};
