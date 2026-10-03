import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';
import {
  DETAILED_CURRICULUM,
  REST_API_FLOW_STEPS,
  AUTH_VS_AUTHORIZATION,
} from '../../data/curriculumData';
import './InteractiveCurriculum.css';

export function InteractiveCurriculum() {
  const [activeMonthId, setActiveMonthId] = useState('month-1');
  const [openSubsections, setOpenSubsections] = useState({ 'A': true, 'B': true });
  const [showRestFlow, setShowRestFlow] = useState(false);
  const [showAuthGrid, setShowAuthGrid] = useState(false);
  const [showAndroidWorkflow, setShowAndroidWorkflow] = useState(false);

  const currentModule =
    DETAILED_CURRICULUM.find((m) => m.id === activeMonthId) || DETAILED_CURRICULUM[0];

  const handleMonthChange = (monthId) => {
    setActiveMonthId(monthId);
    setOpenSubsections({ 'A': true });
    setShowRestFlow(false);
    setShowAuthGrid(false);
    setShowAndroidWorkflow(false);
  };

  const toggleSubsection = (code) => {
    setOpenSubsections((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const areAllExpanded = currentModule.subsections.every((sub) => openSubsections[sub.code]);

  const toggleAll = () => {
    if (areAllExpanded) {
      setOpenSubsections({});
    } else {
      const allOpen = {};
      currentModule.subsections.forEach((sub) => {
        allOpen[sub.code] = true;
      });
      setOpenSubsections(allOpen);
    }
  };

  return (
    <section
      className="curriculum-detail-section"
      id="curriculum-detail"
      aria-labelledby="curriculum-detail-title"
    >
      <div className="app-container">
        <div className="curriculum-header">
          <Badge variant="purple" style={{ marginBottom: 'var(--space-2)' }}>
            Interactive 3-Month Curriculum
          </Badge>
          <h2
            id="curriculum-detail-title"
            style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', marginBottom: 'var(--space-3)' }}
          >
            Explore the Learning Path by Month
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Click each month and topic card below to explore topics, practical activities, and architecture.
          </p>
        </div>

        {/* 1. Month Navigation Tabs */}
        <div className="month-tabs-container" role="tablist" aria-label="Curriculum Months">
          {DETAILED_CURRICULUM.map((mod) => {
            const isActive = mod.id === activeMonthId;
            return (
              <button
                key={mod.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${mod.id}`}
                id={`tab-${mod.id}`}
                className={`month-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleMonthChange(mod.id)}
              >
                <span>{mod.month}</span>
                <span className="month-tab-badge">
                  {mod.monthNumber === 1
                    ? 'Frontend & React'
                    : mod.monthNumber === 2
                    ? 'Backend + MERN'
                    : 'React Native & Cloud'}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Active Month Content Panel */}
        <div
          id={`panel-${currentModule.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentModule.id}`}
          className="active-month-card"
        >
          {/* Header Banner */}
          <div className="month-banner">
            <Badge variant="blue">{currentModule.badge}</Badge>
            <h3 className="month-banner-title">{currentModule.title}</h3>
            <p className="month-banner-overview">{currentModule.overview}</p>

            <div className="month-tech-tags" aria-label="Month Technologies">
              {currentModule.technologies.map((t) => (
                <span key={t} className="month-tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Subsections Toolbar */}
          <div className="subsections-toolbar">
            <span className="subsections-count-label">
              {currentModule.subsections.length} Core Learning Modules
            </span>
            <button
              type="button"
              className="subsections-toggle-all-btn"
              onClick={toggleAll}
            >
              {areAllExpanded ? 'Collapse All Topics' : 'Expand All Topics'}
            </button>
          </div>

          {/* Subsections Accordion Grid */}
          <div className="subsections-grid">
            {currentModule.subsections.map((sub) => {
              const isOpen = Boolean(openSubsections[sub.code]);
              return (
                <div key={sub.code} className={`subsection-card ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="subsection-header-btn"
                    onClick={() => toggleSubsection(sub.code)}
                    aria-expanded={isOpen}
                  >
                    <div className="subsection-header-left">
                      <span className="subsection-code">{sub.code}</span>
                      <h4 className="subsection-name">{sub.name}</h4>
                    </div>
                    <div className="subsection-header-right">
                      <span className="subsection-count-pill">
                        {sub.items.length} topics
                      </span>
                      <ChevronDown
                        size={17}
                        className={`subsection-chevron ${isOpen ? 'rotate' : ''}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                  {isOpen && (
                    <ul className="subsection-items-list">
                      {sub.items.map((item, idx) => (
                        <li key={idx} className="subsection-topic-item">
                          <CheckCircle2 size={13} className="subsection-topic-icon" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {/* Month 2 Specific Spotlight: REST API Lifecycle & Auth Architecture */}
          {currentModule.id === 'month-2' && (
            <>
              {/* REST API Request-Response Cycle */}
              <div className="curriculum-spotlight-card">
                <button
                  type="button"
                  className="spotlight-header-btn"
                  onClick={() => setShowRestFlow(!showRestFlow)}
                  aria-expanded={showRestFlow}
                >
                  <div className="spotlight-title">
                    <span>🔄</span> REST API Request-Response Architecture
                  </div>
                  <div className="spotlight-header-right">
                    <span className="spotlight-badge">Architecture Flow</span>
                    <ChevronDown
                      size={18}
                      className={`subsection-chevron ${showRestFlow ? 'rotate' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
                {showRestFlow && (
                  <div className="rest-flow-track" style={{ marginTop: '1rem' }}>
                    {REST_API_FLOW_STEPS.map((step) => (
                      <div key={step.step} className="rest-flow-step">
                        <div className="rest-step-num">Step {step.step}</div>
                        <div className="rest-step-label">{step.label}</div>
                        <div className="rest-step-desc">{step.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Authentication vs Authorization Breakdown */}
              <div className="curriculum-spotlight-card">
                <button
                  type="button"
                  className="spotlight-header-btn"
                  onClick={() => setShowAuthGrid(!showAuthGrid)}
                  aria-expanded={showAuthGrid}
                >
                  <div className="spotlight-title">
                    <span>🔐</span> Architectural Clarity: Authentication vs. Authorization
                  </div>
                  <div className="spotlight-header-right">
                    <span className="spotlight-badge">Deep Dive</span>
                    <ChevronDown
                      size={18}
                      className={`subsection-chevron ${showAuthGrid ? 'rotate' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
                {showAuthGrid && (
                  <div className="auth-grid" style={{ marginTop: '1rem' }}>
                    <div className="auth-col-card">
                      <div className="auth-col-header">Authentication</div>
                      <div className="auth-col-question">
                        "{AUTH_VS_AUTHORIZATION.authentication.question}"
                      </div>
                      <p className="auth-col-def">
                        {AUTH_VS_AUTHORIZATION.authentication.definition}
                      </p>
                      <ul className="auth-examples-list">
                        {AUTH_VS_AUTHORIZATION.authentication.examples.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="auth-col-card">
                      <div className="auth-col-header">Authorization</div>
                      <div className="auth-col-question">
                        "{AUTH_VS_AUTHORIZATION.authorization.question}"
                      </div>
                      <p className="auth-col-def">
                        {AUTH_VS_AUTHORIZATION.authorization.definition}
                      </p>
                      <ul className="auth-examples-list">
                        {AUTH_VS_AUTHORIZATION.authorization.examples.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Month 3 Specific Spotlight: Android Build Realities */}
          {currentModule.id === 'month-3' && (
            <div className="curriculum-spotlight-card">
              <button
                type="button"
                className="spotlight-header-btn"
                onClick={() => setShowAndroidWorkflow(!showAndroidWorkflow)}
                aria-expanded={showAndroidWorkflow}
              >
                <div className="spotlight-title">
                  <span>📱</span> Android APK Compilation &amp; Testing Workflow
                </div>
                <div className="spotlight-header-right">
                  <span className="spotlight-badge">Build Guide</span>
                  <ChevronDown
                    size={18}
                    className={`subsection-chevron ${showAndroidWorkflow ? 'rotate' : ''}`}
                    aria-hidden="true"
                  />
                </div>
              </button>
              {showAndroidWorkflow && (
                <div style={{ marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-3)' }}>
                    You will practice configuring <code>app.json</code>, running live mobile simulations via Expo,
                    and compiling standalone Android APK files for direct installation on physical Android devices.
                  </p>
                  <div style={{ background: 'var(--bg-navy-900)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                      <strong>Honest Publishing Reality:</strong> Google Play Store registration requires a Google Developer Account and store compliance review. The course teaches hands-on native development and compiled APK generation; automated store publication is not guaranteed for every project.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Practical Capstone Project */}
          {currentModule.capstone && (
            <div className="month-capstone-banner">
              <div className="capstone-badge-label">{currentModule.capstone.title}</div>
              <h4 className="capstone-project-name">{currentModule.capstone.name}</h4>
              <p className="capstone-project-desc">{currentModule.capstone.description}</p>

              <div className="capstone-focus-grid">
                {currentModule.capstone.learningFocus.map((focus, i) => (
                  <div key={i} className="capstone-focus-item">
                    <span>✓</span> {focus}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="curriculum-module-note">{currentModule.note}</p>
        </div>
      </div>
    </section>
  );
}

export default InteractiveCurriculum;
