const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Student } = require('../models/Student');
const { CourseModule, CourseLesson, getDefaultModulesAndLessons } = require('../models/CourseContent');
const { CourseProgress } = require('../models/CourseProgress');

// ==========================================
// In-Memory Fallback Store (for offline/test)
// ==========================================
const memoryStore = {
  students: [],
  modules: [],
  lessons: [],
  progress: [],
};

/**
 * Seed memory store with initial curriculum and test student
 */
function initMemoryStore() {
  const initialData = getDefaultModulesAndLessons();
  memoryStore.modules = initialData.map((m) => ({
    _id: m.id,
    courseId: 'rizmern-3month',
    month: m.month,
    title: m.title,
    description: m.description,
    order: m.order,
  }));

  memoryStore.lessons = [];
  initialData.forEach((m) => {
    m.lessons.forEach((l) => {
      memoryStore.lessons.push({
        _id: l.id,
        moduleId: m.id,
        courseId: 'rizmern-3month',
        title: l.title,
        slug: l.slug,
        description: l.description,
        order: l.order,
        content: l.content,
        videoUrl: l.videoUrl || null,
        resources: l.resources || [],
        published: l.published ?? true,
      });
    });
  });

  const salt = bcrypt.genSaltSync(10);
  const defaultPasswordHash = bcrypt.hashSync('StudentPass123!', salt);

  memoryStore.students = [
    {
      _id: 'std_test_001',
      fullName: 'Ahmad Khan',
      email: 'student@rizmern.com',
      phone: '+923001112233',
      passwordHash: defaultPasswordHash,
      status: 'active',
      avatar: null,
      enrolledCourses: ['rizmern-3month'],
      inquiryId: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: 'std_test_002_suspended',
      fullName: 'Suspended Student',
      email: 'suspended@rizmern.com',
      phone: '+923009998877',
      passwordHash: defaultPasswordHash,
      status: 'suspended',
      avatar: null,
      enrolledCourses: ['rizmern-3month'],
      inquiryId: null,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  memoryStore.progress = [
    {
      _id: 'prog_test_001',
      studentId: 'std_test_001',
      courseId: 'rizmern-3month',
      completedLessons: [],
      progressPercentage: 0,
      lastLessonId: null,
      updatedAt: new Date(),
    },
  ];
}

initMemoryStore();

// In-memory query helpers
function _findMemoryStudentById(id) {
  return memoryStore.students.find((s) => s._id.toString() === id.toString()) || null;
}

function _findMemoryStudentByEmail(email) {
  if (!email) return null;
  return memoryStore.students.find((s) => s.email.toLowerCase() === email.toLowerCase().trim()) || null;
}

function _resetMemoryStudentData() {
  initMemoryStore();
}

/**
 * Helper to generate JWT token for student
 */
function generateStudentToken(studentId, email) {
  const secret = process.env.JWT_SECRET || 'rizmern_dev_super_secure_jwt_secret_key_2026_xyz987';
  return jwt.sign(
    { studentId: studentId.toString(), email, role: 'student' },
    secret,
    { expiresIn: '7d' }
  );
}

// ==========================================
// Student Authentication Controllers
// ==========================================

/**
 * POST /api/student/login
 */
async function studentLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both your student email and password.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    let student = null;

    if (mongoose.connection.readyState === 1) {
      student = await Student.findOne({ email: cleanEmail });
    } else {
      student = _findMemoryStudentByEmail(cleanEmail);
    }

    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, student.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Guard: Account status check
    if (student.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your student account is suspended. Please contact the instructor.',
      });
    }

    // Activate account if currently in invited state
    if (student.status === 'invited') {
      student.status = 'active';
    }

    student.lastLoginAt = new Date();

    if (mongoose.connection.readyState === 1) {
      await student.save();
    }

    const token = generateStudentToken(student._id, student.email);

    // Set secure HTTP-only cookie
    res.cookie('student_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeStudent = {
      _id: student._id.toString(),
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      status: student.status,
      avatar: student.avatar,
      enrolledCourses: student.enrolledCourses,
      lastLoginAt: student.lastLoginAt,
    };

    return res.status(200).json({
      success: true,
      message: 'Welcome to your student portal.',
      token,
      student: safeStudent,
    });
  } catch (error) {
    console.error('Student login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed due to an unexpected error.',
    });
  }
}

/**
 * POST /api/student/logout
 */
function studentLogout(req, res) {
  res.clearCookie('student_token', {
    httpOnly: true,
    sameSite: 'lax',
  });
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
}

/**
 * GET /api/student/me
 */
function getStudentProfile(req, res) {
  return res.status(200).json({
    success: true,
    student: req.student,
  });
}

/**
 * PATCH /api/student/profile
 */
async function updateStudentProfile(req, res) {
  try {
    const { fullName, phone } = req.body;
    const studentId = req.student._id;

    if (fullName && (fullName.trim().length < 2 || fullName.trim().length > 80)) {
      return res.status(400).json({
        success: false,
        message: 'Full name must be between 2 and 80 characters.',
      });
    }

    if (mongoose.connection.readyState === 1) {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found.' });
      }
      if (fullName) student.fullName = fullName.trim();
      if (phone !== undefined) student.phone = phone.trim();
      await student.save();

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        student: student.toSafeObject(),
      });
    } else {
      const student = _findMemoryStudentById(studentId);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found.' });
      }
      if (fullName) student.fullName = fullName.trim();
      if (phone !== undefined) student.phone = phone.trim();

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully.',
        student: { ...student, passwordHash: undefined },
      });
    }
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
}

/**
 * PATCH /api/student/password
 */
async function changeStudentPassword(req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const studentId = req.student._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.',
      });
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match.',
      });
    }

    let student = null;
    if (mongoose.connection.readyState === 1) {
      student = await Student.findById(studentId);
    } else {
      student = _findMemoryStudentById(studentId);
    }

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, student.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);
    student.passwordHash = newHash;

    if (mongoose.connection.readyState === 1) {
      await student.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    console.error('Password change error:', error);
    return res.status(500).json({ success: false, message: 'Failed to change password.' });
  }
}

// ==========================================
// Course & Lesson Learning Portal
// ==========================================

/**
 * Helper to fetch modules and published lessons for a course
 */
async function getCourseHierarchy(courseId, studentId) {
  let modules = [];
  let lessons = [];
  let completedLessonIds = [];

  if (mongoose.connection.readyState === 1) {
    modules = await CourseModule.find({ courseId }).sort({ order: 1 }).lean();
    lessons = await CourseLesson.find({ courseId, published: true }).sort({ order: 1 }).lean();
    const progress = await CourseProgress.findOne({ studentId, courseId }).lean();
    if (progress) completedLessonIds = progress.completedLessons || [];
  } else {
    modules = memoryStore.modules.filter((m) => m.courseId === courseId).sort((a, b) => a.order - b.order);
    lessons = memoryStore.lessons
      .filter((l) => l.courseId === courseId && l.published === true)
      .sort((a, b) => a.order - b.order);
    const progress = memoryStore.progress.find((p) => p.studentId === studentId && p.courseId === courseId);
    if (progress) completedLessonIds = progress.completedLessons || [];
  }

  // Nest lessons into modules (omitting heavy content)
  const moduleTree = modules.map((mod) => {
    const modId = (mod._id || mod.id).toString();
    const modLessons = lessons
      .filter((l) => (l.moduleId ? l.moduleId.toString() === modId : false))
      .map((l) => {
        const lessonId = (l._id || l.id).toString();
        return {
          _id: lessonId,
          title: l.title,
          slug: l.slug,
          order: l.order,
          duration: l.duration || '15 min',
          isCompleted: completedLessonIds.includes(lessonId),
        };
      });

    return {
      _id: modId,
      month: mod.month,
      title: mod.title,
      description: mod.description,
      order: mod.order,
      lessonCount: modLessons.length,
      completedCount: modLessons.filter((l) => l.isCompleted).length,
      lessons: modLessons,
    };
  });

  return {
    modules: moduleTree,
    totalLessons: lessons.length,
    completedLessonsCount: completedLessonIds.length,
  };
}

/**
 * GET /api/student/courses
 */
function getStudentCourses(req, res) {
  const enrolledCourses = [
    {
      courseId: 'rizmern-3month',
      title: 'Three-Month MERN Stack & React Native App Development',
      duration: 'Three Months',
      delivery: 'Live Online & Practical Portal',
      instructor: 'Rizwan Ullah',
      enrolled: true,
    },
  ];

  return res.status(200).json({
    success: true,
    courses: enrolledCourses,
  });
}

/**
 * GET /api/student/courses/:courseId
 */
async function getStudentCourseDetails(req, res) {
  try {
    const { courseId } = req.params;
    const student = req.student;

    if (!student.enrolledCourses.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: 'You are not enrolled in this course.',
      });
    }

    const { modules, totalLessons, completedLessonsCount } = await getCourseHierarchy(courseId, student._id);

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    return res.status(200).json({
      success: true,
      course: {
        courseId,
        name: 'Three-Month MERN Stack & React Native App Development',
        duration: 'Three Months',
        modules,
        totalLessons,
        completedLessonsCount,
        progressPercentage,
      },
    });
  } catch (error) {
    console.error('Error fetching course structure:', error);
    return res.status(500).json({ success: false, message: 'Failed to load course curriculum.' });
  }
}

/**
 * GET /api/student/lessons/:lessonId
 */
async function getStudentLesson(req, res) {
  try {
    const { lessonId } = req.params;
    const student = req.student;

    let lesson = null;
    let allPublishedLessons = [];

    if (mongoose.connection.readyState === 1) {
      lesson = await CourseLesson.findOne({
        $or: [
          mongoose.Types.ObjectId.isValid(lessonId) ? { _id: lessonId } : null,
          { slug: lessonId },
        ].filter(Boolean),
        published: true,
      }).lean();

      if (lesson) {
        allPublishedLessons = await CourseLesson.find({ courseId: lesson.courseId, published: true })
          .sort({ order: 1 })
          .lean();
      }
    } else {
      lesson = memoryStore.lessons.find(
        (l) => (l._id.toString() === lessonId || l.slug === lessonId) && l.published === true
      );
      if (lesson) {
        allPublishedLessons = memoryStore.lessons
          .filter((l) => l.courseId === lesson.courseId && l.published === true)
          .sort((a, b) => a.order - b.order);
      }
    }

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found or currently in draft.',
      });
    }

    // Access control: Ensure student is enrolled in the course
    if (!student.enrolledCourses.includes(lesson.courseId)) {
      return res.status(403).json({
        success: false,
        message: 'You are not enrolled in the course for this lesson.',
      });
    }

    // Determine completion status
    let isCompleted = false;
    if (mongoose.connection.readyState === 1) {
      const progress = await CourseProgress.findOne({ studentId: student._id, courseId: lesson.courseId }).lean();
      if (progress && progress.completedLessons) {
        isCompleted = progress.completedLessons.includes(lesson._id.toString());
      }
    } else {
      const progress = memoryStore.progress.find(
        (p) => p.studentId === student._id && p.courseId === lesson.courseId
      );
      if (progress && progress.completedLessons) {
        isCompleted = progress.completedLessons.includes(lesson._id.toString());
      }
    }

    // Determine Previous and Next lesson in sequence
    const currentIndex = allPublishedLessons.findIndex((l) => l._id.toString() === lesson._id.toString());
    const prevLesson = currentIndex > 0 ? {
      _id: allPublishedLessons[currentIndex - 1]._id.toString(),
      title: allPublishedLessons[currentIndex - 1].title,
      slug: allPublishedLessons[currentIndex - 1].slug,
    } : null;

    const nextLesson = currentIndex >= 0 && currentIndex < allPublishedLessons.length - 1 ? {
      _id: allPublishedLessons[currentIndex + 1]._id.toString(),
      title: allPublishedLessons[currentIndex + 1].title,
      slug: allPublishedLessons[currentIndex + 1].slug,
    } : null;

    return res.status(200).json({
      success: true,
      lesson: {
        _id: lesson._id.toString(),
        moduleId: lesson.moduleId ? lesson.moduleId.toString() : null,
        courseId: lesson.courseId,
        title: lesson.title,
        slug: lesson.slug,
        description: lesson.description,
        order: lesson.order,
        content: lesson.content,
        videoUrl: lesson.videoUrl,
        resources: lesson.resources || [],
        isCompleted,
        prevLesson,
        nextLesson,
      },
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return res.status(500).json({ success: false, message: 'Failed to load lesson content.' });
  }
}

/**
 * POST /api/student/lessons/:lessonId/complete
 */
async function completeLesson(req, res) {
  try {
    const { lessonId } = req.params;
    const student = req.student;

    let lesson = null;
    let totalPublishedCount = 0;

    if (mongoose.connection.readyState === 1) {
      lesson = await CourseLesson.findOne({
        $or: [
          mongoose.Types.ObjectId.isValid(lessonId) ? { _id: lessonId } : null,
          { slug: lessonId },
        ].filter(Boolean),
        published: true,
      });

      if (lesson) {
        totalPublishedCount = await CourseLesson.countDocuments({
          courseId: lesson.courseId,
          published: true,
        });
      }
    } else {
      lesson = memoryStore.lessons.find(
        (l) => (l._id.toString() === lessonId || l.slug === lessonId) && l.published === true
      );
      if (lesson) {
        totalPublishedCount = memoryStore.lessons.filter(
          (l) => l.courseId === lesson.courseId && l.published === true
        ).length;
      }
    }

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found.' });
    }

    const cleanLessonId = lesson._id.toString();
    const courseId = lesson.courseId;

    if (!student.enrolledCourses.includes(courseId)) {
      return res.status(403).json({ success: false, message: 'Not enrolled in this course.' });
    }

    let progressObj = null;

    if (mongoose.connection.readyState === 1) {
      let progress = await CourseProgress.findOne({ studentId: student._id, courseId });
      if (!progress) {
        progress = new CourseProgress({
          studentId: student._id,
          courseId,
          completedLessons: [],
        });
      }

      // Add lesson if not already present
      if (!progress.completedLessons.includes(cleanLessonId)) {
        progress.completedLessons.push(cleanLessonId);
      }

      progress.lastLessonId = cleanLessonId;
      progress.progressPercentage =
        totalPublishedCount > 0
          ? Math.min(100, Math.round((progress.completedLessons.length / totalPublishedCount) * 100))
          : 0;

      await progress.save();
      progressObj = progress.toObject();
    } else {
      let progress = memoryStore.progress.find(
        (p) => p.studentId === student._id && p.courseId === courseId
      );

      if (!progress) {
        progress = {
          _id: `prog_${Date.now()}`,
          studentId: student._id,
          courseId,
          completedLessons: [],
          progressPercentage: 0,
          lastLessonId: null,
          updatedAt: new Date(),
        };
        memoryStore.progress.push(progress);
      }

      if (!progress.completedLessons.includes(cleanLessonId)) {
        progress.completedLessons.push(cleanLessonId);
      }

      progress.lastLessonId = cleanLessonId;
      progress.progressPercentage =
        totalPublishedCount > 0
          ? Math.min(100, Math.round((progress.completedLessons.length / totalPublishedCount) * 100))
          : 0;
      progress.updatedAt = new Date();
      progressObj = { ...progress };
    }

    return res.status(200).json({
      success: true,
      message: 'Lesson marked as completed.',
      progress: {
        completedLessons: progressObj.completedLessons,
        progressPercentage: progressObj.progressPercentage,
        lastLessonId: progressObj.lastLessonId,
      },
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    return res.status(500).json({ success: false, message: 'Failed to record completion.' });
  }
}

/**
 * GET /api/student/progress
 */
async function getStudentProgress(req, res) {
  try {
    const student = req.student;
    const courseId = 'rizmern-3month';

    const { modules, totalLessons, completedLessonsCount } = await getCourseHierarchy(courseId, student._id);

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

    // Identify next unfinished lesson
    let nextLesson = null;
    for (const mod of modules) {
      const unfinished = mod.lessons.find((l) => !l.isCompleted);
      if (unfinished) {
        nextLesson = {
          _id: unfinished._id,
          title: unfinished.title,
          slug: unfinished.slug,
          moduleTitle: mod.title,
          month: mod.month,
        };
        break;
      }
    }

    // Month breakdown
    const monthStats = [1, 2, 3].map((monthNum) => {
      const monthMods = modules.filter((m) => m.month === monthNum);
      const totalInMonth = monthMods.reduce((sum, m) => sum + m.lessonCount, 0);
      const completedInMonth = monthMods.reduce((sum, m) => sum + m.completedCount, 0);
      const percentage = totalInMonth > 0 ? Math.round((completedInMonth / totalInMonth) * 100) : 0;
      return {
        month: monthNum,
        title: monthNum === 1 ? 'Month 1 — Frontend' : monthNum === 2 ? 'Month 2 — MERN Full Stack' : 'Month 3 — React Native & Deployment',
        totalLessons: totalInMonth,
        completedLessons: completedInMonth,
        percentage,
      };
    });

    return res.status(200).json({
      success: true,
      progress: {
        courseId,
        courseName: 'Three-Month MERN Stack & React Native App Development',
        progressPercentage,
        totalLessons,
        completedLessonsCount,
        remainingLessonsCount: Math.max(0, totalLessons - completedLessonsCount),
        nextLesson,
        monthStats,
        modules,
      },
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve progress data.' });
  }
}

module.exports = {
  studentLogin,
  studentLogout,
  getStudentProfile,
  updateStudentProfile,
  changeStudentPassword,
  getStudentCourses,
  getStudentCourseDetails,
  getStudentLesson,
  completeLesson,
  getStudentProgress,
  _findMemoryStudentById,
  _findMemoryStudentByEmail,
  _resetMemoryStudentData,
  memoryStore,
};
