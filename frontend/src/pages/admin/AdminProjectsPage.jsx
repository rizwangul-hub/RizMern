import { useCallback, useEffect, useState } from 'react'
import { BriefcaseBusiness, ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import SEO from '../../components/SEO'
import { ConfirmModal, EmptyState, Pagination } from '../../components/admin/AdminComponents'
import {
  createAdminProject,
  deleteAdminProject,
  getAdminProjects,
  updateAdminProject,
} from '../../services/adminService'
import { externalLinkProps } from '../../utils/externalLinkProps'

const emptyProject = {
  title: '',
  category: '',
  imageUrl: '',
  liveUrl: '',
  technologies: '',
  description: '',
  order: 0,
  featured: false,
  published: true,
}

function ProjectForm({ project, busy, onCancel, onSubmit }) {
  const [values, setValues] = useState(project || emptyProject)
  const editValue = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  function submit(event) {
    event.preventDefault()
    onSubmit({
      ...values,
      technologies: values.technologies.split(',').map((technology) => technology.trim()).filter(Boolean),
      order: Number(values.order),
    })
  }

  return (
    <form className="admin-panel admin-project-form" onSubmit={submit}>
      <div className="admin-panel-heading">
        <div><h2>{project ? 'Edit project' : 'Add a project'}</h2><p>Project details appear in your public work gallery when published.</p></div>
      </div>
      <div className="admin-project-fields">
        <label>Project name<input name="title" value={values.title} onChange={editValue} maxLength="120" required /></label>
        <label>Category<input name="category" value={values.category} onChange={editValue} maxLength="80" placeholder="Full Stack, Mobile App…" required /></label>
        <label className="admin-project-field-wide">Screenshot image URL<input name="imageUrl" type="url" value={values.imageUrl} onChange={editValue} maxLength="2048" placeholder="https://…" required /></label>
        <label className="admin-project-field-wide">Live project URL <span>(optional)</span><input name="liveUrl" type="url" value={values.liveUrl} onChange={editValue} maxLength="2048" placeholder="https://…" /></label>
        <label className="admin-project-field-wide">Technologies <span>(comma separated)</span><input name="technologies" value={values.technologies} onChange={editValue} placeholder="React, Node.js, MongoDB" required /></label>
        <label className="admin-project-field-wide">Description<textarea name="description" value={values.description} onChange={editValue} maxLength="1000" rows="3" required /></label>
        <label>Display order<input name="order" type="number" min="0" max="10000" value={values.order} onChange={editValue} /></label>
        <div className="admin-project-toggles">
          <label><input name="featured" type="checkbox" checked={Boolean(values.featured)} onChange={editValue} /> Feature on home page</label>
          <label><input name="published" type="checkbox" checked={Boolean(values.published)} onChange={editValue} /> Published</label>
        </div>
      </div>
      <div className="admin-modal-actions">
        <button className="admin-secondary-button" type="button" disabled={busy} onClick={onCancel}>Cancel</button>
        <button className="admin-primary-button" type="submit" disabled={busy}>{busy ? 'Saving…' : project ? 'Save changes' : 'Add project'}</button>
      </div>
    </form>
  )
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [deleteBusy, setDeleteBusy] = useState(false)

  const loadProjects = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await getAdminProjects({ page, limit: 12, search: search.trim() })
      setProjects(result.items)
      setPagination(result.pagination)
    } catch (requestError) {
      setError(requestError.message)
      toast.error(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    const timeout = window.setTimeout(loadProjects, 250)
    return () => window.clearTimeout(timeout)
  }, [loadProjects])

  async function saveProject(project) {
    setSaving(true)
    try {
      if (editing) await updateAdminProject(editing._id, project)
      else await createAdminProject(project)
      toast.success(editing ? 'Project updated.' : 'Project added.')
      setEditing(null)
      setFormOpen(false)
      await loadProjects()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  async function removeProject() {
    if (!deleting) return
    setDeleteBusy(true)
    try {
      await deleteAdminProject(deleting._id)
      toast.success('Project deleted.')
      setDeleting(null)
      if (projects.length === 1 && page > 1) setPage((current) => current - 1)
      else await loadProjects()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setDeleteBusy(false)
    }
  }

  function startEdit(project) {
    setEditing({
      ...project,
      technologies: project.technologies.join(', '),
    })
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
    setEditing(null)
  }

  return (
    <div className="admin-page">
      <SEO title="Projects | RizMern Admin" description="Manage published portfolio projects." path="/admin/projects" noindex />
      <div className="admin-page-heading">
        <div><p className="eyebrow">Portfolio</p><h1>Projects</h1><p>Add, edit, publish, or feature your website and app work.</p></div>
        <button type="button" className="admin-primary-button" onClick={() => { setEditing(null); setFormOpen((open) => !open) }}>
          <Plus size={16} /> {formOpen && !editing ? 'Close form' : 'Add project'}
        </button>
      </div>

      {formOpen && <ProjectForm key={editing?._id || 'new-project'} project={editing} busy={saving} onCancel={closeForm} onSubmit={saveProject} />}

      <section className="admin-panel admin-project-list">
        <div className="admin-project-toolbar">
          <div><h2>Portfolio projects <span>{pagination.total}</span></h2><p>Published projects are visible on your public website.</p></div>
          <label className="admin-project-search"><span className="sr-only">Search projects</span><input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Search projects" /></label>
        </div>
        {error ? (
          <div className="admin-inline-error" role="alert">{error}<button type="button" onClick={loadProjects}>Retry</button></div>
        ) : loading ? (
          <p className="admin-project-feedback" role="status">Loading projects…</p>
        ) : projects.length ? (
          <div className="admin-project-list-grid">
            {projects.map((project) => (
              <article className="admin-project-item" key={project._id}>
                <img src={project.imageUrl} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                <div className="admin-project-item-copy">
                  <div className="admin-project-item-title">
                    <strong>{project.title}</strong>
                    <span className={`admin-project-status${project.published ? ' is-published' : ''}`}>{project.published ? 'Published' : 'Draft'}</span>
                  </div>
                  <small>{project.category} · {project.technologies.join(', ')}</small>
                  {project.featured && <span className="admin-project-featured"><BriefcaseBusiness size={12} /> Featured on home</span>}
                </div>
                <div className="admin-project-actions">
                  {project.liveUrl && <a href={project.liveUrl} aria-label={`Open ${project.title}`} {...externalLinkProps}><ExternalLink size={15} /></a>}
                  <button type="button" aria-label={`Edit ${project.title}`} onClick={() => startEdit(project)}><Pencil size={15} /></button>
                  <button type="button" className="is-danger" aria-label={`Delete ${project.title}`} onClick={() => setDeleting(project)}><Trash2 size={15} /></button>
                  {project.published && project.liveUrl && <span className="sr-only">Live website: {project.liveUrl}</span>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No projects yet" description="Add a project to start building your public portfolio." />
        )}
        {!error && !loading && pagination.total > 0 && (
          <Pagination page={pagination.page} pages={pagination.pages} total={pagination.total} onPageChange={setPage} />
        )}
      </section>

      {deleting && (
        <ConfirmModal
          title={`Delete ${deleting.title}?`}
          message="This permanently removes the project from your portfolio."
          confirmLabel="Delete project"
          danger
          busy={deleteBusy}
          onConfirm={removeProject}
          onClose={() => setDeleting(null)}
        />
      )}
    </div>
  )
}
