import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BookOpen, BriefcaseBusiness, GraduationCap, LayoutDashboard, LogOut, Menu, Settings, Users, UserRoundCheck, X } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import useAuth from '../context/useAuth'
import SEO from '../components/SEO'
import logo from '../assets/logo.png'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/leads', label: 'Demo Leads', icon: Users },
  { to: '/admin/admissions', label: 'Admissions', icon: UserRoundCheck },
  { to: '/admin/students', label: 'Students LMS', icon: GraduationCap },
  { to: '/admin/content', label: 'Course Syllabus', icon: BookOpen },
  { to: '/admin/settings', label: 'Course Config', icon: Settings },
  { to: '/admin/projects', label: 'Projects', icon: BriefcaseBusiness },
]

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="admin-shell">
      <SEO title="Admin Dashboard | RizMern" description="Private RizMern administration dashboard." path="/admin" noindex />
      <button
        className="admin-backdrop"
        type="button"
        aria-label="Close admin navigation"
        hidden={!drawerOpen}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`admin-sidebar${drawerOpen ? ' is-open' : ''}`} aria-label="Admin navigation">
        <div className="admin-brand"><img src={logo} alt="RizMern" className="brand-logo" /><button type="button" className="admin-close" aria-label="Close navigation" onClick={() => setDrawerOpen(false)}><X size={19} /></button></div>
        <div className="admin-sidebar-label">Workspace</div>
        <nav>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setDrawerOpen(false)} className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}>
              <Icon size={18} aria-hidden="true" /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button type="button" className="admin-nav-link admin-logout" onClick={() => logout()}>
          <LogOut size={18} aria-hidden="true" /><span>Logout</span>
        </button>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button type="button" className="admin-menu-button" aria-label="Open admin navigation" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}><Menu size={21} /></button>
          <span className="admin-topbar-title"><img src={logo} alt="RizMern" className="brand-logo brand-logo--topbar" /> Admin</span>
          <span className="admin-user-chip"><span className="admin-user-avatar">{admin?.name?.slice(0, 1)?.toUpperCase() || 'A'}</span>{admin?.name}</span>
        </header>
        <main className="admin-content"><Outlet /></main>
      </div>
      <Toaster position="top-right" toastOptions={{ style: { background: '#17182b', color: '#f4f5ff', border: '1px solid rgba(179,182,221,.18)' } }} />
    </div>
  )
}
