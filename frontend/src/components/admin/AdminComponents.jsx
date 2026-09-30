import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { statusLabels } from './statusLabels'

export function StatusBadge({ status }) {
  return <span className={`admin-status admin-status--${status}`}>{statusLabels[status] || status}</span>
}

export function Skeleton({ className = '' }) {
  return <span className={`admin-skeleton ${className}`} aria-hidden="true" />
}

export function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <article className="admin-stat-card">
      <span className="admin-stat-icon"><Icon size={19} aria-hidden="true" /></span>
      <span className="admin-stat-label">{label}</span>
      {loading ? <Skeleton className="admin-stat-skeleton" /> : <strong>{value ?? 0}</strong>}
    </article>
  )
}

export function SearchInput({ value, onChange, label = 'Search records' }) {
  return (
    <label className="admin-search">
      <Search size={17} aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search name, phone or email" />
    </label>
  )
}

export function Pagination({ page, pages, total, onPageChange }) {
  if (pages <= 1) return <div className="admin-pagination-summary">{total} {total === 1 ? 'record' : 'records'}</div>
  return (
    <nav className="admin-pagination" aria-label="Pagination">
      <span>{total} records · Page {page} of {pages}</span>
      <div>
        <button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeft size={17} /></button>
        <button type="button" aria-label="Next page" disabled={page >= pages} onClick={() => onPageChange(page + 1)}><ChevronRight size={17} /></button>
      </div>
    </nav>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="admin-empty-state">
      <span className="admin-empty-mark">—</span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

export function DataTable({ columns, rows, onSelect, rowActions }) {
  return (
    <>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}{rowActions && <th scope="col"><span className="sr-only">Actions</span></th>}</tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id} onClick={() => onSelect(row)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(row) } }}>
                {columns.map((column) => <td key={column.key} data-label={column.label}>{column.render ? column.render(row) : row[column.key]}</td>)}
                {rowActions && <td data-label="Actions" className="admin-row-actions" onClick={(event) => event.stopPropagation()}>{rowActions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-mobile-records">
        {rows.map((row) => (
          <article className="admin-record-card" key={row._id} onClick={() => onSelect(row)}>
            <div className="admin-record-card-top"><strong>{row.fullName || row.name}</strong>{rowActions?.(row)}</div>
            {columns.map((column) => (
              <div className="admin-record-field" key={column.key}>
                <span>{column.label}</span>
                <div onClick={(event) => event.stopPropagation()}>{column.render ? column.render(row) : row[column.key]}</div>
              </div>
            ))}
          </article>
        ))}
      </div>
    </>
  )
}

function useModalKeys(onClose, initialRef, active = true) {
  useEffect(() => {
    if (!active) return undefined
    const previous = document.activeElement
    initialRef?.current?.focus()
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const modal = initialRef?.current?.closest('[role="dialog"]')
      if (!modal) return
      const focusable = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex="0"]')]
      if (!focusable.length) return
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault()
        focusable.at(-1).focus()
      } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
        event.preventDefault()
        focusable[0].focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      previous?.focus?.()
    }
  }, [active, onClose, initialRef])
}

export function ConfirmModal({ title, message, confirmLabel = 'Confirm', danger = false, busy = false, onConfirm, onClose }) {
  const cancelRef = useRef(null)
  useModalKeys(onClose, cancelRef)
  return (
    <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="admin-modal admin-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title" aria-describedby="admin-confirm-message">
        <button className="admin-modal-close" type="button" aria-label="Close dialog" onClick={onClose}><X size={18} /></button>
        <p className="eyebrow">Please confirm</p>
        <h2 id="admin-confirm-title">{title}</h2>
        <p id="admin-confirm-message">{message}</p>
        <div className="admin-modal-actions">
          <button ref={cancelRef} className="admin-secondary-button" type="button" disabled={busy} onClick={onClose}>Cancel</button>
          <button className={`admin-primary-button${danger ? ' is-danger' : ''}`} type="button" disabled={busy} onClick={onConfirm}>{busy ? 'Working…' : confirmLabel}</button>
        </div>
      </section>
    </div>
  )
}

export function DetailModal({ title, children, onClose, active = true }) {
  const closeRef = useRef(null)
  useModalKeys(onClose, closeRef, active)
  return (
    <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="admin-modal admin-detail-modal" role="dialog" aria-modal="true" aria-labelledby="admin-detail-title">
        <button ref={closeRef} className="admin-modal-close" type="button" aria-label="Close details" onClick={onClose}><X size={18} /></button>
        <p className="eyebrow">Record details</p>
        <h2 id="admin-detail-title">{title}</h2>
        {children}
      </section>
    </div>
  )
}
