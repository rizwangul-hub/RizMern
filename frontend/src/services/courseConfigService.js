/**
 * Course Configuration Service
 * Handles public course info and authenticated admin course settings
 */

import { API_BASE_URL } from '../config/api';

export const DEFAULT_COURSE_CONFIG = {
  courseName: 'Three-Month MERN Stack & React Native App Development',
  duration: 'Three Months',
  format: 'Live Online Classes',
  focus: 'Modern Web & Mobile App Development with AI',
  fee: null, // null renders clean "Coming Soon / Inquire for fee"
  currency: 'PKR',
  feeIncludes: [
    'Live online interactive classes with Rizwan Ullah',
    'Comprehensive 3-month curriculum access',
    'Hands-on full-stack & mobile project blueprints',
    'Direct architectural mentorship & code reviews',
    'AI-assisted engineering workflows & prompting techniques',
    'GitHub version control & cloud deployment coaching',
  ],
  classSchedule: [
    {
      day: 'Monday, Wednesday, Friday',
      startTime: '8:30 PM',
      endTime: '10:00 PM',
      timezone: 'PKT (Pakistan Standard Time)',
    },
  ],
  demoClass: {
    enabled: true,
    date: 'Upcoming Weekend (Saturday)',
    startTime: '8:00 PM',
    endTime: '9:15 PM',
    timezone: 'PKT',
    meetingPlatform: 'Google Meet',
    meetingLink: null,
    isMeetingLinkPublic: false,
    instructions: 'Meeting link and session reminders are dispatched directly via WhatsApp and email to registered attendees prior to the session.',
  },
  admissionStatus: 'open', // 'open' | 'coming_soon' | 'closed'
  admissionNotice: 'Registration is currently open for the next cohort. Register for the free demo class to reserve your slot.',
  whatsapp: {
    enabled: false,
    phone: '',
    groupLink: '',
    directChatEnabled: false,
    message: 'Hello Rizwan! I am interested in RizMern course admissions.',
  },
};

/**
 * Fetch public course config
 */
export async function fetchPublicCourseConfig() {
  try {
    const res = await fetch(`${API_BASE_URL}/course-config`);
    if (!res.ok) {
      throw new Error(`Failed to fetch course config: ${res.status}`);
    }
    const data = await res.json();
    if (data.success && data.config) {
      return {
        ...DEFAULT_COURSE_CONFIG,
        ...data.config,
        demoClass: {
          ...DEFAULT_COURSE_CONFIG.demoClass,
          ...(data.config.demoClass || {}),
        },
        whatsapp: {
          ...DEFAULT_COURSE_CONFIG.whatsapp,
          ...(data.config.whatsapp || {}),
        },
      };
    }
    return DEFAULT_COURSE_CONFIG;
  } catch (error) {
    console.warn('Public course config fetch failed, using fallback:', error);
    return DEFAULT_COURSE_CONFIG;
  }
}

/**
 * Fetch admin course config
 */
export async function fetchAdminCourseConfig(authFetch) {
  const res = await authFetch('/admin/course-config');
  if (!res.ok) {
    throw new Error('Failed to fetch admin course config');
  }
  return res.json();
}

/**
 * Update admin course config
 */
export async function updateAdminCourseConfig(authFetch, payload) {
  const res = await authFetch('/admin/course-config', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Failed to update course configuration');
  }
  return data;
}
