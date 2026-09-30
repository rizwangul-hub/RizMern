import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../../context/useStudentAuth';
import { fetchStudentProgress } from '../../services/studentService';
import StudentLayout from '../../components/student/StudentLayout';
import Button from '../../components/common/Button';
import './StudentProgressPage.css';

export function StudentProgressPage() {
  const { authFetch } = useStudentAuth();
  const [progressData, setProgressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
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
    loadData();
    return () => {
      isMounted = false;
    };
  }, [authFetch]);

  const percentage = progressData?.progressPercentage || 0;
  const monthStats = progressData?.monthStats || [];
  const modules = progressData?.modules || [];

  return (
    <StudentLayout pageTitle="Learning Progress Analytics">
      <div className="student-progress-page">
        {/* Header */}
        <div className="progress-page-header">
          <div>
            <span className="progress-tag">Learning Analytics</span>
            <h1 className="progress-page-title">Curriculum Progress &amp; Milestones</h1>
            <p className="progress-page-desc">
              Track completed modules, lessons marked complete, and your graduation trajectory.
            </p>
          </div>

          <div className="header-action">
            <Link to="/student/course">
              <Button variant="primary" size="md">
                Resume Lessons →
              </Button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="progress-loading-card">
            <div className="loading-spinner" />
            <p>Calculating curriculum analytics...</p>
          </div>
        ) : error ? (
          <div className="progress-error-card">
            <p>⚠️ {error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Top Metric Cards */}
            <div className="metrics-grid">
              <div className="metric-card metric-primary">
                <span className="metric-label">Course Completion</span>
                <span className="metric-val">{percentage}%</span>
                <span className="metric-sub">
                  {percentage === 100 ? 'Course Complete! 🎓' : 'Actively Progressing'}
                </span>
              </div>

              <div className="metric-card">
                <span className="metric-label">Completed Lessons</span>
                <span className="metric-val count-green">
                  {progressData?.completedLessonsCount || 0}
                </span>
                <span className="metric-sub">Verified exercises</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">Remaining Lessons</span>
                <span className="metric-val count-yellow">
                  {progressData?.remainingLessonsCount || 0}
                </span>
                <span className="metric-sub">Pending completion</span>
              </div>

              <div className="metric-card">
                <span className="metric-label">Total Published</span>
                <span className="metric-val">{progressData?.totalLessons || 0}</span>
                <span className="metric-sub">Across 3 full months</span>
              </div>
            </div>

            {/* Monthly Progress Breakdown */}
            <section className="progress-section-card">
              <h2 className="section-card-title">Three-Month Milestones</h2>
              <div className="months-bars-list">
                {monthStats.map((m) => {
                  const mPercent = m.totalLessons > 0
                    ? Math.round((m.completedLessons / m.totalLessons) * 100)
                    : 0;

                  return (
                    <div key={m.month} className="month-row-bar">
                      <div className="month-row-info">
                        <div className="month-title-group">
                          <span className="month-tag">Month {m.month}</span>
                          <span className="month-name">{m.monthTitle}</span>
                        </div>
                        <div className="month-count-group">
                          <span className="month-count">
                            {m.completedLessons} / {m.totalLessons} lessons
                          </span>
                          <span className="month-percent-badge">{mPercent}%</span>
                        </div>
                      </div>

                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${mPercent}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Detailed Module Breakdown */}
            <section className="progress-section-card">
              <h2 className="section-card-title">Module by Module Breakdown</h2>
              <div className="modules-table-wrap">
                <table className="modules-table">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th>Month</th>
                      <th>Lessons</th>
                      <th>Completed</th>
                      <th>Progress</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((mod) => {
                      const modPercent = mod.totalLessons > 0
                        ? Math.round((mod.completedLessons / mod.totalLessons) * 100)
                        : 0;
                      const isComplete = mod.totalLessons > 0 && mod.completedLessons === mod.totalLessons;

                      return (
                        <tr key={mod.moduleId}>
                          <td className="mod-title-cell">
                            <strong>{mod.title}</strong>
                          </td>
                          <td>Month {mod.month}</td>
                          <td>{mod.totalLessons}</td>
                          <td>{mod.completedLessons}</td>
                          <td>
                            <div className="mini-progress-bar">
                              <div
                                className="mini-progress-fill"
                                style={{ width: `${modPercent}%` }}
                              />
                            </div>
                            <span className="mini-percent">{modPercent}%</span>
                          </td>
                          <td>
                            <span
                              className={`mod-status-tag ${
                                isComplete ? 'tag-done' : modPercent > 0 ? 'tag-started' : 'tag-pending'
                              }`}
                            >
                              {isComplete ? 'Complete' : modPercent > 0 ? 'In Progress' : 'Not Started'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </StudentLayout>
  );
}

export default StudentProgressPage;
