/**
 * Student Learning Portal Service Helpers
 */

export async function fetchStudentCourses(authFetch) {
  const res = await authFetch('/student/courses');
  if (!res.ok) throw new Error('Failed to fetch courses');
  return res.json();
}

export async function fetchCourseDetails(authFetch, courseId = 'rizmern-3month') {
  const res = await authFetch(`/student/courses/${courseId}`);
  if (!res.ok) throw new Error('Failed to fetch course details');
  return res.json();
}

export async function fetchStudentLesson(authFetch, lessonId) {
  const res = await authFetch(`/student/lessons/${lessonId}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load lesson content');
  }
  return res.json();
}

export async function markLessonComplete(authFetch, lessonId) {
  const res = await authFetch(`/student/lessons/${lessonId}/complete`, {
    method: 'POST',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update lesson completion');
  }
  return res.json();
}

export async function fetchStudentProgress(authFetch) {
  const res = await authFetch('/student/progress');
  if (!res.ok) throw new Error('Failed to fetch learning progress');
  return res.json();
}

export async function updateStudentProfile(authFetch, profileData) {
  const res = await authFetch('/student/profile', {
    method: 'PATCH',
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update profile');
  }
  return data;
}

export async function changeStudentPassword(authFetch, passwordData) {
  const res = await authFetch('/student/password', {
    method: 'PATCH',
    body: JSON.stringify(passwordData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to change password');
  }
  return data;
}
