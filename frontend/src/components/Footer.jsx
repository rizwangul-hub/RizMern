import { CirclePlay, CodeXml, ContactRound, MessageCircle, Music2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navigationLinks, siteData, socialLinks } from '../data/siteData'
import { externalLinkProps } from '../utils/externalLinkProps'
import logo from '../assets/logo.png'

function SocialIcon({ name, size = 18 }) {
  if (name === 'linkedin') return <ContactRound size={size} />
  if (name === 'github') return <CodeXml size={size} />
  if (name === 'youtube') return <CirclePlay size={size} />
  if (name === 'tiktok') return <Music2 size={size} />
  return <MessageCircle size={size} />
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-main">
        <div className="footer-about">
          <Link className="brand" to="/">
            <img src={logo} alt="RizMern" className="brand-logo" />
          </Link>
          <p>Web development, mobile apps, graphic design, and custom business software. Based in Bahria Town, Lahore, Pakistan.</p>
          <div className="social-links">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.label} {...externalLinkProps}>
                <SocialIcon name={item.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-nav">
          <h3>Explore</h3>
          {navigationLinks.map((item) => (
            <Link key={item.label} to={item.href}>{item.label}</Link>
          ))}
          <Link to="/blog">Development blog</Link>
          <Link to="/student/login">Student portal</Link>
        </div>
        <div className="footer-contact">
          <h3>Let&apos;s build your next project</h3>
          <p>Have a business idea? We&apos;re one message away.</p>
          <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
        </div>
      </div>
      <div className="page-container footer-bottom">
        <span>&copy; {new Date().getFullYear()} {siteData.brand}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Bahria Town, Lahore, Pakistan</span>
          <Link to="/admin/login" style={{ color: '#64748b', fontSize: '11px', textDecoration: 'none' }} title="Admin Login">
            🔒 Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
