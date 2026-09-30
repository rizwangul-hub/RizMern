import React from 'react';
import Button from '../common/Button';
import Badge from '../common/Badge';
import './CourseCta.css';

export function CourseCta({ onOpenDemo }) {
  const handleScrollToCurriculum = () => {
    const el = document.getElementById('curriculum-detail');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="course-cta-section" id="course-cta" aria-labelledby="demo-cta-title">
      <div className="app-container">
        <div className="course-cta-box">
          <Badge variant="purple" style={{ marginBottom: 'var(--space-3)' }}>
            Complimentary Preview Session
          </Badge>

          <h2 id="demo-cta-title" className="course-cta-title">
            Want to Understand the Course Before You Join?
          </h2>

          <p className="course-cta-desc">
            Join the free demo class and learn more about the course structure, learning approach,
            technologies and practical projects. No registration fee and no obligation.
          </p>

          <div className="course-cta-btn-row">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenDemo}
            >
              Join Free Demo Class
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleScrollToCurriculum}
            >
              Review Curriculum ↑
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseCta;
