require('../config/env')
const mongoose = require('mongoose')
const connectDatabase = require('../config/db')
const Project = require('../models/Project')
const projects = require('../data/projects')

async function seedProjects() {
  const { assertRequiredEnv } = require('../config/env')
  assertRequiredEnv(['MONGO_URI'])

  await connectDatabase()
  const result = await Project.bulkWrite(projects.map((project) => ({
    updateOne: {
      filter: { slug: project.slug },
      update: { $setOnInsert: project },
      upsert: true,
    },
  })), { ordered: false })

  console.log(`Project seed complete: ${result.upsertedCount} created, existing projects left unchanged.`)
}

seedProjects()
  .catch((error) => {
    console.error(`Project seed failed: ${error.message}`)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
