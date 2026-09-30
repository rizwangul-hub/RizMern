import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import mobileLoadingImage from './assets/mobile.png'
import SiteLayout from './layouts/SiteLayout'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const CoursePage = lazy(() => import('./pages/CoursePage'))
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
          <MobileLoadingScreen />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route index element={<Home />} />
                <Route path="course" element={<CoursePage />} />
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
                  <Route path="projects" element={<AdminProjectsPage />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
