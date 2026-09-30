import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminLeadsPage = lazy(() => import('./pages/admin/AdminLeadsPage'))
const AdminAdmissionsPage = lazy(() => import('./pages/admin/AdminAdmissionsPage'))

function RouteFallback() {
  return <div className="route-loading" role="status" aria-live="polite">Loading RizMern…</div>
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
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
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="leads" element={<AdminLeadsPage />} />
                  <Route path="admissions" element={<AdminAdmissionsPage />} />
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
