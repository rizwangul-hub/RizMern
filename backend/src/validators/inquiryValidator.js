const {
  allowedExperienceLevels,
  allowedInterests,
  allowedSources,
} = require('../models/Inquiry');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Allows Pakistani numbers (0300..., +92300...), international (+1..., +44...), with spaces, dashes, or parentheses
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

function validateInquiry(input = {}) {
  const errors = {};
  const sanitized = {};

  // 1. Full Name
  const rawName = typeof input.fullName === 'string' ? input.fullName.trim() : '';
  if (!rawName) {
    errors.fullName = 'Full name is required.';
  } else if (rawName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  } else if (rawName.length > 80) {
    errors.fullName = 'Full name cannot exceed 80 characters.';
  } else {
    sanitized.fullName = rawName;
  }

  // 2. Email Address
  const rawEmail = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  if (!rawEmail) {
    errors.email = 'Email address is required.';
  } else if (rawEmail.length > 120) {
    errors.email = 'Email address cannot exceed 120 characters.';
  } else if (!EMAIL_REGEX.test(rawEmail)) {
    errors.email = 'Please provide a valid email address.';
  } else {
    sanitized.email = rawEmail;
  }

  // 3. Phone / WhatsApp Number
  const rawPhone = typeof input.phone === 'string' ? input.phone.trim() : '';
  if (!rawPhone) {
    errors.phone = 'Phone / WhatsApp number is required.';
  } else if (rawPhone.length < 7 || rawPhone.length > 25) {
    errors.phone = 'Phone number must be between 7 and 25 characters.';
  } else if (!PHONE_REGEX.test(rawPhone)) {
    errors.phone = 'Please provide a valid phone or WhatsApp number.';
  } else {
    sanitized.phone = rawPhone;
  }

  // 4. City (Optional)
  if (typeof input.city === 'string') {
    sanitized.city = input.city.trim().slice(0, 60);
  } else {
    sanitized.city = '';
  }

  // 5. Experience Level
  const rawLevel = typeof input.experienceLevel === 'string' ? input.experienceLevel.trim() : '';
  if (!rawLevel) {
    errors.experienceLevel = 'Please select your current experience level.';
  } else if (!allowedExperienceLevels.includes(rawLevel)) {
    errors.experienceLevel = 'Selected experience level is not valid.';
  } else {
    sanitized.experienceLevel = rawLevel;
  }

  // 6. Learning Interests
  let rawInterests = [];
  if (Array.isArray(input.interests)) {
    rawInterests = input.interests;
  } else if (typeof input.interests === 'string') {
    rawInterests = [input.interests];
  }

  // Handle "All of the above" selection
  if (rawInterests.some((i) => typeof i === 'string' && i.toLowerCase().includes('all of the above'))) {
    sanitized.interests = [...allowedInterests];
  } else {
    // Filter and deduplicate
    const cleaned = Array.from(
      new Set(
        rawInterests
          .filter((i) => typeof i === 'string')
          .map((i) => i.trim())
          .filter((i) => allowedInterests.includes(i))
      )
    );

    if (cleaned.length === 0) {
      errors.interests = 'Please select at least one learning interest.';
    } else {
      sanitized.interests = cleaned;
    }
  }

  // 7. Message (Optional, max 500 characters)
  if (typeof input.message === 'string') {
    const trimmedMsg = input.message.trim();
    if (trimmedMsg.length > 500) {
      errors.message = 'Message cannot exceed 500 characters.';
    } else {
      sanitized.message = trimmedMsg;
    }
  } else {
    sanitized.message = '';
  }

  // 8. Referral Source (Optional)
  const rawSource = typeof input.source === 'string' ? input.source.trim() : '';
  if (rawSource && allowedSources.includes(rawSource)) {
    sanitized.source = rawSource;
  } else {
    sanitized.source = 'Other';
  }

  // 9. Consent to Contact (Mandatory)
  const consent = input.consentToContact === true || input.consentToContact === 'true';
  if (!consent) {
    errors.consentToContact = 'You must agree to be contacted about the demo class.';
  } else {
    sanitized.consentToContact = true;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: sanitized,
  };
}

module.exports = {
  validateInquiry,
  allowedExperienceLevels,
  allowedInterests,
  allowedSources,
};
