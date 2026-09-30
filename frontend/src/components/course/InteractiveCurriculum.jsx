import React, { useState } from 'react';
import Badge from '../common/Badge';
import {
  DETAILED_CURRICULUM,
  REST_API_FLOW_STEPS,
  AUTH_VS_AUTHORIZATION,
} from '../../data/curriculumData';
import './InteractiveCurriculum.css';

export function InteractiveCurriculum() {
  const [activeMonthId, setActiveMonthId] = useState('month-1');

  const currentModule =
    DETAILED_CURRICULUM.find((m) => m.id === activeMonthId) || DETAILED_CURRICULUM[0];

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
            Click each month below to explore the detailed topics, practical activities, and architecture.
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
                onClick={() => setActiveMonthId(mod.id)}
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

          {/* Subsections Grid */}
          <div className="subsections-grid">
            {currentModule.subsections.map((sub) => (
              <div key={sub.code} className="subsection-card">
                <div className="subsection-header">
                  <span className="subsection-code">{sub.code}</span>
                  <h4 className="subsection-name">{sub.name}</h4>
                </div>
                <ul className="subsection-items-list">
                  {sub.items.map((item, idx) => (
                    <li key={idx} className="subsection-topic-item">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Month 2 Specific Spotlight: REST API Lifecycle & Auth Architecture */}
          {currentModule.id === 'month-2' && (
            <>
              {/* REST API Request-Response Cycle */}
              <div className="curriculum-spotlight-card">
                <h4 className="spotlight-title">
                  <span>🔄</span> REST API Request-Response Architecture
                </h4>
                <div className="rest-flow-track">
                  {REST_API_FLOW_STEPS.map((step) => (
                    <div key={step.step} className="rest-flow-step">
                      <div className="rest-step-num">Step {step.step}</div>
                      <div className="rest-step-label">{step.label}</div>
                      <div className="rest-step-desc">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentication vs Authorization Breakdown */}
              <div className="curriculum-spotlight-card">
                <h4 className="spotlight-title">
                  <span>🔐</span> Architectural Clarity: Authentication vs. Authorization
                </h4>
                <div className="auth-grid">
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
              </div>
            </>
          )}

          {/* Month 3 Specific Spotlight: Android Build Realities */}
          {currentModule.id === 'month-3' && (
            <div className="curriculum-spotlight-card">
              <h4 className="spotlight-title">
                <span>📱</span> Android APK Compilation &amp; Testing Workflow
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-3)' }}>
                You will practice configuring <code>app.json</code>, running live mobile simulations via Expo,
                and compiling standalone Android APK files for direct installation on physical Android devices.
              </p>
              <div style={{ background: 'var(--bg-navy-900)', padding: 'var(--space-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <strong>Honest Publishing Reality:</strong> Google Play Store registration requires a Google Developer Account and store compliance review. The course teaches hands-on native development and compiled APK generation; automated store publication is not guaranteed for every project.
                </p>
              </div>
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
