import { CirclePlay, CodeXml, ContactRound, MapPin, MessageCircle, Music2, Phone } from 'lucide-react'
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
            <img src={logo} alt="RizMern Software Company" className="brand-logo" />
          </Link>
          <p>
            RizMern is a premier software company based in Bahria Town, Lahore. We design and develop custom business software (Property Dealer CRM, Restaurant POS, Pizza Delivery, Expense Tracker), MERN stack web applications, mobile apps, and graphic designing.
          </p>
          <div className="social-links">
            {socialLinks.map((item) => (
              <a key={item.label} href={item.href} aria-label={item.label} {...externalLinkProps}>
                <SocialIcon name={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-nav">
          <h3>Services &amp; Software</h3>
          <Link to="/services/web-development">Web Development</Link>
          <Link to="/services/app-development">Mobile App Development</Link>
          <Link to="/services/graphic-design">Graphic Design &amp; Branding</Link>
          <Link to="/services/business-software">Custom Business Software</Link>
          <Link to="/solutions">Property, Food &amp; POS Systems</Link>
          <Link to="/projects">Projects Portfolio</Link>
        </div>

        <div className="footer-nav">
          <h3>Explore</h3>
          {navigationLinks.map((item) => (
            <Link key={item.label} to={item.href}>{item.label}</Link>
          ))}
          <Link to="/blog">Tech &amp; Business Blog</Link>
          <Link to="/student/login">🎓 Student Portal</Link>
        </div>

        <div className="footer-contact">
          <h3>Bahria Town, Lahore Office</h3>
          <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#cbd5e1' }}>
            <MapPin size={16} color="#c084fc" style={{ flexShrink: 0, marginTop: '3px' }} />
            <span>Bahria Town, Lahore, Punjab, Pakistan</span>
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
            <Phone size={15} color="#38bdf8" />
            <a href="tel:+923179500901" style={{ color: '#38bdf8' }}>+92 317 9500901</a>
          </p>
          <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
          <small style={{ color: '#94a3b8', display: 'block', marginTop: '8px' }}>
            Available Mon – Sat: 9:00 AM – 7:00 PM PKT
          </small>
        </div>
      </div>

      <div className="page-container footer-bottom">
        <span>&copy; {new Date().getFullYear()} {siteData.brand} Software Company. All Rights Reserved.</span>
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
