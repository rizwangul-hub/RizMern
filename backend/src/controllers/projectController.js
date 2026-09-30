const { matchedData } = require('express-validator')
const Project = require('../models/Project')
const apiResponse = require('../utils/apiResponse')
const { escapeRegex, getPagination } = require('../utils/pagination')

async function listPublicProjects(req, res) {
  const projects = await Project.find({ published: true })
    .sort({ featured: -1, order: 1, createdAt: -1 })
    .lean()
  return apiResponse(res, 200, {
    success: true,
    message: 'Projects retrieved.',
    data: projects,
  })
}

async function listAdminProjects(req, res) {
  const { page, limit, skip } = getPagination(req.query)
  const filter = {}
  if (req.query.search) {
    const search = new RegExp(escapeRegex(req.query.search.trim()), 'i')
    filter.$or = [{ title: search }, { category: search }, { description: search }, { technologies: search }]
  }
  if (req.query.published === 'true') filter.published = true
  if (req.query.published === 'false') filter.published = false

  const [items, total] = await Promise.all([
    Project.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments(filter),
  ])
  return apiResponse(res, 200, {
    success: true,
    message: 'Projects retrieved.',
    data: { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
  })
}

async function createProject(req, res) {
  const payload = matchedData(req, { locations: ['body'] })
  const project = await Project.create(payload)
  return apiResponse(res, 201, { success: true, message: 'Project created.', data: project })
}

async function updateProject(req, res) {
  const updates = req.validatedUpdates
  if (!updates || Object.keys(updates).length === 0) {
    return apiResponse(res, 422, {
      success: false,
      message: 'Please provide at least one project field to update.',
      data: { errors: [{ field: 'body', message: 'At least one supported field is required.' }] },
    })
  }
  if (typeof updates.title === 'string') {
    updates.slug = updates.title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
  const project = await Project.findByIdAndUpdate(req.params.id, { $set: updates }, {
    new: true,
    runValidators: true,
  })
  if (!project) return apiResponse(res, 404, { success: false, message: 'Project not found.', data: null })
  return apiResponse(res, 200, { success: true, message: 'Project updated.', data: project })
}

async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) return apiResponse(res, 404, { success: false, message: 'Project not found.', data: null })
  return apiResponse(res, 200, { success: true, message: 'Project deleted.', data: { id: project.id } })
}

module.exports = { createProject, deleteProject, listAdminProjects, listPublicProjects, updateProject }
