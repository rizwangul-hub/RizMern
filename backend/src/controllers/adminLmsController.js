const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Student, allowedStudentStatuses } = require('../models/Student');
const { CourseModule, CourseLesson } = require('../models/CourseContent');
const { CourseProgress } = require('../models/CourseProgress');
const { Inquiry } = require('../models/Inquiry');
const { memoryStore } = require('./studentController');

// ==========================================
// Admin Student Management Controllers
// ==========================================

/**
 * GET /api/admin/students
 */
async function getAdminStudents(req, res) {
  try {
    let studentList = [];

    if (mongoose.connection.readyState === 1) {
      const students = await Student.find().sort({ createdAt: -1 }).lean();
      const progresses = await CourseProgress.find({ courseId: 'rizmern-3month' }).lean();
      const progressMap = {};
      progresses.forEach((p) => {
        progressMap[p.studentId.toString()] = p.progressPercentage || 0;
      });

      studentList = students.map((s) => ({
        _id: s._id.toString(),
        fullName: s.fullName,
        email: s.email,
        phone: s.phone,
        status: s.status,
        enrolledCourses: s.enrolledCourses,
        progressPercentage: progressMap[s._id.toString()] || 0,
        inquiryId: s.inquiryId ? s.inquiryId.toString() : null,
        lastLoginAt: s.lastLoginAt,
        createdAt: s.createdAt,
      }));
    } else {
      const progressMap = {};
      memoryStore.progress.forEach((p) => {
        progressMap[p.studentId.toString()] = p.progressPercentage || 0;
      });

      studentList = memoryStore.students.map((s) => ({
        _id: s._id.toString(),
        fullName: s.fullName,
        email: s.email,
        phone: s.phone,
        status: s.status,
        enrolledCourses: s.enrolledCourses,
        progressPercentage: progressMap[s._id.toString()] || 0,
        inquiryId: s.inquiryId,
        lastLoginAt: s.lastLoginAt,
        createdAt: s.createdAt,
      }));
    }

    return res.status(200).json({
      success: true,
      students: studentList,
      total: studentList.length,
    });
  } catch (error) {
    console.error('Error listing students for admin:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve students list.' });
  }
}

/**
 * GET /api/admin/students/:id
 */
async function getAdminStudentById(req, res) {
  try {
    const { id } = req.params;
    let student = null;
    let progress = null;

    if (mongoose.connection.readyState === 1) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid student ID.' });
      }
      student = await Student.findById(id).lean();
      if (student) {
        progress = await CourseProgress.findOne({ studentId: id, courseId: 'rizmern-3month' }).lean();
      }
    } else {
      student = memoryStore.students.find((s) => s._id.toString() === id.toString());
      if (student) {
        progress = memoryStore.progress.find((p) => p.studentId === id && p.courseId === 'rizmern-3month');
      }
    }

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    const safeStudent = {
      _id: student._id.toString(),
      fullName: student.fullName,
      email: student.email,
      phone: student.phone,
      status: student.status,
      enrolledCourses: student.enrolledCourses,
      inquiryId: student.inquiryId ? student.inquiryId.toString() : null,
      lastLoginAt: student.lastLoginAt,
      createdAt: student.createdAt,
      progress: progress || { progressPercentage: 0, completedLessons: [] },
    };

    return res.status(200).json({
      success: true,
      student: safeStudent,
    });
  } catch (error) {
    console.error('Error fetching student details:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve student details.' });
  }
}

/**
 * POST /api/admin/students
 */
async function createAdminStudent(req, res) {
  try {
    const { fullName, email, phone, initialPassword, enrolledCourses, inquiryId } = req.body;

    if (!fullName || !fullName.trim() || !email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full name and email are required.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const rawPassword = initialPassword && initialPassword.trim() ? initialPassword.trim() : 'RizMern2026!';

    // Check duplicate email
    if (mongoose.connection.readyState === 1) {
      const existing = await Student.findOne({ email: cleanEmail });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Student with email '${cleanEmail}' already exists.`,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(rawPassword, salt);

      const newStudent = new Student({
        fullName: fullName.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : '',
        passwordHash,
        status: 'active',
        enrolledCourses: Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ? enrolledCourses : ['rizmern-3month'],
        inquiryId: inquiryId && mongoose.Types.ObjectId.isValid(inquiryId) ? inquiryId : null,
      });

      await newStudent.save();

      // If inquiryId was passed, update inquiry status to enrolled
      if (inquiryId && mongoose.Types.ObjectId.isValid(inquiryId)) {
        await Inquiry.findByIdAndUpdate(inquiryId, { status: 'enrolled' });
      }

      return res.status(201).json({
        success: true,
        message: 'Student account created and enrolled successfully.',
        student: newStudent.toSafeObject(),
        temporaryPassword: rawPassword,
      });
    } else {
      const existing = memoryStore.students.find((s) => s.email.toLowerCase() === cleanEmail);
      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Student with email '${cleanEmail}' already exists.`,
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(rawPassword, salt);

      const newStudent = {
        _id: `std_${Date.now()}`,
        fullName: fullName.trim(),
        email: cleanEmail,
        phone: phone ? phone.trim() : '',
        passwordHash,
        status: 'active',
        avatar: null,
        enrolledCourses: Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ? enrolledCourses : ['rizmern-3month'],
        inquiryId: inquiryId || null,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      memoryStore.students.push(newStudent);

      return res.status(201).json({
        success: true,
        message: 'Student account created and enrolled successfully.',
        student: { ...newStudent, passwordHash: undefined },
        temporaryPassword: rawPassword,
      });
    }
  } catch (error) {
    console.error('Error creating student account:', error);
    return res.status(500).json({ success: false, message: 'Failed to create student account.' });
  }
}

/**
 * PATCH /api/admin/students/:id
 */
async function updateAdminStudent(req, res) {
  try {
    const { id } = req.params;
    const { status, phone, enrolledCourses, fullName } = req.body;

    if (status && !allowedStudentStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${allowedStudentStatuses.join(', ')}.`,
      });
    }

    if (mongoose.connection.readyState === 1) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid student ID.' });
      }

      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found.' });
      }

      if (status) student.status = status;
      if (fullName) student.fullName = fullName.trim();
      if (phone !== undefined) student.phone = phone.trim();
      if (Array.isArray(enrolledCourses)) student.enrolledCourses = enrolledCourses;

      await student.save();

      return res.status(200).json({
        success: true,
        message: 'Student record updated successfully.',
        student: student.toSafeObject(),
      });
    } else {
      const student = memoryStore.students.find((s) => s._id.toString() === id.toString());
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found.' });
      }

      if (status) student.status = status;
      if (fullName) student.fullName = fullName.trim();
      if (phone !== undefined) student.phone = phone.trim();
      if (Array.isArray(enrolledCourses)) student.enrolledCourses = enrolledCourses;
      student.updatedAt = new Date();

      return res.status(200).json({
        success: true,
        message: 'Student record updated successfully.',
        student: { ...student, passwordHash: undefined },
      });
    }
  } catch (error) {
    console.error('Error updating student record:', error);
    return res.status(500).json({ success: false, message: 'Failed to update student record.' });
  }
}

/**
 * POST /api/admin/inquiries/:id/enroll
 * Converts an existing inquiry directly into an enrolled student account
 */
async function enrollInquiryStudent(req, res) {
  try {
    const { id } = req.params;
    let inquiry = null;

    if (mongoose.connection.readyState === 1) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid inquiry ID.' });
      }
      inquiry = await Inquiry.findById(id);
    } else {
      const { memoryFallbackInquiries } = require('./inquiryController');
      inquiry = memoryFallbackInquiries.find((inq) => inq._id.toString() === id.toString());
    }

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry record not found.' });
    }

    const cleanEmail = inquiry.email.toLowerCase().trim();
    const defaultPassword = 'RizMern2026!';

    // Check if student already exists
    let existingStudent = null;
    if (mongoose.connection.readyState === 1) {
      existingStudent = await Student.findOne({ email: cleanEmail });
    } else {
      existingStudent = memoryStore.students.find((s) => s.email.toLowerCase() === cleanEmail);
    }

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: `Student account for ${cleanEmail} already exists.`,
        student: existingStudent.toSafeObject ? existingStudent.toSafeObject() : { ...existingStudent, passwordHash: undefined },
      });
    }

    // Hash default password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(defaultPassword, salt);

    if (mongoose.connection.readyState === 1) {
      const newStudent = new Student({
        fullName: inquiry.fullName,
        email: cleanEmail,
        phone: inquiry.phone || '',
        passwordHash,
        status: 'active',
        enrolledCourses: ['rizmern-3month'],
        inquiryId: inquiry._id,
      });

      await newStudent.save();

      // Update inquiry status
      inquiry.status = 'enrolled';
      await inquiry.save();

      return res.status(201).json({
        success: true,
        message: 'Inquiry successfully enrolled as student.',
        student: newStudent.toSafeObject(),
        temporaryPassword: defaultPassword,
      });
    } else {
      const newStudent = {
        _id: `std_${Date.now()}`,
        fullName: inquiry.fullName,
        email: cleanEmail,
        phone: inquiry.phone || '',
        passwordHash,
        status: 'active',
        avatar: null,
        enrolledCourses: ['rizmern-3month'],
        inquiryId: inquiry._id,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      memoryStore.students.push(newStudent);
      inquiry.status = 'enrolled';

      return res.status(201).json({
        success: true,
        message: 'Inquiry successfully enrolled as student.',
        student: { ...newStudent, passwordHash: undefined },
        temporaryPassword: defaultPassword,
      });
    }
  } catch (error) {
    console.error('Error enrolling student from inquiry:', error);
    return res.status(500).json({ success: false, message: 'Failed to enroll student from inquiry.' });
  }
}

// ==========================================
// Admin Course Content Management Controllers
// ==========================================

/**
 * GET /api/admin/course-content
 * Lists all modules and all lessons (including draft / unpublished lessons)
 */
async function getAdminCourseContent(req, res) {
  try {
    let modules = [];
    let lessons = [];

    if (mongoose.connection.readyState === 1) {
      modules = await CourseModule.find({ courseId: 'rizmern-3month' }).sort({ order: 1 }).lean();
      lessons = await CourseLesson.find({ courseId: 'rizmern-3month' }).sort({ order: 1 }).lean();
    } else {
      modules = memoryStore.modules.filter((m) => m.courseId === 'rizmern-3month').sort((a, b) => a.order - b.order);
      lessons = memoryStore.lessons.filter((l) => l.courseId === 'rizmern-3month').sort((a, b) => a.order - b.order);
    }

    const structure = modules.map((mod) => {
      const modId = (mod._id || mod.id).toString();
      const modLessons = lessons.filter((l) => (l.moduleId ? l.moduleId.toString() === modId : false));
      return {
        ...mod,
        _id: modId,
        lessons: modLessons.map((l) => ({
          _id: (l._id || l.id).toString(),
          title: l.title,
          slug: l.slug,
          order: l.order,
          description: l.description,
          published: l.published,
          videoUrl: l.videoUrl,
          resourcesCount: (l.resources || []).length,
        })),
      };
    });

    return res.status(200).json({
      success: true,
      modules: structure,
      totalModules: modules.length,
      totalLessons: lessons.length,
      publishedLessons: lessons.filter((l) => l.published).length,
    });
  } catch (error) {
    console.error('Error fetching admin course content:', error);
    return res.status(500).json({ success: false, message: 'Failed to load course content.' });
  }
}

/**
 * POST /api/admin/modules
 */
async function createAdminModule(req, res) {
  try {
    const { month, title, description, order } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Module title is required.' });
    }

    const numericMonth = Number(month) || 1;
    const numericOrder = Number(order) || 1;

    if (mongoose.connection.readyState === 1) {
      const newModule = new CourseModule({
        courseId: 'rizmern-3month',
        month: numericMonth,
        title: title.trim(),
        description: description ? description.trim() : '',
        order: numericOrder,
      });
      await newModule.save();
      return res.status(201).json({ success: true, message: 'Module created successfully.', module: newModule });
    } else {
      const newModule = {
        _id: `mod_${Date.now()}`,
        courseId: 'rizmern-3month',
        month: numericMonth,
        title: title.trim(),
        description: description ? description.trim() : '',
        order: numericOrder,
      };
      memoryStore.modules.push(newModule);
      return res.status(201).json({ success: true, message: 'Module created successfully.', module: newModule });
    }
  } catch (error) {
    console.error('Error creating module:', error);
    return res.status(500).json({ success: false, message: 'Failed to create module.' });
  }
}

/**
 * PATCH /api/admin/modules/:id
 */
async function updateAdminModule(req, res) {
  try {
    const { id } = req.params;
    const { title, description, month, order } = req.body;

    if (mongoose.connection.readyState === 1) {
      const mod = await CourseModule.findById(id);
      if (!mod) return res.status(404).json({ success: false, message: 'Module not found.' });

      if (title) mod.title = title.trim();
      if (description !== undefined) mod.description = description.trim();
      if (month !== undefined) mod.month = Number(month);
      if (order !== undefined) mod.order = Number(order);

      await mod.save();
      return res.status(200).json({ success: true, message: 'Module updated successfully.', module: mod });
    } else {
      const mod = memoryStore.modules.find((m) => m._id.toString() === id.toString());
      if (!mod) return res.status(404).json({ success: false, message: 'Module not found.' });

      if (title) mod.title = title.trim();
      if (description !== undefined) mod.description = description.trim();
      if (month !== undefined) mod.month = Number(month);
      if (order !== undefined) mod.order = Number(order);

      return res.status(200).json({ success: true, message: 'Module updated successfully.', module: mod });
    }
  } catch (error) {
    console.error('Error updating module:', error);
    return res.status(500).json({ success: false, message: 'Failed to update module.' });
  }
}

/**
 * POST /api/admin/lessons
 */
async function createAdminLesson(req, res) {
  try {
    const { moduleId, title, slug, description, content, videoUrl, resources, published, order } = req.body;

    if (!moduleId || !title || !title.trim() || !content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Module ID, title, and lesson content are required.',
      });
    }

    const cleanSlug = slug && slug.trim()
      ? slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (mongoose.connection.readyState === 1) {
      const newLesson = new CourseLesson({
        moduleId,
        courseId: 'rizmern-3month',
        title: title.trim(),
        slug: cleanSlug,
        description: description ? description.trim() : '',
        content: content.trim(),
        videoUrl: videoUrl ? videoUrl.trim() : null,
        resources: Array.isArray(resources) ? resources : [],
        published: published !== undefined ? Boolean(published) : true,
        order: Number(order) || 1,
      });

      await newLesson.save();
      return res.status(201).json({ success: true, message: 'Lesson created successfully.', lesson: newLesson });
    } else {
      const newLesson = {
        _id: `les_${Date.now()}`,
        moduleId,
        courseId: 'rizmern-3month',
        title: title.trim(),
        slug: cleanSlug,
        description: description ? description.trim() : '',
        content: content.trim(),
        videoUrl: videoUrl ? videoUrl.trim() : null,
        resources: Array.isArray(resources) ? resources : [],
        published: published !== undefined ? Boolean(published) : true,
        order: Number(order) || 1,
      };
      memoryStore.lessons.push(newLesson);
      return res.status(201).json({ success: true, message: 'Lesson created successfully.', lesson: newLesson });
    }
  } catch (error) {
    console.error('Error creating lesson:', error);
    return res.status(500).json({ success: false, message: 'Failed to create lesson.' });
  }
}

/**
 * PATCH /api/admin/lessons/:id
 */
async function updateAdminLesson(req, res) {
  try {
    const { id } = req.params;
    const { title, slug, description, content, videoUrl, resources, published, order, moduleId } = req.body;

    if (mongoose.connection.readyState === 1) {
      const lesson = await CourseLesson.findById(id);
      if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found.' });

      if (title) lesson.title = title.trim();
      if (slug) lesson.slug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (description !== undefined) lesson.description = description.trim();
      if (content) lesson.content = content.trim();
      if (videoUrl !== undefined) lesson.videoUrl = videoUrl ? videoUrl.trim() : null;
      if (Array.isArray(resources)) lesson.resources = resources;
      if (published !== undefined) lesson.published = Boolean(published);
      if (order !== undefined) lesson.order = Number(order);
      if (moduleId) lesson.moduleId = moduleId;

      await lesson.save();
      return res.status(200).json({ success: true, message: 'Lesson updated successfully.', lesson });
    } else {
      const lesson = memoryStore.lessons.find((l) => l._id.toString() === id.toString());
      if (!lesson) return res.status(404).json({ success: false, message: 'Lesson not found.' });

      if (title) lesson.title = title.trim();
      if (slug) lesson.slug = slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      if (description !== undefined) lesson.description = description.trim();
      if (content) lesson.content = content.trim();
      if (videoUrl !== undefined) lesson.videoUrl = videoUrl ? videoUrl.trim() : null;
      if (Array.isArray(resources)) lesson.resources = resources;
      if (published !== undefined) lesson.published = Boolean(published);
      if (order !== undefined) lesson.order = Number(order);
      if (moduleId) lesson.moduleId = moduleId;

      return res.status(200).json({ success: true, message: 'Lesson updated successfully.', lesson });
    }
  } catch (error) {
    console.error('Error updating lesson:', error);
    return res.status(500).json({ success: false, message: 'Failed to update lesson.' });
  }
}

/**
 * DELETE /api/admin/lessons/:id
 */
async function deleteAdminLesson(req, res) {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const deleted = await CourseLesson.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Lesson not found.' });
      return res.status(200).json({ success: true, message: 'Lesson deleted successfully.' });
    } else {
      const index = memoryStore.lessons.findIndex((l) => l._id.toString() === id.toString());
      if (index === -1) return res.status(404).json({ success: false, message: 'Lesson not found.' });
      memoryStore.lessons.splice(index, 1);
      return res.status(200).json({ success: true, message: 'Lesson deleted successfully.' });
    }
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete lesson.' });
  }
}

module.exports = {
  getAdminStudents,
  getAdminStudentById,
  createAdminStudent,
  updateAdminStudent,
  enrollInquiryStudent,
  getAdminCourseContent,
  createAdminModule,
  updateAdminModule,
  createAdminLesson,
  updateAdminLesson,
  deleteAdminLesson,
};
