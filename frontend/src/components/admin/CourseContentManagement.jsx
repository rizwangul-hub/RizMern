import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../context/useAdminAuth';
import Button from '../common/Button';
import './CourseContentManagement.css';

export function CourseContentManagement() {
  const { authFetch } = useAdminAuth();
  const [modules, setModules] = useState([]);
  const [totalModules, setTotalModules] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [publishedLessons, setPublishedLessons] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lesson Modal State (Create / Edit)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonModuleId, setLessonModuleId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonSlug, setLessonSlug] = useState('');
  const [lessonOrder, setLessonOrder] = useState(1);
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonPublished, setLessonPublished] = useState(true);
  const [isSavingLesson, setIsSavingLesson] = useState(false);
  const [modalFeedback, setModalFeedback] = useState(null);

  // Module Modal State
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [moduleMonth, setModuleMonth] = useState(1);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [moduleOrder, setModuleOrder] = useState(1);
  const [isSavingModule, setIsSavingModule] = useState(false);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authFetch('/admin/course-content');
      const data = await res.json();
      if (res.ok && data.success) {
        setModules(data.modules || []);
        setTotalModules(data.totalModules || 0);
        setTotalLessons(data.totalLessons || 0);
        setPublishedLessons(data.publishedLessons || 0);
      } else {
        setError(data.message || 'Failed to load course content.');
      }
    } catch {
      setError('Network error loading course content.');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const openAddLessonModal = (moduleId = '') => {
    setEditingLesson(null);
    setLessonModuleId(moduleId || (modules[0]?._id || ''));
    setLessonTitle('');
    setLessonSlug('');
    setLessonOrder(1);
    setLessonDescription('');
    setLessonContent('## Overview\n\nExplain lesson concept here.\n\n```javascript\nconsole.log("Hello RizMern");\n```');
    setLessonVideoUrl('');
    setLessonPublished(true);
    setModalFeedback(null);
    setIsLessonModalOpen(true);
  };

  const openEditLessonModal = (lesson, moduleId) => {
    setEditingLesson(lesson);
    setLessonModuleId(moduleId);
    setLessonTitle(lesson.title);
    setLessonSlug(lesson.slug);
    setLessonOrder(lesson.order || 1);
    setLessonDescription(lesson.description || '');
    setLessonContent(lesson.content || 'Content not loaded in summary');
    setLessonVideoUrl(lesson.videoUrl || '');
    setLessonPublished(lesson.published ?? true);
    setModalFeedback(null);
    setIsLessonModalOpen(true);
  };

  const handleTogglePublish = async (lesson, moduleId) => {
    try {
      const res = await authFetch(`/admin/lessons/${lesson._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ published: !lesson.published, moduleId }),
      });
      if (res.ok) {
        loadContent();
      }
    } catch {
      alert('Network error while toggling publish status.');
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to permanently delete this lesson?')) {
      return;
    }
    try {
      const res = await authFetch(`/admin/lessons/${lessonId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        loadContent();
      } else {
        alert('Failed to delete lesson.');
      }
    } catch {
      alert('Network error while deleting lesson.');
    }
  };

  const handleSaveLesson = async (e) => {
    e.preventDefault();
    setModalFeedback(null);
    setIsSavingLesson(true);

    const payload = {
      moduleId: lessonModuleId,
      title: lessonTitle,
      slug: lessonSlug,
      order: Number(lessonOrder),
      description: lessonDescription,
      content: lessonContent,
      videoUrl: lessonVideoUrl,
      published: lessonPublished,
    };

    try {
      let res;
      if (editingLesson) {
        res = await authFetch(`/admin/lessons/${editingLesson._id}`, {
          method: 'PATCH',
          body: JSON.stringify(payload),
        });
      } else {
        res = await authFetch('/admin/lessons', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setIsLessonModalOpen(false);
        loadContent();
      } else {
        setModalFeedback({ type: 'error', message: data.message || 'Failed to save lesson.' });
      }
    } catch {
      setModalFeedback({ type: 'error', message: 'Network error saving lesson.' });
    } finally {
      setIsSavingLesson(false);
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    setIsSavingModule(true);

    try {
      const res = await authFetch('/admin/modules', {
        method: 'POST',
        body: JSON.stringify({
          month: Number(moduleMonth),
          title: moduleTitle,
          description: moduleDescription,
          order: Number(moduleOrder),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModuleModalOpen(false);
        setModuleTitle('');
        setModuleDescription('');
        loadContent();
      } else {
        alert(data.message || 'Failed to create module.');
      }
    } catch {
      alert('Network error creating module.');
    } finally {
      setIsSavingModule(false);
    }
  };

  return (
    <div className="course-content-management">
      {/* Top Bar */}
      <div className="content-management-header">
        <div>
          <h2 className="content-heading">LMS Curriculum Management</h2>
          <p className="content-sub">
            Organize modules, create interactive lessons, embed videos, and manage draft/published visibility.
          </p>
        </div>

        <div className="content-metrics-pill">
          <span className="metric-tag">{totalModules} Modules</span>
          <span className="metric-tag">{totalLessons} Total Lessons</span>
          <span className="metric-tag published-tag">{publishedLessons} Published</span>
        </div>

        <div className="content-actions-row">
          <Button variant="outline" size="sm" onClick={() => setIsModuleModalOpen(true)}>
            + Add Module
          </Button>
          <Button variant="primary" size="sm" onClick={() => openAddLessonModal()}>
            + Add Lesson
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="management-loading">
          <div className="loading-spinner" />
          <p>Loading course structure...</p>
        </div>
      ) : error ? (
        <div className="management-error">
          <p>⚠️ {error}</p>
          <Button variant="outline" size="sm" onClick={loadContent}>
            Retry
          </Button>
        </div>
      ) : (
        <div className="modules-management-tree">
          {modules.map((mod) => (
            <div key={mod._id} className="admin-module-card">
              <div className="admin-module-head">
                <div className="module-title-zone">
                  <span className="month-badge">Month {mod.month}</span>
                  <h3 className="mod-title">
                    Order {mod.order}: {mod.title}
                  </h3>
                  <span className="mod-lessons-count">({mod.lessons?.length || 0} lessons)</span>
                </div>

                <div className="mod-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddLessonModal(mod._id)}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                  >
                    + Add Lesson
                  </Button>
                </div>
              </div>

              {mod.description && <p className="admin-mod-desc">{mod.description}</p>}

              {/* Lessons Table in this module */}
              <div className="admin-lessons-wrap">
                {mod.lessons?.length === 0 ? (
                  <p className="empty-lessons-notice">No lessons created under this module yet.</p>
                ) : (
                  <table className="admin-lessons-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Slug</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mod.lessons?.map((l) => (
                        <tr key={l._id}>
                          <td style={{ width: '60px' }}>#{l.order}</td>
                          <td>
                            <strong>{l.title}</strong>
                            {l.videoUrl && <span className="video-badge" title={l.videoUrl}>📹 Video</span>}
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`publish-toggle-btn ${l.published ? 'published' : 'draft'}`}
                              onClick={() => handleTogglePublish(l, mod._id)}
                              title="Click to toggle publish status"
                            >
                              {l.published ? '✓ Published' : 'Draft (Hidden)'}
                            </button>
                          </td>
                          <td>
                            <code className="slug-txt">/{l.slug}</code>
                          </td>
                          <td>
                            <div className="lesson-action-cell">
                              <button
                                type="button"
                                className="action-txt-btn"
                                onClick={() => openEditLessonModal(l, mod._id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="action-txt-btn delete-btn"
                                onClick={() => handleDeleteLesson(l._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Lesson Modal */}
      {isLessonModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLessonModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog-box large-dialog">
            <div className="modal-dialog-header">
              <h3 className="modal-dialog-title">
                {editingLesson ? `Edit Lesson: ${editingLesson.title}` : 'Create New Course Lesson'}
              </h3>
              <button
                type="button"
                className="modal-dialog-close"
                onClick={() => setIsLessonModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {modalFeedback && (
              <div className={`modal-alert alert-${modalFeedback.type}`}>
                {modalFeedback.type === 'success' ? '✓ ' : '⚠️ '}
                {modalFeedback.message}
              </div>
            )}

            <form onSubmit={handleSaveLesson} className="lesson-modal-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="lesson-module">
                    Assign to Module
                  </label>
                  <select
                    id="lesson-module"
                    value={lessonModuleId}
                    onChange={(e) => setLessonModuleId(e.target.value)}
                    required
                    className="form-select"
                  >
                    {modules.map((m) => (
                      <option key={m._id} value={m._id}>
                        Month {m.month}: {m.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="lesson-order">
                    Lesson Order Number
                  </label>
                  <input
                    id="lesson-order"
                    type="number"
                    min={1}
                    value={lessonOrder}
                    onChange={(e) => setLessonOrder(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="lesson-title">
                    Lesson Title
                  </label>
                  <input
                    id="lesson-title"
                    type="text"
                    required
                    placeholder="e.g. Master React useState & useEffect Hooks"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="lesson-slug">
                    URL Slug (Optional)
                  </label>
                  <input
                    id="lesson-slug"
                    type="text"
                    placeholder="e.g. react-hooks-deepdive"
                    value={lessonSlug}
                    onChange={(e) => setLessonSlug(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lesson-desc">
                  Summary / Objective
                </label>
                <input
                  id="lesson-desc"
                  type="text"
                  placeholder="One sentence summary of learning outcomes"
                  value={lessonDescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="lesson-video">
                  Video Embed URL (Optional YouTube / Vimeo / MP4 link)
                </label>
                <input
                  id="lesson-video"
                  type="url"
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  value={lessonVideoUrl}
                  onChange={(e) => setLessonVideoUrl(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <div className="label-with-action">
                  <label className="form-label" htmlFor="lesson-content">
                    Lesson Content (Markdown with ```code``` blocks supported)
                  </label>
                  <span className="field-note">Code blocks will format with copy buttons</span>
                </div>
                <textarea
                  id="lesson-content"
                  rows={8}
                  required
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  className="form-textarea code-font"
                />
              </div>

              <div className="checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={lessonPublished}
                    onChange={(e) => setLessonPublished(e.target.checked)}
                  />
                  <span>Published (Visible to enrolled students)</span>
                </label>
              </div>

              <div className="modal-dialog-actions">
                <Button type="submit" variant="primary" size="md" disabled={isSavingLesson}>
                  {isSavingLesson ? 'Saving Lesson...' : editingLesson ? 'Update Lesson' : 'Create Lesson'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsLessonModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Module Modal */}
      {isModuleModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModuleModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog-box">
            <div className="modal-dialog-header">
              <h3 className="modal-dialog-title">Create New Curriculum Module</h3>
              <button
                type="button"
                className="modal-dialog-close"
                onClick={() => setIsModuleModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateModule} className="enroll-modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="module-month">
                  Month
                </label>
                <select
                  id="module-month"
                  value={moduleMonth}
                  onChange={(e) => setModuleMonth(Number(e.target.value))}
                  className="form-select"
                >
                  <option value={1}>Month 1: Frontend &amp; React</option>
                  <option value={2}>Month 2: Backend &amp; APIs</option>
                  <option value={3}>Month 3: Mobile Apps &amp; Deployment</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="module-title">
                  Module Title
                </label>
                <input
                  id="module-title"
                  type="text"
                  required
                  placeholder="e.g. Advanced State Management with Redux & Zustand"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="module-order">
                  Order Index in Month
                </label>
                <input
                  id="module-order"
                  type="number"
                  min={1}
                  value={moduleOrder}
                  onChange={(e) => setModuleOrder(Number(e.target.value))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="module-desc">
                  Module Description (Optional)
                </label>
                <input
                  id="module-desc"
                  type="text"
                  placeholder="Summary of modules covered"
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="modal-dialog-actions">
                <Button type="submit" variant="primary" size="md" disabled={isSavingModule}>
                  {isSavingModule ? 'Creating...' : 'Create Module'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsModuleModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseContentManagement;
