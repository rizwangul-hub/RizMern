import React from 'react';
import Badge from './common/Badge';
import { TEACHING_PHILOSOPHY_STEPS } from '../data/portfolioData';
import './TeachingPhilosophySection.css';

export function TeachingPhilosophySection() {
  return (
    <section className="philosophy-section" id="teaching-philosophy" aria-labelledby="phil-title">
      <div className="app-container">
        <div className="philosophy-header">
          <Badge variant="blue" style={{ marginBottom: 'var(--space-2)' }}>
            Instructional Credo
          </Badge>
          <h2 id="phil-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            Learn How Real Projects Come Together
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Software engineering is not about memorizing syntax puzzles. It is about understanding
            the problem, designing a modular architecture, leveraging modern AI workflows, and
            shipping dependable code to production.
          </p>
        </div>

        {/* 6-Step Visual Workflow */}
        <div className="philosophy-flow-wrap">
          {TEACHING_PHILOSOPHY_STEPS.map((s) => (
            <div key={s.step} className="philosophy-card">
              <span className="phil-step-num">Principle 0{s.step}</span>
              <h3 className="phil-step-title">{s.title}</h3>
              <p className="phil-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeachingPhilosophySection;
