import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStudentAuth } from '../../context/useStudentAuth';
import { fetchStudentLesson, markLessonComplete } from '../../services/studentService';
import StudentLayout from '../../components/student/StudentLayout';
import Button from '../../components/common/Button';
import './StudentLessonPage.css';

/**
 * Lightweight code block & markdown renderer for LMS lessons
 */
function LessonContentRenderer({ content }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!content) return null;

  // Split content by code blocks ```lang ... ```
  const parts = content.split(/(```[\s\S]*?```)/g);

  const handleCopy = (codeText, index) => {
    navigator.clipboard.writeText(codeText.trim());
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="lesson-markdown-body">
      {parts.map((part, idx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).split('\n');
          const lang = lines[0].trim() || 'code';
          const code = lines.slice(1).join('\n');

          return (
            <div key={idx} className="lesson-code-block">
              <div className="code-header">
                <span className="code-lang-tag">{lang}</span>
                <button
                  type="button"
                  className="code-copy-btn"
                  onClick={() => handleCopy(code, idx)}
                  aria-label="Copy code block"
                >
                  {copiedIndex === idx ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="code-pre">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Render headings and paragraphs
        return (
          <div key={idx} className="lesson-prose-block">
            {part.split('\n\n').map((paragraph, pIdx) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="lesson-h3">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={pIdx} className="lesson-h2">
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('# ')) {
                return (
                  <h1 key={pIdx} className="lesson-h1">
                    {trimmed.replace('# ', '')}
                  </h1>
                );
              }

              // Handle list items
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const items = trimmed.split('\n').filter(Boolean);
                return (
                  <ul key={pIdx} className="lesson-ul">
                    {items.map((item, iIdx) => (
                      <li key={iIdx}>{item.replace(/^[-*]\s+/, '')}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={pIdx} className="lesson-p">
                  {trimmed}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function StudentLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { authFetch } = useStudentAuth();

  const [lessonData, setLessonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState(null);
  const [completionAlert, setCompletionAlert] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadLesson() {
      setIsLoading(true);
      setError(null);
      setCompletionAlert(null);
      try {
        const data = await fetchStudentLesson(authFetch, lessonId);
        if (isMounted && data.success) {
          setLessonData(data);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadLesson();
    return () => {
      isMounted = false;
    };
  }, [authFetch, lessonId]);

  const handleMarkComplete = async () => {
    if (!lessonData?.lesson?._id) return;
    setIsCompleting(true);
    try {
      const res = await markLessonComplete(authFetch, lessonData.lesson._id);
      if (res.success) {
        setLessonData((prev) => ({
          ...prev,
          isCompleted: true,
        }));
        setCompletionAlert({
          type: 'success',
          message: 'Lesson marked as completed! Progress updated.',
        });
      }
    } catch (err) {
      setCompletionAlert({
        type: 'error',
        message: err.message || 'Could not update completion status.',
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const lesson = lessonData?.lesson;
  const moduleInfo = lessonData?.module;
  const isCompleted = lessonData?.isCompleted;
  const navigation = lessonData?.navigation;

  return (
    <StudentLayout pageTitle={lesson?.title || 'Lesson View'}>
      <div className="student-lesson-container">
        {/* Breadcrumb Navigation */}
        <nav className="lesson-breadcrumbs" aria-label="Curriculum breadcrumb">
          <Link to="/student/course">Curriculum</Link>
          <span className="crumb-sep">/</span>
          <span>Month {moduleInfo?.month || 1}</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-module">{moduleInfo?.title || 'Module'}</span>
        </nav>

        {isLoading ? (
          <div className="lesson-loading-state">
            <div className="loading-spinner" />
            <p>Loading lesson content...</p>
          </div>
        ) : error ? (
          <div className="lesson-error-state">
            <p>⚠️ {error}</p>
            <Button variant="outline" size="sm" onClick={() => navigate('/student/course')}>
              ← Back to Course
            </Button>
          </div>
        ) : !lesson ? (
          <div className="lesson-error-state">
            <p>Lesson not found.</p>
            <Button variant="outline" size="sm" onClick={() => navigate('/student/course')}>
              ← Back to Course
            </Button>
          </div>
        ) : (
          <article className="lesson-article-card">
            {/* Lesson Header */}
            <header className="lesson-article-header">
              <div className="lesson-header-top">
                <span className="lesson-order-tag">Lesson #{lesson.order || 1}</span>
                <span className={`status-pill ${isCompleted ? 'status-done' : 'status-in-progress'}`}>
                  {isCompleted ? '✓ Completed' : 'In Progress'}
                </span>
              </div>

              <h1 className="lesson-headline">{lesson.title}</h1>
              {lesson.description && <p className="lesson-subhead">{lesson.description}</p>}

              {completionAlert && (
                <div className={`completion-feedback-banner ${completionAlert.type}`}>
                  {completionAlert.type === 'success' ? '✓ ' : '⚠️ '}
                  {completionAlert.message}
                </div>
              )}
            </header>

            {/* Video Player (if URL provided) */}
            {lesson.videoUrl && (
              <div className="lesson-video-box">
                <div className="video-responsive-wrap">
                  <iframe
                    src={lesson.videoUrl}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Formatted Markdown Content */}
            <section className="lesson-body-section">
              <LessonContentRenderer content={lesson.content} />
            </section>

            {/* Resources & References Section */}
            {lesson.resources && lesson.resources.length > 0 && (
              <section className="lesson-resources-card">
                <h3 className="resources-heading">📎 Lesson Downloads &amp; Reference Links</h3>
                <ul className="resources-ul">
                  {lesson.resources.map((item, idx) => (
                    <li key={idx} className="resource-li">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-item-link"
                      >
                        <span className="resource-title">{item.title}</span>
                        <span className="resource-type-badge">{item.type || 'link'}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Completion Action Card */}
            <div className="lesson-completion-footer">
              <div className="completion-left">
                <span className="completion-prompt">
                  {isCompleted
                    ? 'Great job! You have already finished this lesson.'
                    : 'Finished coding and testing this exercise?'}
                </span>
              </div>
              <div className="completion-right">
                <Button
                  variant={isCompleted ? 'outline' : 'primary'}
                  size="md"
                  onClick={handleMarkComplete}
                  disabled={isCompleting || isCompleted}
                >
                  {isCompleting
                    ? 'Updating...'
                    : isCompleted
                    ? '✓ Marked Complete'
                    : 'Mark as Completed'}
                </Button>
              </div>
            </div>

            {/* Bottom Prev / Next Navigation Bar */}
            <footer className="lesson-nav-footer">
              {navigation?.prev ? (
                <Link to={`/student/course/lesson/${navigation.prev._id}`} className="nav-btn prev-btn">
                  <span className="nav-arrow">←</span>
                  <div className="nav-text">
                    <span className="nav-label">Previous Lesson</span>
                    <span className="nav-title">{navigation.prev.title}</span>
                  </div>
                </Link>
              ) : (
                <div className="nav-placeholder" />
              )}

              {navigation?.next ? (
                <Link to={`/student/course/lesson/${navigation.next._id}`} className="nav-btn next-btn">
                  <div className="nav-text align-right">
                    <span className="nav-label">Next Lesson</span>
                    <span className="nav-title">{navigation.next.title}</span>
                  </div>
                  <span className="nav-arrow">→</span>
                </Link>
              ) : (
                <Link to="/student/progress" className="nav-btn next-btn complete-course-nav">
                  <div className="nav-text align-right">
                    <span className="nav-label">Review All</span>
                    <span className="nav-title">View Final Progress →</span>
                  </div>
                </Link>
              )}
            </footer>
          </article>
        )}
      </div>
    </StudentLayout>
  );
}

export default StudentLessonPage;
