import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../../context/useStudentAuth';
import { fetchStudentProgress } from '../../services/studentService';
import StudentLayout from '../../components/student/StudentLayout';
import Button from '../../components/common/Button';
import './StudentDashboardPage.css';

export function StudentDashboardPage() {
  const { student, authFetch } = useStudentAuth();
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadProgress() {
      try {
        const data = await fetchStudentProgress(authFetch);
        if (isMounted && data.success) {
          setProgressData(data.progress);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadProgress();
    return () => {
      isMounted = false;
    };
  }, [authFetch]);

  const percentage = progressData?.progressPercentage || 0;
  const nextLesson = progressData?.nextLesson;
  const monthStats = progressData?.monthStats || [];

  return (
    <StudentLayout pageTitle="Student Dashboard">
      <div className="student-dashboard">
        {/* Top Welcome Banner */}
        <section className="welcome-banner">
          <div className="welcome-info">
            <span className="welcome-pill">Active Student Portal</span>
            <h1 className="welcome-title">
              Welcome back, <span className="highlight-name">{student?.fullName || 'Student'}</span>! 👋
            </h1>
            <p className="welcome-desc">
              Three-Month MERN Stack Web &amp; React Native App Development with AI. Track your daily
              curriculum, read lessons, and build full-stack portfolio projects.
            </p>
          </div>

          <div className="welcome-meta-badges">
            <div className="meta-badge">
              <span className="badge-label">Enrollment Status</span>
              <span className="badge-value status-active">Active • Enrolled</span>
            </div>
            <div className="meta-badge">
              <span className="badge-label">Curriculum Track</span>
              <span className="badge-value">Cohort 2026</span>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="dashboard-loading-card">
            <div className="loading-spinner" />
            <p>Loading your learning progress and lessons...</p>
          </div>
        ) : error ? (
          <div className="dashboard-error-card">
            <p>⚠️ {error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Action Grid: Continue Learning + Overall Progress */}
            <div className="dashboard-action-grid">
              {/* Continue Learning Card */}
              <div className="action-card continue-card">
                <div className="card-top-tag">⚡ Current Objective</div>
                <h2 className="card-title">
                  {nextLesson ? 'Continue Learning' : 'Course Completed! 🎉'}
                </h2>
                {nextLesson ? (
                  <>
                    <p className="continue-lesson-title">{nextLesson.title}</p>
                    <p className="continue-lesson-desc">
                      {nextLesson.description || 'Dive into this lesson and code along with the practical exercises.'}
                    </p>
                    <div className="card-action-btn">
                      <Link to={`/student/course/lesson/${nextLesson._id}`}>
                        <Button variant="primary" size="md">
                          Jump to Lesson →
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="continue-lesson-desc">
                      Congratulations! You have marked all current lessons complete. Review your code
                      and build your capstone portfolio projects.
                    </p>
                    <div className="card-action-btn">
                      <Link to="/student/course">
                        <Button variant="outline" size="md">
                          Browse All Lessons
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>

              {/* Progress Summary Card */}
              <div className="action-card progress-card">
                <div className="card-top-tag">📊 Overall Completion</div>
                <div className="progress-stat-header">
                  <div className="progress-big-number">{percentage}%</div>
                  <div className="progress-counts">
                    <span className="count-highlight">{progressData?.completedLessonsCount || 0}</span> of{' '}
                    <span>{progressData?.totalLessons || 0}</span> lessons complete
                  </div>
                </div>

                <div className="progress-track-bar">
                  <div
                    className="progress-fill-bar"
                    style={{ width: `${Math.min(100, percentage)}%` }}
                  />
                </div>

                <div className="progress-card-footer">
                  <span>{progressData?.remainingLessonsCount || 0} lessons remaining</span>
                  <Link to="/student/progress" className="view-detailed-link">
                    Detailed Analytics →
                  </Link>
                </div>
              </div>
            </div>

            {/* 3-Month Learning Roadmap Status */}
            <section className="month-overview-section">
              <div className="section-head">
                <h2 className="section-title">Your 3-Month Learning Roadmap</h2>
                <Link to="/student/course" className="section-link">
                  View Full Curriculum →
                </Link>
              </div>

              <div className="month-cards-grid">
                {monthStats.map((m) => {
                  const mPercentage = m.totalLessons > 0
                    ? Math.round((m.completedLessons / m.totalLessons) * 100)
                    : 0;

                  return (
                    <div key={m.month} className="month-stat-card">
                      <div className="month-card-header">
                        <span className="month-number">Month {m.month}</span>
                        <span className="month-percent">{mPercentage}%</span>
                      </div>
                      <h3 className="month-title">{m.monthTitle}</h3>
                      <div className="month-progress-bar">
                        <div
                          className="month-progress-fill"
                          style={{ width: `${mPercentage}%` }}
                        />
                      </div>
                      <div className="month-card-footer">
                        <span>
                          {m.completedLessons} / {m.totalLessons} lessons completed
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Resources & Support Section */}
            <section className="dashboard-resources-section">
              <h2 className="section-title">Student Resources &amp; Mentorship</h2>
              <div className="resources-grid">
                <div className="resource-card">
                  <div className="resource-icon">💻</div>
                  <h3 className="resource-title">Practical Code Repositories</h3>
                  <p className="resource-desc">
                    Access production starter templates, schema diagrams, and project solution repos.
                  </p>
                  <Link to="/student/course" className="resource-action">
                    Explore Code in Lessons →
                  </Link>
                </div>

                <div className="resource-card">
                  <div className="resource-icon">💬</div>
                  <h3 className="resource-title">Direct WhatsApp Mentorship</h3>
                  <p className="resource-desc">
                    Need instant code review or stuck on an error? Chat directly with Rizwan Ullah.
                  </p>
                  <a
                    href="https://wa.me/923000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-action"
                  >
                    Open WhatsApp Chat ↗
                  </a>
                </div>

                <div className="resource-card">
                  <div className="resource-icon">⚙️</div>
                  <h3 className="resource-title">Student Account &amp; Security</h3>
                  <p className="resource-desc">
                    Update your contact number or change your password to keep your portal secure.
                  </p>
                  <Link to="/student/profile" className="resource-action">
                    Manage Account Settings →
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </StudentLayout>
  );
}

export default StudentDashboardPage;
