require('../config/env')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const connectDatabase = require('../config/db')
const { CourseModule, CourseLesson, getDefaultModulesAndLessons } = require('../models/CourseContent')
const { Student } = require('../models/Student')
const { CourseProgress } = require('../models/CourseProgress')
const { CourseConfig, getDefaultConfig } = require('../models/CourseConfig')

async function seedLms() {
  await connectDatabase()
  console.log('Seeding LMS curriculum and initial configuration...')

  // 1. Seed Course Config if not existing
  const existingConfig = await CourseConfig.findOne()
  if (!existingConfig) {
    await CourseConfig.create(getDefaultConfig())
    console.log('✔ CourseConfig created.')
  } else {
    console.log('✔ CourseConfig already exists.')
  }

  // 2. Seed Modules and Lessons
  const modulesCount = await CourseModule.countDocuments()
  if (modulesCount === 0) {
    const defaultData = getDefaultModulesAndLessons()
    for (const m of defaultData) {
      const createdModule = await CourseModule.create({
        courseId: 'rizmern-3month',
        month: m.month,
        title: m.title,
        description: m.description,
        order: m.order,
      })

      for (const l of m.lessons) {
        await CourseLesson.create({
          moduleId: createdModule._id,
          courseId: 'rizmern-3month',
          title: l.title,
          slug: l.slug,
          description: l.description,
          order: l.order,
          content: l.content,
          videoUrl: l.videoUrl || null,
          resources: l.resources || [],
          published: true,
        })
      }
    }
    console.log('✔ Default course modules and lessons seeded.')
  } else {
    console.log('✔ Course modules already exist in database.')
  }

  // 3. Seed Demo Student if not existing
  const demoStudentEmail = 'student@rizmern.com'
  const existingStudent = await Student.findOne({ email: demoStudentEmail })
  if (!existingStudent) {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync('StudentPass123!', salt)
    const newStudent = await Student.create({
      fullName: 'Ahmad Khan',
      email: demoStudentEmail,
      phone: '+923001112233',
      passwordHash,
      status: 'active',
      enrolledCourses: ['rizmern-3month'],
    })

    await CourseProgress.create({
      studentId: newStudent._id,
      courseId: 'rizmern-3month',
      completedLessons: [],
      progressPercentage: 0,
    })
    console.log('✔ Demo student account created: student@rizmern.com / StudentPass123!')
  } else {
    console.log('✔ Demo student account already exists.')
  }
}

seedLms()
  .catch((err) => {
    console.error('LMS seed error:', err.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
    console.log('Database disconnected. LMS seeding finished.')
  })
