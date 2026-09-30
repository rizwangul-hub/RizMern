import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowUpRight, LoaderCircle, Mail, MessageCircle, Phone, UserRound } from 'lucide-react'
import { homePageData, siteData } from '../data/siteData'
import { createLead } from '../services/leadService'
import WhatsAppButton from './WhatsAppButton'

function normalizePakistaniPhone(value) {
  return value.trim().replace(/[\s-]/g, '')
}

function isPakistaniPhone(value) {
  return /^(03\d{9}|\+923\d{9})$/.test(normalizePakistaniPhone(value))
}

export default function DemoForm({ compact = false }) {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [requestError, setRequestError] = useState('')
  const demo = homePageData.demo

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading) return

    const form = event.currentTarget
    const formData = new FormData(form)
    if (formData.get('website')) return

    const payload = {
      name: String(formData.get('name') || '').trim(),
      phone: normalizePakistaniPhone(String(formData.get('phone') || '')),
      email: String(formData.get('email') || '').trim(),
    }
    const validation = {}
    if (!payload.name) validation.name = 'Enter your name.'
    if (!isPakistaniPhone(payload.phone)) validation.phone = 'Enter a Pakistani mobile number (03XXXXXXXXX or +923XXXXXXXXX).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) validation.email = 'Enter a valid email address.'

    setErrors(validation)
    setRequestError('')
    if (Object.keys(validation).length) {
      toast.error('Please check the form fields and try again.')
      return
    }

    setLoading(true)
    try {
      await createLead(payload)
      toast.success('You are registered for the free demo class.')
      navigate('/thank-you', { state: { type: 'demo' } })
    } catch (error) {
      if (error.status === 409 || /already registered/i.test(error.message)) {
        setRequestError('You are already registered. Check your WhatsApp or email for details.')
        toast.error('You are already registered for the demo class.')
      } else {
        setRequestError(`${error.message} Please retry your registration.`)
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} className={`hm-demo-form ${compact ? 'hm-demo-form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      <label>
        <span>{demo.fields.name}</span>
        <span className={`hm-input-wrap ${errors.name ? 'hm-input-wrap--error' : ''}`}><UserRound size={16} aria-hidden="true" /><input name="name" type="text" placeholder="Your name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby="demo-name-error" required /></span>
        {errors.name && <small className="hm-field-error" id="demo-name-error">{errors.name}</small>}
      </label>
      <label>
        <span>{demo.fields.phone}</span>
        <span className={`hm-input-wrap ${errors.phone ? 'hm-input-wrap--error' : ''}`}><Phone size={16} aria-hidden="true" /><input name="phone" type="tel" placeholder="03XXXXXXXXX or +923XXXXXXXXX" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby="demo-phone-error" required /></span>
        {errors.phone && <small className="hm-field-error" id="demo-phone-error">{errors.phone}</small>}
      </label>
      <label>
        <span>{demo.fields.email}</span>
        <span className={`hm-input-wrap ${errors.email ? 'hm-input-wrap--error' : ''}`}><Mail size={16} aria-hidden="true" /><input name="email" type="email" placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby="demo-email-error" required /></span>
        {errors.email && <small className="hm-field-error" id="demo-email-error">{errors.email}</small>}
      </label>
      <label className="form-honeypot" aria-hidden="true" tabIndex="-1">
        Website
        <input name="website" type="text" tabIndex="-1" autoComplete="off" />
      </label>
      <button className="button button--primary hm-demo-submit" type="submit" disabled={loading}>
        {loading ? <><LoaderCircle className="hm-spinner" size={16} /> Sending...</> : <>{demo.submitLabel} <ArrowUpRight size={16} /></>}
      </button>
      <p className="hm-form-note">No commitment—just a friendly introduction.</p>
      {requestError && (
        <div className="hm-form-error" role="alert">
          <p>{requestError}</p>
          {errorIsDuplicate(requestError)
            ? <WhatsAppButton mode="group" className="hm-inline-whatsapp"><MessageCircle size={14} /> {demo.groupLabel}</WhatsAppButton>
            : <button type="button" className="hm-retry-button" onClick={() => formRef.current?.requestSubmit()}>Retry registration</button>}
        </div>
      )}
      <span className="sr-only">Contact {siteData.email} if you need help registering.</span>
    </form>
  )
}

function errorIsDuplicate(message) {
  return /already registered/i.test(message)
}
