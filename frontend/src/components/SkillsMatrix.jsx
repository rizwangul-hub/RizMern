import React from 'react';
import Badge from './common/Badge';
import { INSTRUCTOR_SKILLS } from '../data/portfolioData';
import './SkillsMatrix.css';

export function SkillsMatrix() {
  const categories = Object.values(INSTRUCTOR_SKILLS);

  return (
    <section className="skills-matrix-section" id="skills" aria-labelledby="skills-title">
      <div className="app-container">
        <div className="skills-matrix-header">
          <Badge variant="purple" style={{ marginBottom: 'var(--space-2)' }}>
            Technical Toolchain
          </Badge>
          <h2 id="skills-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            Categorized Engineering Skills
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Practical technologies actively used to build client interfaces, backend services,
            cross-platform mobile apps, and cloud deployment pipelines.
          </p>
        </div>

        <div className="skills-category-grid">
          {categories.map((cat) => (
            <div key={cat.category} className="skill-category-card">
              <div className="skill-card-top">
                <div className="skill-icon-wrap" aria-hidden="true">
                  {cat.icon}
                </div>
                <h3 className="skill-category-title">{cat.category}</h3>
              </div>

              <p className="skill-category-desc">{cat.description}</p>

              <div className="skill-pills-list">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-tag-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsMatrix;
