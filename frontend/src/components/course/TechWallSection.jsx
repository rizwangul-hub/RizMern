import React from 'react';
import Badge from '../common/Badge';
import { TECH_WALL } from '../../data/curriculumData';
import './TechWallSection.css';

export function TechWallSection() {
  return (
    <section className="tech-wall-section" id="technologies" aria-labelledby="tech-wall-heading">
      <div className="app-container">
        <div className="tech-wall-header">
          <Badge variant="blue" style={{ marginBottom: 'var(--space-2)' }}>
            Curriculum Technologies
          </Badge>
          <h2 id="tech-wall-heading" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 'var(--space-3)' }}>
            The Modern Production Stack
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            We teach the exact tools, libraries, and runtime platforms used in contemporary web and mobile software development.
          </p>
        </div>

        <div className="tech-wall-grid">
          {TECH_WALL.map((cat) => (
            <div key={cat.category} className="tech-wall-card">
              <div className="tech-wall-category-header">
                <span className="tech-wall-icon" aria-hidden="true">
                  {cat.icon}
                </span>
                <h3 className="tech-wall-category-name">{cat.category}</h3>
              </div>

              <div className="tech-wall-items-wrap">
                {cat.items.map((item) => (
                  <span key={item} className="tech-wall-pill">
                    {item}
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

export default TechWallSection;
