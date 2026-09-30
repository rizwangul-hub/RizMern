import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useStudentAuth } from '../../context/useStudentAuth';
import SEO from '../../components/common/SEO';
import Button from '../../components/common/Button';
import './StudentLoginPage.css';

export function StudentLoginPage() {
  const { login, isAuthenticated } = useStudentAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to dashboard or attempted destination
  React.useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/student/dashboard';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your student email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await login(email.trim(), password);
    setIsSubmitting(false);

    if (res.success) {
      const destination = location.state?.from?.pathname || '/student/dashboard';
      navigate(destination, { replace: true });
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleFillDemo = () => {
    setEmail('student@rizmern.com');
    setPassword('StudentPass123!');
  };

  return (
    <div className="student-login-wrapper">
      <SEO title="Student Portal Login | RizMern LMS" noIndex={true} />

      <div className="student-login-card">
        {/* Brand Header */}
        <div className="student-login-header">
          <Link to="/" className="student-login-brand">
            <span className="brand-riz">Riz</span>Mern
            <span className="brand-pill">LMS</span>
          </Link>
          <h1 className="student-login-title">Student Learning Portal</h1>
          <p className="student-login-subtitle">
            Sign in to access your modules, live code walkthroughs, and curriculum progress.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="student-login-alert" role="alert">
            <span className="alert-icon">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="student-login-form">
          <div className="form-group">
            <label htmlFor="student-email" className="form-label">
              Student Email
            </label>
            <input
              id="student-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@rizmern.com"
              required
              autoComplete="email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <div className="label-with-action">
              <label htmlFor="student-password" className="form-label">
                Password
              </label>
              <button
                type="button"
                className="text-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="student-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your student password"
              required
              autoComplete="current-password"
              className="form-input"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: 'var(--space-2)' }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In to Portal →'}
          </Button>
        </form>

        {/* Quick Demo Helper */}
        <div className="student-demo-helper">
          <button type="button" onClick={handleFillDemo} className="fill-demo-btn">
            ⚡ Fill Seed Student Credentials
          </button>
        </div>

        {/* Support & Public Link */}
        <div className="student-login-footer">
          <p>
            Enrolled student without credentials? Contact instructor Rizwan Ullah on WhatsApp or check your admission email.
          </p>
          <div className="student-back-link">
            <Link to="/">← Back to RizMern Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentLoginPage;
