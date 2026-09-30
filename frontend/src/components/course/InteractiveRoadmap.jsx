import React from 'react';
import Badge from '../common/Badge';
import { LEARNING_ROADMAP_STEPS } from '../../data/curriculumData';
import './InteractiveRoadmap.css';

export function InteractiveRoadmap() {
  return (
    <section className="roadmap-section" id="learning-roadmap" aria-labelledby="roadmap-heading">
      <div className="app-container">
        <div className="roadmap-header">
          <Badge variant="purple" style={{ marginBottom: 'var(--space-2)' }}>
            Step-by-Step Learning Progression
          </Badge>
          <h2 id="roadmap-heading" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', marginBottom: 'var(--space-3)' }}>
            The 13-Milestone Engineering Roadmap
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Each concept connects directly to the next. From your first HTML tag to compiling native Android APKs
            and presenting verified projects on LinkedIn.
          </p>
        </div>

        <div className="roadmap-timeline-track">
          {LEARNING_ROADMAP_STEPS.map((node, index) => (
            <div key={node.step} className="roadmap-node">
              <div className="roadmap-node-badge" aria-hidden="true">
                {index + 1}
              </div>

              <div className="roadmap-card">
                <div className="roadmap-card-tag">{node.subtitle}</div>
                <h3 className="roadmap-card-title">{node.title}</h3>
                <p className="roadmap-card-desc">{node.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InteractiveRoadmap;
