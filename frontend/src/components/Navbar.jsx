import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { navigationLinks } from '../data/siteData'
import useEscapeKey from '../hooks/useEscapeKey'
import Button from './Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  useEscapeKey(() => setIsOpen(false), isOpen)

  return (
    <header className="site-header">
      <nav className="navbar page-container" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="RizMern home">
          Riz<span>Mern</span><i>.</i>
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
        <Button to="/demo" className="nav-cta">
          Join Free Demo Class <ArrowUpRight size={15} />
        </Button>
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
            <Button to="/demo" onClick={() => setIsOpen(false)}>Join Free Demo Class <ArrowUpRight size={15} /></Button>
          </div>
      )}
    </header>
  )
}
