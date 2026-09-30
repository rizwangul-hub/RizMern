import React, { useEffect, useCallback } from 'react';
import Button from './Button';
import './ProjectDetailModal.css';

export function ProjectDetailModal({ project, onClose }) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, handleClose]);

  if (!project) return null;

  return (
    <div
      className="proj-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proj-detail-title"
    >
      <div className="proj-modal-content">
        <button
          type="button"
          className="proj-modal-close-btn"
          onClick={handleClose}
          aria-label="Close project modal"
        >
          ✕
        </button>

        <div className="proj-modal-header">
          <div className="proj-modal-category">{project.category}</div>
          <h2 id="proj-detail-title" className="proj-modal-title">
            {project.title}
          </h2>
          {project.tagline && <div className="proj-modal-tagline">{project.tagline}</div>}
        </div>

        {/* Problem Statement */}
        {project.problem && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div className="proj-modal-section-heading">Problem Solved</div>
            <p className="proj-modal-desc">{project.problem}</p>
          </div>
        )}

        {/* Short or Long Description */}
        <p className="proj-modal-desc">{project.longDescription || project.shortDescription}</p>

        {/* Architecture */}
        {project.architecture && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div className="proj-modal-section-heading">Application Architecture</div>
            <div
              style={{
                background: 'var(--bg-navy-900)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.84rem',
                color: 'var(--accent-blue-light)',
              }}
            >
              {project.architecture}
            </div>
          </div>
        )}

        {/* Verified Features */}
        {project.features && (
          <>
            <div className="proj-modal-section-heading">Core Implemented Features</div>
            <ul className="proj-features-list">
              {project.features.map((feat, idx) => (
                <li key={idx} className="proj-feature-item">
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* What Students Learn */}
        {project.whatStudentsLearn && (
          <div style={{ margin: 'var(--space-4) 0' }}>
            <div className="proj-modal-section-heading">What You Learn from This Project</div>
            <p className="proj-modal-desc">{project.whatStudentsLearn}</p>
          </div>
        )}

        {/* Technology Architecture Tags */}
        <div className="proj-modal-section-heading">Technologies</div>
        <div className="proj-modal-tech-wrap">
          {project.technologies.map((t) => (
            <span key={t} className="badge badge-purple">
              {t}
            </span>
          ))}
        </div>

        <div className="proj-modal-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary">
                Launch Live Project ↗
              </Button>
            </a>
          )}

          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                {project.isRepoVerified ? 'View GitHub Repo ↗' : 'GitHub Profile ↗'}
              </Button>
            </a>
          )}

          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailModal;
