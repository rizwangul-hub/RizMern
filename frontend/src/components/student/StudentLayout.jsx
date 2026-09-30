import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useStudentAuth } from '../../context/useStudentAuth';
import SEO from '../common/SEO';
import Button from '../common/Button';
import './StudentLayout.css';

export function StudentLayout({ children, pageTitle = 'Student Portal' }) {
  const { student, logout } = useStudentAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/student/login');
  };

  const navLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: '⚡' },
    { to: '/student/course', label: 'My Course', icon: '📚' },
    { to: '/student/progress', label: 'Progress', icon: '📊' },
    { to: '/student/profile', label: 'Account', icon: '⚙️' },
  ];

  return (
    <div className="student-portal-wrapper">
      <SEO title={`${pageTitle} | RizMern LMS`} noIndex={true} />

      {/* Top Navigation Bar */}
      <header className="student-header">
        <div className="student-header-inner">
          <div className="student-brand-group">
            <Link to="/student/dashboard" className="student-portal-logo">
              <span className="portal-logo-highlight">Riz</span>Mern
              <span className="portal-logo-badge">LMS</span>
            </Link>
            <span className="student-course-badge">3-Month Full-Stack &amp; AI</span>
          </div>

          {/* Desktop Nav */}
          <nav className="student-desktop-nav" aria-label="Student portal navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `student-nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User & Actions */}
          <div className="student-user-controls">
            <Link to="/" className="public-site-link" target="_blank" rel="noopener noreferrer">
              RizMern.com ↗
            </Link>

            <div className="student-profile-chip">
              <div className="student-avatar" aria-hidden="true">
                {(student?.fullName || 'S').charAt(0).toUpperCase()}
              </div>
              <div className="student-details">
                <span className="student-display-name">{student?.fullName || 'Student'}</span>
                <span className="student-badge-status">{student?.status || 'active'}</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="student-logout-btn"
            >
              Log Out
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="student-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle student navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="student-mobile-menu">
            <div className="student-mobile-user-card">
              <div className="student-avatar" aria-hidden="true">
                {(student?.fullName || 'S').charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="student-mobile-name">{student?.fullName}</p>
                <p className="student-mobile-email">{student?.email}</p>
              </div>
            </div>

            <div className="student-mobile-nav-list">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `student-mobile-link ${isActive ? 'active' : ''}`
                  }
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            <div className="student-mobile-actions">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                style={{ width: '100%' }}
              >
                Log Out
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Student Portal Content */}
      <main className="student-portal-main">
        <div className="student-main-container">{children}</div>
      </main>
    </div>
  );
}

export default StudentLayout;
