import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from './Button';
import './DemoModal.css';

export function DemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    track: 'both',
    goals: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    setSubmitted(false);
    setError('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.contact.trim()) {
      setError('Please provide an email address or WhatsApp number.');
      return;
    }

    // Record demo interest in local session state (Backend API will connect in Phase 3)
    setSubmitted(true);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div className="modal-content" ref={modalRef}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close dialog"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <h2 id="demo-modal-title" className="modal-title">
                Join Free Demo Class
              </h2>
              <p className="modal-desc">
                Experience Rizwan Ullah's live online teaching method, see how we build real
                MERN &amp; React Native projects with AI, and ask your questions.
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              {error && <p className="form-feedback">{error}</p>}

              <div className="form-group">
                <label htmlFor="demo-name" className="form-label">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  id="demo-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="demo-contact" className="form-label">
                  WhatsApp Number or Email *
                </label>
                <input
                  type="text"
                  id="demo-contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="e.g. +92 300 1234567 or email@domain.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="demo-track" className="form-label">
                  Primary Interest
                </label>
                <select
                  id="demo-track"
                  name="track"
                  value={formData.track}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="both">Both Full-Stack Web &amp; React Native Mobile</option>
                  <option value="mern">MERN Stack Web Development</option>
                  <option value="mobile">React Native &amp; Android APK Generation</option>
                  <option value="ai">AI-Assisted Engineering Workflows</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="demo-goals" className="form-label">
                  Goals or Questions (Optional)
                </label>
                <textarea
                  id="demo-goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  placeholder="Tell us what you'd like to achieve in 3 months..."
                  className="form-textarea"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                style={{ width: '100%', marginTop: 'var(--space-2)' }}
              >
                Register for Free Demo Class
              </Button>
            </form>
          </>
        ) : (
          <div className="success-box">
            <div className="success-icon" aria-hidden="true">
              ✓
            </div>
            <h3 style={{ color: 'var(--text-primary)' }}>Seat Request Received!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6' }}>
              Thank you, <strong>{formData.name}</strong>. Instructor{' '}
              <strong>Rizwan Ullah</strong> will reach out to you at{' '}
              <strong>{formData.contact}</strong> with the online demo class link, schedule,
              and introductory material.
            </p>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginTop: 'var(--space-4)' }}
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DemoModal;
