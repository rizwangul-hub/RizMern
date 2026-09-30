import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../context/useAdminAuth';
import Button from '../common/Button';
import './StudentsManagement.css';

export function StudentsManagement() {
  const { authFetch } = useAdminAuth();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // New Student Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('RizMern2026!');
  const [isCreating, setIsCreating] = useState(false);
  const [modalFeedback, setModalFeedback] = useState(null);

  // Status update loading state
  const [updatingId, setUpdatingId] = useState(null);

  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authFetch('/admin/students');
      const data = await res.json();
      if (res.ok && data.success) {
        setStudents(data.students || []);
      } else {
        setError(data.message || 'Failed to load students.');
      }
    } catch {
      setError('Network error while loading students.');
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const handleToggleStatus = async (student) => {
    const nextStatus = student.status === 'suspended' ? 'active' : 'suspended';
    setUpdatingId(student._id);

    try {
      const res = await authFetch(`/admin/students/${student._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStudents((prev) =>
          prev.map((s) => (s._id === student._id ? { ...s, status: nextStatus } : s))
        );
      } else {
        alert(data.message || 'Failed to update student status.');
      }
    } catch {
      alert('Network error while updating status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setModalFeedback(null);
    setIsCreating(true);

    try {
      const res = await authFetch('/admin/students', {
        method: 'POST',
        body: JSON.stringify({
          fullName: newFullName,
          email: newEmail,
          phone: newPhone,
          initialPassword: newPassword,
          enrolledCourses: ['rizmern-3month'],
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setModalFeedback({
          type: 'success',
          message: `Student enrolled successfully! Temporary Password: ${newPassword}`,
        });
        setNewFullName('');
        setNewEmail('');
        setNewPhone('');
        loadStudents();
      } else {
        setModalFeedback({
          type: 'error',
          message: data.message || 'Failed to create student account.',
        });
      }
    } catch {
      setModalFeedback({
        type: 'error',
        message: 'Network error while creating student.',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="students-management">
      <div className="management-action-header">
        <div>
          <h2 className="management-heading">Enrolled Students Roster</h2>
          <p className="management-sub">
            Track student accounts, individual progress %, and control active/suspended access.
          </p>
        </div>

        <div className="header-btn-row">
          <Button variant="outline" size="sm" onClick={loadStudents}>
            ↻ Refresh Roster
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
            + Enroll New Student
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="management-loading">
          <div className="loading-spinner" />
          <p>Loading student records...</p>
        </div>
      ) : error ? (
        <div className="management-error">
          <p>⚠️ {error}</p>
          <Button variant="outline" size="sm" onClick={loadStudents}>
            Retry
          </Button>
        </div>
      ) : students.length === 0 ? (
        <div className="management-empty">
          <p>No enrolled students yet.</p>
          <p className="empty-sub">
            You can convert an inquiry into an enrolled student or enroll them manually using the button above.
          </p>
        </div>
      ) : (
        <div className="students-table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Contact</th>
                <th>Enrolled Track</th>
                <th>Progress %</th>
                <th>Account Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const isSuspended = student.status === 'suspended';
                const progress = student.progressPercentage || 0;

                return (
                  <tr key={student._id}>
                    <td>
                      <div className="student-cell-name">
                        <strong>{student.fullName}</strong>
                        <span className="student-id-tag">ID: {student._id}</span>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <span className="email-txt">{student.email}</span>
                        {student.phone && <span className="phone-txt">{student.phone}</span>}
                      </div>
                    </td>
                    <td>
                      <span className="course-chip">
                        {student.enrolledCourses?.[0] || 'rizmern-3month'}
                      </span>
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="table-progress-bar">
                          <div
                            className="table-progress-fill"
                            style={{ width: `${Math.min(100, progress)}%` }}
                          />
                        </div>
                        <span className="table-progress-text">{progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge-chip status-${student.status || 'active'}`}>
                        {student.status || 'active'}
                      </span>
                    </td>
                    <td>
                      <div className="table-action-btns">
                        <Button
                          variant={isSuspended ? 'primary' : 'outline'}
                          size="sm"
                          disabled={updatingId === student._id}
                          onClick={() => handleToggleStatus(student)}
                          style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                        >
                          {updatingId === student._id
                            ? '...'
                            : isSuspended
                            ? 'Activate'
                            : 'Suspend'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Manual Enroll Modal */}
      {isAddModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog-box">
            <div className="modal-dialog-header">
              <h3 className="modal-dialog-title">Enroll New Student</h3>
              <button
                type="button"
                className="modal-dialog-close"
                onClick={() => setIsAddModalOpen(false)}
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

            <form onSubmit={handleCreateStudent} className="enroll-modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="new-name">
                  Full Name
                </label>
                <input
                  id="new-name"
                  type="text"
                  required
                  placeholder="e.g. Usman Tariq"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-email">
                  Student Email Address
                </label>
                <input
                  id="new-email"
                  type="email"
                  required
                  placeholder="e.g. usman@gmail.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-phone">
                  Phone / WhatsApp Number
                </label>
                <input
                  id="new-phone"
                  type="tel"
                  placeholder="e.g. +92 300 1234567"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-pass">
                  Initial Temporary Password
                </label>
                <input
                  id="new-pass"
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                />
                <span className="field-note">
                  Student will use this password to sign in at /student/login.
                </span>
              </div>

              <div className="modal-dialog-actions">
                <Button type="submit" variant="primary" size="md" disabled={isCreating}>
                  {isCreating ? 'Creating Account...' : 'Confirm Enrollment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddModalOpen(false)}
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

export default StudentsManagement;
