const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Student } = require('../models/Student');
const { _findMemoryStudentById } = require('../controllers/studentController');

/**
 * Authentication middleware for Student routes.
 * Accepts JWT via HTTP-only cookie ('student_token') or Authorization header ('Bearer <token>').
 * Enforces role isolation, account existence, and blocks suspended students.
 */
async function requireStudentAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.cookies && req.cookies.student_token) {
      token = req.cookies.student_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in to your student portal.',
      });
    }

    const secret = process.env.JWT_SECRET || 'rizmern_dev_super_secure_jwt_secret_key_2026_xyz987';
    const decoded = jwt.verify(token, secret);

    // Guard: Prevent admin or other roles from acting as student
    if (decoded.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Student account credentials required.',
      });
    }

    let student = null;
    if (mongoose.connection.readyState === 1) {
      student = await Student.findById(decoded.studentId);
    } else {
      student = _findMemoryStudentById(decoded.studentId);
    }

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Student account not found or session revoked.',
      });
    }

    // Guard: Block suspended student accounts
    if (student.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your student account has been suspended. Please contact instructor Rizwan Ullah.',
      });
    }

    // Attach student to request (omitting passwordHash)
    req.student = {
      _id: student._id.toString(),
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      status: student.status,
      avatar: student.avatar,
      enrolledCourses: student.enrolledCourses,
      inquiryId: student.inquiryId,
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid session token. Please log in again.',
    });
  }
}

module.exports = requireStudentAuth;
