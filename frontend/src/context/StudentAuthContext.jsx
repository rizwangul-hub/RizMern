import React, { createContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

const StudentAuthContext = createContext(null);

export function StudentAuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('rizmern_student_token') || '');
  const [isLoading, setIsLoading] = useState(true);

  const apiBase = API_BASE_URL;

  // Authenticated fetch wrapper for student API endpoints
  const authFetch = useCallback(
    async (endpoint, options = {}) => {
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      };

      const currentToken = token || localStorage.getItem('rizmern_student_token');
      if (currentToken) {
        headers.Authorization = `Bearer ${currentToken}`;
      }

      const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${endpoint}`;
      const res = await fetch(url, {
        ...options,
        headers,
        credentials: 'include',
      });

      // If suspended or unauthorized mid-session, log student out automatically
      if (res.status === 401 || (res.status === 403 && endpoint.startsWith('/student/'))) {
        try {
          const clone = res.clone();
          const data = await clone.json();
          if (data?.suspended || data?.message?.includes('suspended')) {
            localStorage.removeItem('rizmern_student_token');
            setToken('');
            setStudent(null);
          }
        } catch {
          // ignore parsing error
        }
      }

      return res;
    },
    [apiBase, token]
  );

  // Verify active student session on mount
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const storedToken = localStorage.getItem('rizmern_student_token');
        const headers = { 'Content-Type': 'application/json' };
        if (storedToken) {
          headers.Authorization = `Bearer ${storedToken}`;
        }

        const res = await fetch(`${apiBase}/student/me`, {
          method: 'GET',
          headers,
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && data.student) {
            setStudent(data.student);
          }
        } else {
          if (isMounted) {
            localStorage.removeItem('rizmern_student_token');
            setToken('');
            setStudent(null);
          }
        }
      } catch {
        if (isMounted) {
          setStudent(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkAuth();
    return () => {
      isMounted = false;
    };
  }, [apiBase]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${apiBase}/student/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStudent(data.student);
        if (data.token) {
          setToken(data.token);
          localStorage.setItem('rizmern_student_token', data.token);
        }
        return { success: true };
      }

      return {
        success: false,
        message: data.message || 'Invalid email or password.',
        suspended: Boolean(data.suspended),
      };
    } catch {
      return {
        success: false,
        message: 'Unable to connect to the learning server. Please ensure the backend is running.',
      };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${apiBase}/student/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('rizmern_student_token');
      setToken('');
      setStudent(null);
    }
  };

  const updateStudentData = (updatedData) => {
    setStudent((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  const value = {
    student,
    token,
    isAuthenticated: Boolean(student),
    isLoading,
    login,
    logout,
    authFetch,
    updateStudentData,
  };

  return <StudentAuthContext.Provider value={value}>{children}</StudentAuthContext.Provider>;
}

export default StudentAuthContext;
