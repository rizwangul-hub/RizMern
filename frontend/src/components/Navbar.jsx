import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { navigationLinks } from '../data/siteData'
import useEscapeKey from '../hooks/useEscapeKey'
import Button from './Button'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  useEscapeKey(() => setIsOpen(false), isOpen)

  return (
    <header className="site-header">
      <nav className="navbar page-container" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="RizMern home">
          <img src={logo} alt="RizMern" className="brand-logo" />
        </Link>
        <div className="nav-links">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) => link.href.includes('#') ? '' : isActive ? 'active' : ''}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/student/login" className="student-portal-btn">
            🎓 Student Portal
          </Link>
          <Button to="/demo" className="nav-cta">
            Join Free Demo Class <ArrowUpRight size={15} />
          </Button>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {isOpen && (
          <div className="mobile-menu">
            {navigationLinks.map((link) => (
              <NavLink key={link.label} to={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/student/login" onClick={() => setIsOpen(false)} style={{ color: '#d8b4fe', fontWeight: 600 }}>
              🎓 Student Portal
            </NavLink>
            <Button to="/demo" onClick={() => setIsOpen(false)}>Join Free Demo Class <ArrowUpRight size={15} /></Button>
          </div>
      )}
    </header>
  )
}
