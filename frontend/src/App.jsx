import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import mobileLoadingImage from './assets/mobile.png'
import SiteLayout from './layouts/SiteLayout'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import { StudentAuthProvider } from './context/StudentAuthContext'

const Home = lazy(() => import('./pages/Home'))
const CoursePage = lazy(() => import('./pages/CoursePage'))
const CurriculumPage = lazy(() => import('./pages/CurriculumPage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const InstructorPage = lazy(() => import('./pages/InstructorPage'))
const DemoPage = lazy(() => import('./pages/DemoPage'))
const AdmissionPage = lazy(() => import('./pages/AdmissionPage'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminLeadsPage = lazy(() => import('./pages/admin/AdminLeadsPage'))
const AdminAdmissionsPage = lazy(() => import('./pages/admin/AdminAdmissionsPage'))
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage'))
const AdminStudentsPage = lazy(() => import('./pages/admin/AdminStudentsPage'))
const AdminCourseContentPage = lazy(() => import('./pages/admin/AdminCourseContentPage'))
const AdminCourseSettingsPage = lazy(() => import('./pages/admin/AdminCourseSettingsPage'))
const StudentLoginPage = lazy(() => import('./pages/student/StudentLoginPage'))
const StudentProtectedRoute = lazy(() => import('./components/student/StudentProtectedRoute'))
const StudentDashboardPage = lazy(() => import('./pages/student/StudentDashboardPage'))
const StudentCoursePage = lazy(() => import('./pages/student/StudentCoursePage'))
const StudentLessonPage = lazy(() => import('./pages/student/StudentLessonPage'))
const StudentProgressPage = lazy(() => import('./pages/student/StudentProgressPage'))
const StudentProfilePage = lazy(() => import('./pages/student/StudentProfilePage'))

function RouteFallback() {
  return <div className="route-loading" role="status" aria-live="polite">Loading RizMern…</div>
}

function MobileLoadingScreen() {
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (!visible) return undefined

    const exitTimer = window.setTimeout(() => {
      setExiting(true)
    }, 1600)
    const removeTimer = window.setTimeout(() => {
      setVisible(false)
    }, 1900)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(removeTimer)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className={`mobile-loading-screen${exiting ? ' is-exiting' : ''}`} role="status" aria-live="polite">
      <img src={mobileLoadingImage} alt="RizMern is loading. Your journey to modern web and app development starts here." fetchPriority="high" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <StudentAuthProvider>
            <MobileLoadingScreen />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route element={<SiteLayout />}>
                  <Route index element={<Home />} />
                  <Route path="course" element={<CoursePage />} />
                  <Route path="curriculum" element={<CurriculumPage />} />
                  <Route path="pricing" element={<PricingPage />} />
                  <Route path="instructor" element={<InstructorPage />} />
                  <Route path="demo" element={<DemoPage />} />
                  <Route path="admission" element={<AdmissionPage />} />
                  <Route path="thank-you" element={<ThankYouPage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="blog/:slug" element={<BlogPostPage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="leads" element={<AdminLeadsPage />} />
                    <Route path="admissions" element={<AdminAdmissionsPage />} />
                    <Route path="students" element={<AdminStudentsPage />} />
                    <Route path="content" element={<AdminCourseContentPage />} />
                    <Route path="settings" element={<AdminCourseSettingsPage />} />
                    <Route path="projects" element={<AdminProjectsPage />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                  </Route>
                </Route>
                {/* Student Learning Portal Routes */}
                <Route path="/student/login" element={<StudentLoginPage />} />
                <Route element={<StudentProtectedRoute />}>
                  <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
                  <Route path="/student/dashboard" element={<StudentDashboardPage />} />
                  <Route path="/student/course" element={<StudentCoursePage />} />
                  <Route path="/student/course/lesson/:lessonId" element={<StudentLessonPage />} />
                  <Route path="/student/progress" element={<StudentProgressPage />} />
                  <Route path="/student/profile" element={<StudentProfilePage />} />
                </Route>
              </Routes>
            </Suspense>
          </StudentAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
