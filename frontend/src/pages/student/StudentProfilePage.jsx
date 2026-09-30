import React, { useState } from 'react';
import { useStudentAuth } from '../../context/useStudentAuth';
import { updateStudentProfile, changeStudentPassword } from '../../services/studentService';
import StudentLayout from '../../components/student/StudentLayout';
import Button from '../../components/common/Button';
import './StudentProfilePage.css';

export function StudentProfilePage() {
  const { student, authFetch, updateStudentData } = useStudentAuth();

  // Profile Edit State
  const [fullName, setFullName] = useState(student?.fullName || '');
  const [phone, setPhone] = useState(student?.phone || '');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileFeedback(null);
    setIsUpdatingProfile(true);

    try {
      const data = await updateStudentProfile(authFetch, { fullName, phone });
      if (data.success && data.student) {
        updateStudentData(data.student);
        setProfileFeedback({ type: 'success', message: 'Profile details updated successfully.' });
      }
    } catch (err) {
      setProfileFeedback({ type: 'error', message: err.message || 'Failed to update profile.' });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordFeedback(null);

    if (newPassword.length < 8) {
      setPasswordFeedback({
        type: 'error',
        message: 'New password must be at least 8 characters long.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        type: 'error',
        message: 'New password and confirmation do not match.',
      });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const data = await changeStudentPassword(authFetch, { currentPassword, newPassword });
      if (data.success) {
        setPasswordFeedback({ type: 'success', message: 'Password changed successfully.' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPasswordFeedback({
        type: 'error',
        message: err.message || 'Failed to change password.',
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <StudentLayout pageTitle="Student Account Settings">
      <div className="student-profile-page">
        {/* Page Heading */}
        <div className="profile-heading-card">
          <div className="profile-avatar-large" aria-hidden="true">
            {(student?.fullName || 'S').charAt(0).toUpperCase()}
          </div>
          <div className="profile-heading-info">
            <h1 className="profile-name">{student?.fullName || 'Student'}</h1>
            <p className="profile-email">{student?.email}</p>
            <div className="profile-badges-row">
              <span className="profile-badge badge-active">Status: {student?.status || 'Active'}</span>
              <span className="profile-badge badge-cohort">MERN &amp; React Native Track</span>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          {/* Card 1: Personal Details */}
          <section className="profile-card">
            <h2 className="card-section-title">Personal Information</h2>
            <p className="card-section-desc">
              Update your contact details so the instructor can reach you on WhatsApp for 1-on-1 mentorship.
            </p>

            {profileFeedback && (
              <div className={`profile-alert ${profileFeedback.type}`} role="alert">
                {profileFeedback.type === 'success' ? '✓ ' : '⚠️ '}
                {profileFeedback.message}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
                <label htmlFor="student-full-name" className="form-label">
                  Full Name
                </label>
                <input
                  id="student-full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="student-email-readonly" className="form-label">
                  Email Address <span className="label-note">(Fixed account identifier)</span>
                </label>
                <input
                  id="student-email-readonly"
                  type="email"
                  value={student?.email || ''}
                  disabled
                  className="form-input input-disabled"
                />
              </div>

              <div className="form-group">
                <label htmlFor="student-phone" className="form-label">
                  Phone / WhatsApp Number
                </label>
                <input
                  id="student-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className="form-input"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isUpdatingProfile}
                style={{ alignSelf: 'flex-start' }}
              >
                {isUpdatingProfile ? 'Saving...' : 'Save Profile Changes'}
              </Button>
            </form>
          </section>

          {/* Card 2: Change Password */}
          <section className="profile-card">
            <h2 className="card-section-title">Security &amp; Password</h2>
            <p className="card-section-desc">
              Change your password regularly. Must be at least 8 characters long.
            </p>

            {passwordFeedback && (
              <div className={`profile-alert ${passwordFeedback.type}`} role="alert">
                {passwordFeedback.type === 'success' ? '✓ ' : '⚠️ '}
                {passwordFeedback.message}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="profile-form">
              <div className="form-group">
                <label htmlFor="current-password" className="form-label">
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="new-password" className="form-label">
                  New Password <span className="label-note">(Min 8 characters)</span>
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="form-input"
                />
              </div>

              <Button
                type="submit"
                variant="outline"
                size="md"
                disabled={isUpdatingPassword}
                style={{ alignSelf: 'flex-start' }}
              >
                {isUpdatingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </section>
        </div>
      </div>
    </StudentLayout>
  );
}

export default StudentProfilePage;
