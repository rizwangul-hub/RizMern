import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStudentAuth } from '../../context/useStudentAuth';

export function StudentProtectedRoute() {
  const { isAuthenticated, isLoading } = useStudentAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          background: 'var(--bg-navy-950)',
          color: 'var(--text-secondary)',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            border: '3px solid rgba(139, 92, 246, 0.2)',
            borderTopColor: 'var(--accent-purple)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ fontSize: '0.9375rem' }}>Verifying student authorization...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default StudentProtectedRoute;
