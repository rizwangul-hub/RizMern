const mongoose = require('mongoose');
const { Inquiry } = require('../models/Inquiry');
const { validateInquiry } = require('../validators/inquiryValidator');

// In-memory fallback storage when MongoDB daemon is not running locally during development/testing
const memoryFallbackInquiries = [];

/**
 * Handle incoming demo / admission inquiries
 * POST /api/inquiries
 */
async function createInquiry(req, res) {
  try {
    // 1. Validation & Sanitization
    const { isValid, errors, sanitizedData } = validateInquiry(req.body);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Please fix the errors in your submission.',
        errors,
      });
    }

    // 2. Extract Client IP
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';
    sanitizedData.ipAddress = clientIp;

    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    // 3. Duplicate Detection Check (Within last 15 minutes by email OR phone)
    if (mongoose.connection.readyState === 1) {
      const recentDuplicate = await Inquiry.findOne({
        $or: [
          { email: sanitizedData.email },
          { phone: sanitizedData.phone },
        ],
        createdAt: { $gte: fifteenMinutesAgo },
      }).lean();

      if (recentDuplicate) {
        return res.status(409).json({
          success: false,
          message:
            'We have already received an inquiry with this email or phone number in the last 15 minutes. Our team will contact you shortly!',
        });
      }

      // 4. Save to MongoDB
      const inquiryDoc = new Inquiry(sanitizedData);
      const savedInquiry = await inquiryDoc.save();

      return res.status(201).json({
        success: true,
        message: 'Your demo inquiry has been submitted successfully.',
        inquiryId: savedInquiry._id,
        data: {
          fullName: savedInquiry.fullName,
          email: savedInquiry.email,
          phone: savedInquiry.phone,
          experienceLevel: savedInquiry.experienceLevel,
          interests: savedInquiry.interests,
          createdAt: savedInquiry.createdAt,
        },
      });
    } else {
      // Resilient In-Memory Fallback for development without active mongod
      const recentInMemoryDuplicate = memoryFallbackInquiries.find(
        (inq) =>
          (inq.email === sanitizedData.email || inq.phone === sanitizedData.phone) &&
          new Date(inq.createdAt) >= fifteenMinutesAgo
      );

      if (recentInMemoryDuplicate) {
        return res.status(409).json({
          success: false,
          message:
            'We have already received an inquiry with this email or phone number in the last 15 minutes. Our team will contact you shortly!',
        });
      }

      const nowIso = new Date().toISOString();
      const mockInquiry = {
        _id: 'inq_' + Math.random().toString(36).substring(2, 10),
        ...sanitizedData,
        status: 'new',
        adminNotes: '',
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      memoryFallbackInquiries.push(mockInquiry);

      return res.status(201).json({
        success: true,
        message: 'Your demo inquiry has been submitted successfully.',
        inquiryId: mockInquiry._id,
        data: {
          fullName: mockInquiry.fullName,
          email: mockInquiry.email,
          phone: mockInquiry.phone,
          experienceLevel: mockInquiry.experienceLevel,
          interests: mockInquiry.interests,
          createdAt: mockInquiry.createdAt,
        },
      });
    }
  } catch (error) {
    console.error('Error handling inquiry submission:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while saving your inquiry. Please try again.',
    });
  }
}

/**
 * Clear in-memory fallback list (used during automated tests)
 */
function _clearMemoryInquiries() {
  memoryFallbackInquiries.length = 0;
}

module.exports = {
  createInquiry,
  _clearMemoryInquiries,
  memoryFallbackInquiries,
};
