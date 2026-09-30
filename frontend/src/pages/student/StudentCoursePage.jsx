import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStudentAuth } from '../../context/useStudentAuth';
import { fetchCourseDetails } from '../../services/studentService';
import StudentLayout from '../../components/student/StudentLayout';
import Button from '../../components/common/Button';
import './StudentCoursePage.css';

export function StudentCoursePage() {
  const { authFetch } = useStudentAuth();
  const [courseData, setCourseData] = useState(null);
  const [activeMonth, setActiveMonth] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchCourseDetails(authFetch, 'rizmern-3month');
        if (isMounted && data.success) {
          setCourseData(data);
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

  const modules = courseData?.modules || [];
  const completedLessonIds = new Set(courseData?.completedLessons || []);
  const filteredModules = modules.filter((m) => m.month === activeMonth);

  return (
    <StudentLayout pageTitle="Course Curriculum">
      <div className="student-course-page">
        {/* Header */}
        <div className="course-page-head">
          <div>
            <div className="course-track-pill">Official 3-Month Curriculum</div>
            <h1 className="course-page-title">MERN Stack &amp; React Native App Development</h1>
            <p className="course-page-desc">
              Step-by-step practical modules covering modern JavaScript, React 19, Node.js, Express,
              MongoDB, AI-assisted development, and full-stack deployment.
            </p>
          </div>

          <div className="course-stat-pill">
            <span className="stat-num">{courseData?.progressPercentage || 0}%</span>
            <span className="stat-label">Course Completed</span>
          </div>
        </div>

        {/* Month Selector Tabs */}
        <div className="month-tabs-bar" role="tablist">
          {[1, 2, 3].map((monthNum) => {
            const countForMonth = modules
              .filter((m) => m.month === monthNum)
              .reduce((sum, m) => sum + (m.lessons?.length || 0), 0);

            const monthTitles = {
              1: 'Month 1: Frontend & React',
              2: 'Month 2: Backend & APIs',
              3: 'Month 3: Mobile Apps & Deploy',
            };

            return (
              <button
                key={monthNum}
                type="button"
                role="tab"
                aria-selected={activeMonth === monthNum}
                className={`month-tab-btn ${activeMonth === monthNum ? 'active' : ''}`}
                onClick={() => setActiveMonth(monthNum)}
              >
                <span className="tab-title">{monthTitles[monthNum]}</span>
                <span className="tab-badge">{countForMonth} lessons</span>
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <div className="course-loading-card">
            <div className="loading-spinner" />
            <p>Loading course modules and lessons...</p>
          </div>
        ) : error ? (
          <div className="course-error-card">
            <p>⚠️ {error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        ) : (
          <div className="modules-stack">
            {filteredModules.length === 0 ? (
              <div className="no-modules-msg">
                <p>No modules published for Month {activeMonth} yet.</p>
              </div>
            ) : (
              filteredModules.map((mod, modIdx) => (
                <div key={mod._id} className="module-card">
                  <div className="module-header">
                    <div className="module-index-badge">Module {mod.order || modIdx + 1}</div>
                    <div className="module-title-wrap">
                      <h2 className="module-title">{mod.title}</h2>
                      {mod.description && <p className="module-desc">{mod.description}</p>}
                    </div>
                  </div>

                  <div className="lessons-list">
                    {mod.lessons?.length === 0 ? (
                      <p className="no-lessons-txt">No published lessons in this module yet.</p>
                    ) : (
                      mod.lessons?.map((lesson, lIdx) => {
                        const isDone = completedLessonIds.has(lesson._id);

                        return (
                          <div
                            key={lesson._id}
                            className={`lesson-row-card ${isDone ? 'completed-lesson' : ''}`}
                          >
                            <div className="lesson-left">
                              <span
                                className={`completion-icon ${isDone ? 'done' : 'pending'}`}
                                title={isDone ? 'Completed' : 'Pending completion'}
                              >
                                {isDone ? '✓' : `${lIdx + 1}`}
                              </span>

                              <div className="lesson-info">
                                <Link
                                  to={`/student/course/lesson/${lesson._id}`}
                                  className="lesson-link-title"
                                >
                                  {lesson.title}
                                </Link>
                                {lesson.description && (
                                  <p className="lesson-row-desc">{lesson.description}</p>
                                )}
                              </div>
                            </div>

                            <div className="lesson-right">
                              {lesson.resourcesCount > 0 && (
                                <span className="resource-pill">
                                  📎 {lesson.resourcesCount} resources
                                </span>
                              )}

                              <Link to={`/student/course/lesson/${lesson._id}`}>
                                <Button
                                  variant={isDone ? 'outline' : 'primary'}
                                  size="sm"
                                  className="open-lesson-btn"
                                >
                                  {isDone ? 'Review' : 'Open Lesson'} →
                                </Button>
                              </Link>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}

export default StudentCoursePage;
