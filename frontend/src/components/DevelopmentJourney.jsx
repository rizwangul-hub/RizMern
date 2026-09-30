import React from 'react';
import Badge from './common/Badge';
import { DEVELOPMENT_JOURNEY } from '../data/portfolioData';
import './DevelopmentJourney.css';

export function DevelopmentJourney() {
  return (
    <section className="journey-section" id="journey" aria-labelledby="journey-title">
      <div className="app-container">
        <div className="journey-header">
          <Badge variant="purple" style={{ marginBottom: 'var(--space-2)' }}>
            Growth &amp; Milestones
          </Badge>
          <h2 id="journey-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            My Learning and Development Journey
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            A disciplined, project-backed progression from foundational JavaScript into full-stack
            systems, native mobile apps, and modern AI engineering.
          </p>
        </div>

        <div className="journey-timeline-wrap">
          {DEVELOPMENT_JOURNEY.map((item, index) => (
            <div key={index} className="journey-node">
              <div className="journey-bullet" aria-hidden="true" />
              <div className="journey-card">
                <div className="journey-phase-badge">{item.phase}</div>
                <h3 className="journey-title">{item.title}</h3>
                <p className="journey-desc">{item.description}</p>

                <div className="journey-skills-pills">
                  {item.skillsHighlighted.map((s) => (
                    <span key={s} className="journey-skill-item">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DevelopmentJourney;
