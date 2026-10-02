import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Download, ExternalLink, Mail, Phone, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import SEO from '../../components/SEO'
import { ConfirmModal, DataTable, DetailModal, EmptyState, Pagination, SearchInput, Skeleton } from '../../components/admin/AdminComponents'
import { deleteAdminRecord, getAdminRecords, getAllAdminRecords, updateAdminRecord } from '../../services/adminService'

const leadStatuses = ['new', 'contacted', 'joined_demo', 'not_interested']
const admissionStatuses = ['pending', 'confirmed', 'rejected']
const pageConfigs = {
  leads: {
    title: 'Demo leads',
    eyebrow: 'Registrations',
    description: 'Review and follow up with learners registered for a demo class.',
    nameKey: 'name',
    statuses: leadStatuses,
    columns: ['name', 'phone', 'preferredDay', 'preferredTime', 'status', 'createdAt'],
    detailFields: [['Phone', 'phone'], ['Email', 'email'], ['Free day', 'preferredDay'], ['Free time', 'preferredTime'], ['Source', 'source'], ['Registered', 'createdAt']],
    filePrefix: 'rizmern-demo-leads',
  },
  admissions: {
    title: 'Admissions',
    eyebrow: 'Course applications',
    description: 'Review course applications and coordinate admission follow-up.',
    nameKey: 'fullName',
    statuses: admissionStatuses,
    columns: ['fullName', 'phone', 'city', 'paymentPlan', 'status', 'createdAt'],
    detailFields: [['Phone', 'phone'], ['Email', 'email'], ['City', 'city'], ['Education', 'education'], ['Preferred batch', 'preferredBatch'], ['Payment plan', 'paymentPlan'], ['Course', 'courseName'], ['Message', 'message'], ['Submitted', 'createdAt']],
    filePrefix: 'rizmern-admissions',
  },
}

function formatDate(date) {
  if (!date) return '—'
  const parsed = new Date(date)
  return Number.isNaN(parsed.getTime()) ? '—' : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(parsed)
}

function phoneLink(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.startsWith('0')) return `92${digits.slice(1)}`
  if (digits.startsWith('92')) return digits
  return digits
}

function whatsappUrl(record, nameKey) {
  const number = phoneLink(record.phone)
  const name = record[nameKey] || 'there'
  if (nameKey === 'name') {
    const timeInfo = record.preferredDay || record.preferredTime ? ` (Free: ${record.preferredDay || 'Flexible'}, ${record.preferredTime || 'Flexible'})` : ''
    return `https://wa.me/${number}?text=${encodeURIComponent(`Hello ${name}, this is Rizwan from RizMern regarding your demo class registration${timeInfo}.`)}`
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(`Hello ${name}, this is RizMern regarding your course admission request.`)}`
}

function escapeCsv(value) {
  const text = String(value ?? '').replaceAll('"', '""')
  return `"${text}"`
}

function downloadCsv(records, type) {
  const columns = type === 'leads'
    ? [['Name', 'name'], ['Phone', 'phone'], ['Email', 'email'], ['Free Day', 'preferredDay'], ['Free Time', 'preferredTime'], ['Status', 'status'], ['Date', 'createdAt'], ['Notes', 'notes']]
    : [['Full Name', 'fullName'], ['Phone', 'phone'], ['Email', 'email'], ['City', 'city'], ['Payment Plan', 'paymentPlan'], ['Status', 'status'], ['Date', 'createdAt'], ['Notes', 'notes']]
  const csv = [columns.map(([label]) => escapeCsv(label)).join(','), ...records.map((record) => columns.map(([, key]) => escapeCsv(key === 'createdAt' ? formatDate(record[key]) : record[key])).join(','))].join('\r\n')
  const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${pageConfigs[type].filePrefix}-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function QuickActions({ record, nameKey }) {
  const phone = String(record.phone || '').replace(/[^\d+]/g, '')
  return (
    <div className="admin-quick-actions" onClick={(event) => event.stopPropagation()}>
      <a href={whatsappUrl(record, nameKey)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${record[nameKey]}`} title="WhatsApp"><ExternalLink size={15} /></a>
      <a href={`tel:${phone}`} aria-label={`Call ${record[nameKey]}`} title="Call"><Phone size={15} /></a>
      <a href={`mailto:${record.email || ''}`} aria-label={`Email ${record[nameKey]}`} title="Email"><Mail size={15} /></a>
    </div>
  )
}

export default function AdminRecordsPage({ type }) {
  const config = pageConfigs[type]
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [records, setRecords] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [detailStatus, setDetailStatus] = useState('')
  const [detailNotes, setDetailNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirm, setConfirm] = useState(null)
  const [confirmBusy, setConfirmBusy] = useState(false)
  const requestId = useRef(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300)
    return () => window.clearTimeout(timer)
  }, [search])

  const loadRecords = useCallback(async () => {
    const currentRequest = ++requestId.current
    setLoading(true)
    setError('')
    try {
      const result = await getAdminRecords(type, { page, limit: 10, search: debouncedSearch || undefined, status: status || undefined })
      if (requestId.current !== currentRequest) return
      setRecords(result.items)
      setPagination(result.pagination)
    } catch (requestError) {
      if (requestId.current !== currentRequest) return
      setError(requestError.message)
    } finally {
      if (requestId.current === currentRequest) setLoading(false)
    }
  }, [debouncedSearch, page, status, type])

  useEffect(() => {
    const request = window.setTimeout(loadRecords, 0)
    return () => window.clearTimeout(request)
  }, [loadRecords])

  function showDetails(record) {
    setSelected(record)
    setDetailStatus(record.status)
    setDetailNotes(record.notes || '')
  }

  const closeDetails = useCallback(() => setSelected(null), [])
  const closeConfirm = useCallback(() => { if (!confirmBusy) setConfirm(null) }, [confirmBusy])

  const saveChanges = useCallback(async (record, updates) => {
    setBusy(true)
    try {
      const updated = await updateAdminRecord(type, record._id, updates)
      setRecords((current) => current.map((item) => item._id === updated._id ? updated : item))
      setSelected(null)
      toast.success(type === 'leads' ? 'Lead updated.' : 'Admission updated.')
      await loadRecords()
    } catch (requestError) {
      toast.error(requestError.message)
    } finally {
      setBusy(false)
    }
  }, [loadRecords, type])

  function handleDetailSave(event) {
    event.preventDefault()
    if (!selected) return
    const updates = { notes: detailNotes }
    if (detailStatus !== selected.status) updates.status = detailStatus
    const confirmChange = type === 'admissions' && detailStatus !== selected.status && ['confirmed', 'rejected'].includes(detailStatus)
    if (confirmChange) {
      setConfirm({
        title: `Set admission to ${detailStatus}?`,
        message: `This will mark ${selected.fullName} as ${detailStatus}. Continue?`,
        confirmLabel: 'Update status',
        onConfirm: () => saveChanges(selected, updates),
      })
      return
    }
    saveChanges(selected, updates)
  }

  const handleInlineStatus = useCallback((record, nextStatus) => {
    if (nextStatus === record.status) return
    const update = () => saveChanges(record, { status: nextStatus })
    if (type === 'admissions' && ['confirmed', 'rejected'].includes(nextStatus)) {
      setConfirm({
        title: `Set admission to ${nextStatus}?`,
        message: `This will mark ${record.fullName} as ${nextStatus}. Continue?`,
        confirmLabel: 'Update status',
        onConfirm: update,
      })
    } else update()
  }, [saveChanges, type])

  const confirmDelete = useCallback((record) => {
    setConfirm({
      title: 'Delete this record?',
      message: `This permanently deletes ${record[config.nameKey]} and cannot be undone.`,
      confirmLabel: 'Delete record',
      danger: true,
      onConfirm: async () => {
        try {
          await deleteAdminRecord(type, record._id)
          if (selected?._id === record._id) setSelected(null)
          toast.success('Record deleted.')
          await loadRecords()
        } catch (requestError) { toast.error(requestError.message) }
      },
    })
  }, [config.nameKey, loadRecords, selected, type])

  async function handleConfirm() {
    if (!confirm?.onConfirm) return
    setConfirmBusy(true)
    try {
      await confirm.onConfirm()
      setConfirm(null)
    } finally {
      setConfirmBusy(false)
    }
  }

  async function exportRecords() {
    try {
      const all = await getAllAdminRecords(type, { search: debouncedSearch || undefined, status: status || undefined })
      downloadCsv(all, type)
      toast.success(`Exported ${all.length} ${all.length === 1 ? 'record' : 'records'}.`)
    } catch (requestError) { toast.error(requestError.message) }
  }

  const columns = useMemo(() => config.columns.map((key) => {
    const labels = {
      name: 'Name',
      fullName: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      preferredDay: 'Free Day',
      preferredTime: 'Free Time',
      city: 'City',
      paymentPlan: 'Payment Plan',
      status: 'Status',
      createdAt: 'Date',
    }
    return {
      key,
      label: labels[key],
      render: (record) => {
        if (key === 'status') return (
          <select
            className="admin-status-select"
            aria-label={`Change status for ${record[config.nameKey]}`}
            value={record.status}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => handleInlineStatus(record, event.target.value)}
          >
            {config.statuses.map((value) => <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>)}
          </select>
        )
        if (key === 'createdAt') return formatDate(record.createdAt)
        if (key === 'paymentPlan') return record.paymentPlan === 'installment' ? 'Installment' : 'Full payment'
        return record[key] || '—'
      },
    }
  }), [config.columns, config.nameKey, config.statuses, handleInlineStatus])

  const rowActions = useCallback((record) => (
    <div className="admin-actions-cell">
      <QuickActions record={record} nameKey={config.nameKey} />
      <button type="button" className="admin-delete-button" aria-label={`Delete ${record[config.nameKey]}`} title="Delete record" onClick={(event) => { event.stopPropagation(); confirmDelete(record) }}><Trash2 size={15} /></button>
    </div>
  ), [config.nameKey, confirmDelete])

  return (
    <div className="admin-page">
      <SEO title={`${config.title} | RizMern Admin`} description={`Manage RizMern ${config.title.toLowerCase()}.`} path={`/admin/${type}`} noindex />
      <div className="admin-page-heading">
        <div><p className="eyebrow">{config.eyebrow}</p><h1>{config.title}</h1><p>{config.description}</p></div>
        <button type="button" className="admin-secondary-button" onClick={exportRecords} disabled={loading}><Download size={16} />Export CSV</button>
      </div>
      <section className="admin-panel admin-records-panel" aria-label={`${config.title} list`}>
        <div className="admin-record-toolbar">
          <SearchInput value={search} onChange={(value) => { setSearch(value); setPage(1) }} label={`Search ${config.title}`} />
          <label className="admin-filter-label">Status
            <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1) }}>
              <option value="">All statuses</option>
              {config.statuses.map((value) => <option value={value} key={value}>{value.replaceAll('_', ' ')}</option>)}
            </select>
          </label>
        </div>
        {loading ? (
          <div className="admin-list-loading" role="status" aria-label={`Loading ${config.title}`}>
            <div className="admin-table-skeleton">{[1, 2, 3, 4, 5].map((item) => <Skeleton key={item} />)}</div>
            <div className="admin-mobile-skeleton">{[1, 2, 3].map((item) => <Skeleton key={item} className="admin-card-skeleton" />)}</div>
          </div>
        ) : error ? (
          <div className="admin-error-state" role="alert"><h2>Could not load {config.title.toLowerCase()}</h2><p>{error}</p><button type="button" className="admin-primary-button" onClick={loadRecords}>Try again</button></div>
        ) : records.length ? (
          <>
            <DataTable columns={columns} rows={records} onSelect={showDetails} rowActions={rowActions} />
            <Pagination page={pagination.page} pages={pagination.pages} total={pagination.total} onPageChange={setPage} />
          </>
        ) : (
          <EmptyState title={search || status ? 'No matching records' : `No ${config.title.toLowerCase()} yet`} description={search || status ? 'Try adjusting your search or status filter.' : 'New records will show up here when they arrive.'} />
        )}
      </section>
      {selected && (
        <DetailModal title={selected[config.nameKey]} onClose={closeDetails} active={!confirm}>
          <div className="admin-detail-quick"><QuickActions record={selected} nameKey={config.nameKey} /></div>
          <dl className="admin-detail-fields">
            {config.detailFields.map(([label, key]) => <div key={key}><dt>{label}</dt><dd>{key === 'createdAt' ? formatDate(selected[key]) : selected[key] || '—'}</dd></div>)}
          </dl>
          <form className="admin-detail-form" onSubmit={handleDetailSave}>
            <label htmlFor="admin-record-status">Status</label>
            <select id="admin-record-status" value={detailStatus} onChange={(event) => setDetailStatus(event.target.value)}>
              {config.statuses.map((value) => <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>)}
            </select>
            <label htmlFor="admin-record-notes">Internal notes</label>
            <textarea id="admin-record-notes" rows="4" maxLength="2000" value={detailNotes} onChange={(event) => setDetailNotes(event.target.value)} placeholder="Add follow-up notes…" />
            <div className="admin-detail-actions">
              <button type="button" className="admin-secondary-button" onClick={() => confirmDelete(selected)}><Trash2 size={15} />Delete</button>
              <button type="submit" className="admin-primary-button" disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button>
            </div>
          </form>
        </DetailModal>
      )}
      {confirm && <ConfirmModal {...confirm} onConfirm={handleConfirm} onClose={closeConfirm} busy={confirmBusy} />}
    </div>
  )
}
