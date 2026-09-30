import { useContext } from 'react';
import StudentAuthContext from './StudentAuthContext';

export function useStudentAuth() {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error('useStudentAuth must be used within a StudentAuthProvider');
  }
  return context;
}

export default useStudentAuth;
