import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock3, Users, UserRoundCheck, UserRoundPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import AnimatedCounter from '../../components/AnimatedCounter'
import SEO from '../../components/SEO'
import { EmptyState, Skeleton, StatusBadge } from '../../components/admin/AdminComponents'
import { getAdminRecords, getDashboardStats } from '../../services/adminService'

const statCards = [
  { key: 'totalLeads', label: 'Total leads', icon: Users },
  { key: 'leadsToday', label: 'Leads today', icon: UserRoundPlus },
  { key: 'totalAdmissions', label: 'Total admissions', icon: UserRoundCheck },
  { key: 'pendingAdmissions', label: 'Pending admissions', icon: Clock3 },
  { key: 'confirmedAdmissions', label: 'Confirmed admissions', icon: CheckCircle2 },
]

function formatDate(date) {
  return date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(date)) : '—'
}

function RecentList({ title, to, records, nameKey, loading, error, onRetry }) {
  return (
    <section className="admin-panel admin-recent-panel">
      <div className="admin-panel-heading">
        <div><h2>{title}</h2><p>Latest registrations</p></div>
        <Link to={to} className="admin-view-link">View all <ArrowRight size={15} /></Link>
      </div>
      {loading ? (
        <div className="admin-recent-skeletons">{[1, 2, 3, 4, 5].map((item) => <Skeleton key={item} className="admin-row-skeleton" />)}</div>
      ) : error ? (
        <div className="admin-inline-error" role="alert">{error}<button type="button" onClick={onRetry}>Retry</button></div>
      ) : records.length ? (
        <ul className="admin-recent-list">
          {records.map((record) => (
            <li key={record._id}>
              <span className="admin-recent-avatar" aria-hidden="true">{record[nameKey]?.slice(0, 1)?.toUpperCase() || '?'}</span>
              <span className="admin-recent-main"><strong>{record[nameKey]}</strong><small>{record.email} · {formatDate(record.createdAt)}</small></span>
              <StatusBadge status={record.status} />
            </li>
          ))}
        </ul>
      ) : <EmptyState title="No records yet" description="New registrations will appear here." />}
    </section>
  )
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [leads, setLeads] = useState([])
  const [admissions, setAdmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [listLoading, setListLoading] = useState(true)
  const [statsError, setStatsError] = useState('')
  const [leadsError, setLeadsError] = useState('')
  const [admissionsError, setAdmissionsError] = useState('')

  const loadStats = useCallback(async () => {
    setLoading(true)
    setStatsError('')
    try { setStats(await getDashboardStats()) } catch (error) { setStatsError(error.message); toast.error(error.message) } finally { setLoading(false) }
  }, [])

  const loadRecent = useCallback(async () => {
    setListLoading(true)
    setLeadsError('')
    setAdmissionsError('')
    const results = await Promise.allSettled([
      getAdminRecords('leads', { page: 1, limit: 5 }),
      getAdminRecords('admissions', { page: 1, limit: 5 }),
    ])
    if (results[0].status === 'fulfilled') setLeads(results[0].value.items)
    else { setLeadsError(results[0].reason.message); toast.error(results[0].reason.message) }
    if (results[1].status === 'fulfilled') setAdmissions(results[1].value.items)
    else { setAdmissionsError(results[1].reason.message); toast.error(results[1].reason.message) }
    setListLoading(false)
  }, [])

  useEffect(() => {
    const request = window.setTimeout(() => { loadStats(); loadRecent() }, 0)
    return () => window.clearTimeout(request)
  }, [loadStats, loadRecent])

  return (
    <div className="admin-page">
      <SEO title="Dashboard | RizMern Admin" description="Private RizMern administration dashboard." path="/admin" noindex />
      <div className="admin-page-heading">
        <div><p className="eyebrow">Overview</p><h1>Dashboard</h1><p>Keep up with course registrations and admissions.</p></div>
        <button type="button" className="admin-secondary-button" onClick={() => { loadStats(); loadRecent() }}>Refresh data</button>
      </div>
      {statsError && <div className="admin-error-banner" role="alert">{statsError}<button type="button" onClick={loadStats}>Retry</button></div>}
      <div className="admin-stats-grid">
        {statCards.map(({ key, label, icon: Icon }) => (
          <article key={key} className="admin-stat-card">
            <span className="admin-stat-icon"><Icon size={19} aria-hidden="true" /></span>
            <span className="admin-stat-label">{label}</span>
            {loading ? <Skeleton className="admin-stat-skeleton" /> : <AnimatedCounter value={Number(stats?.[key] || 0)} label="" />}
          </article>
        ))}
      </div>
      <div className="admin-recent-grid">
        <RecentList title="Recent demo leads" to="/admin/leads" records={leads} nameKey="name" loading={listLoading} error={leadsError} onRetry={loadRecent} />
        <RecentList title="Recent admissions" to="/admin/admissions" records={admissions} nameKey="fullName" loading={listLoading} error={admissionsError} onRetry={loadRecent} />
      </div>
    </div>
  )
}
