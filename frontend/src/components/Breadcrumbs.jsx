import { ChevronRight, Home } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs({ label }) {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)
  if (!parts.length || pathname === '/thank-you' || pathname.startsWith('/admin')) return null
  const entries = [{ name: 'Home', to: '/' }]
  let path = ''
  for (const [index, part] of parts.entries()) {
    path += `/${part}`
    entries.push({
      name: index === parts.length - 1 && label
        ? label
        : part.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
      to: path,
    })
  }

  return (
    <nav className="breadcrumbs page-container" aria-label="Breadcrumb">
      <ol>
        {entries.map((entry, index) => (
          <li key={entry.to}>
            {index > 0 && <ChevronRight size={12} aria-hidden="true" />}
            {index === 0 && <Home size={12} aria-hidden="true" />}
            {index === entries.length - 1
              ? <span aria-current="page">{entry.name}</span>
              : <Link to={entry.to}>{entry.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
