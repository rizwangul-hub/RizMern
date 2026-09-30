import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, ArrowUpRight, Check, Clock3, LoaderCircle, Mail, MapPin, MessageSquareText, Phone, UserRound } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import SEO from '../components/SEO'
import ScrollReveal from '../components/ScrollReveal'
import { admissionFormData, siteData } from '../data/siteData'
import { createAdmission } from '../services/admissionService'

function isPakistaniPhone(value) {
  const phone = value.trim().replace(/[\s-]/g, '')
  return /^(03\d{9}|\+923\d{9})$/.test(phone)
}

export default function AdmissionPage() {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [requestError, setRequestError] = useState('')
  const [paymentPlan, setPaymentPlan] = useState('full')
  const config = admissionFormData

  async function handleSubmit(event) {
    event.preventDefault()
    if (loading) return
    const form = event.currentTarget
    const values = new FormData(form)
    if (values.get('website')) return

    const payload = {
      fullName: String(values.get('fullName') || '').trim(),
      phone: String(values.get('phone') || '').trim().replace(/[\s-]/g, ''),
      email: String(values.get('email') || '').trim(),
      city: String(values.get('city') || '').trim(),
      education: String(values.get('education') || '').trim(),
      preferredBatch: String(values.get('preferredBatch') || '').trim(),
      paymentPlan,
      message: String(values.get('message') || '').trim(),
      courseName: siteData.courseName,
    }
    const validation = {}
    if (!payload.fullName) validation.fullName = 'Enter your full name.'
    if (!isPakistaniPhone(payload.phone)) validation.phone = 'Enter a Pakistani mobile number (03XXXXXXXXX or +923XXXXXXXXX).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) validation.email = 'Enter a valid email address.'
    if (!payload.city) validation.city = 'Enter your city.'

    setErrors(validation)
    setRequestError('')
    if (Object.keys(validation).length) {
      toast.error('Please check the required fields.')
      return
    }

    setLoading(true)
    try {
      await createAdmission(payload)
      toast.success('Your admission request has been received.')
      navigate('/thank-you', { state: { type: 'admission' } })
    } catch (error) {
      setRequestError(`${error.message} Please review your details and retry.`)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO
        title="Apply for MERN Course Admission | RizMern"
        description="Apply for the RizMern online MERN Stack and React Native course. Share your details to discuss the next admission steps."
        path="/admission"
      />
      <section className="admission-page page-container" aria-labelledby="admission-page-title">
        <Link to="/pricing" className="back-link"><ArrowLeft size={15} /> Course fee and details</Link>
        <ScrollReveal className="form-page-heading admission-heading">
          <span className="eyebrow">YOUR NEXT STEP</span>
          <h1 id="admission-page-title">{config.title}</h1>
          <p>{config.description}</p>
        </ScrollReveal>
        <div className="admission-layout">
          <ScrollReveal>
            <GlassCard className="admission-course-summary">
              <span className="eyebrow">COURSE SUMMARY</span>
              <h2>{siteData.courseName}</h2>
              <div className="admission-summary-line"><Clock3 size={16} />{siteData.duration}</div>
              <div className="admission-summary-price">{siteData.price}<small> one-time fee</small></div>
              <p>Fee and payment details will be confirmed before admission.</p>
            </GlassCard>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <GlassCard className="admission-form-card">
              <form ref={formRef} className="admission-form" onSubmit={handleSubmit} noValidate>
                <div className="admission-fields-grid">
                  <label className="admission-field">
                    <span>{config.fields.fullName}</span>
                    <span className={`hm-input-wrap ${errors.fullName ? 'hm-input-wrap--error' : ''}`}><UserRound size={16} /><input name="fullName" autoComplete="name" placeholder="Your full name" aria-invalid={Boolean(errors.fullName)} aria-describedby="admission-name-error" required /></span>
                    {errors.fullName && <small className="hm-field-error" id="admission-name-error">{errors.fullName}</small>}
                  </label>
                  <label className="admission-field">
                    <span>{config.fields.phone}</span>
                    <span className={`hm-input-wrap ${errors.phone ? 'hm-input-wrap--error' : ''}`}><Phone size={16} /><input name="phone" type="tel" autoComplete="tel" placeholder="03XXXXXXXXX or +923XXXXXXXXX" aria-invalid={Boolean(errors.phone)} aria-describedby="admission-phone-error" required /></span>
                    {errors.phone && <small className="hm-field-error" id="admission-phone-error">{errors.phone}</small>}
                  </label>
                  <label className="admission-field">
                    <span>{config.fields.email}</span>
                    <span className={`hm-input-wrap ${errors.email ? 'hm-input-wrap--error' : ''}`}><Mail size={16} /><input name="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby="admission-email-error" required /></span>
                    {errors.email && <small className="hm-field-error" id="admission-email-error">{errors.email}</small>}
                  </label>
                  <label className="admission-field">
                    <span>{config.fields.city}</span>
                    <span className={`hm-input-wrap ${errors.city ? 'hm-input-wrap--error' : ''}`}><MapPin size={16} /><input name="city" autoComplete="address-level2" placeholder="Your city" aria-invalid={Boolean(errors.city)} aria-describedby="admission-city-error" required /></span>
                    {errors.city && <small className="hm-field-error" id="admission-city-error">{errors.city}</small>}
                  </label>
                  <label className="admission-field">
                    <span>{config.fields.education}</span>
                    <span className="hm-input-wrap"><UserRound size={16} /><input name="education" placeholder="Your education" /></span>
                  </label>
                  <label className="admission-field">
                    <span>{config.fields.preferredBatch}</span>
                    <span className="hm-input-wrap"><Clock3 size={16} /><input name="preferredBatch" placeholder="TBA" /></span>
                  </label>
                </div>
                <fieldset className="payment-plan-fieldset">
                  <legend>{config.fields.paymentPlan}</legend>
                  <div className="payment-plan-options">
                    {config.paymentPlans.map((plan) => (
                      <label className={`payment-plan-option ${paymentPlan === plan.value ? 'payment-plan-option--selected' : ''}`} key={plan.value}>
                        <input type="radio" name="paymentPlan" value={plan.value} checked={paymentPlan === plan.value} onChange={() => setPaymentPlan(plan.value)} />
                        <span className="payment-plan-radio" />
                        <span><b>{plan.label}</b><small>{plan.description}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className="admission-field">
                  <span>{config.fields.message}</span>
                  <span className="hm-input-wrap admission-message-wrap"><MessageSquareText size={16} /><textarea name="message" rows="3" placeholder="Anything you would like us to know?" /></span>
                </label>
                <label className="form-honeypot" aria-hidden="true" tabIndex="-1">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
                {requestError && <div className="admission-request-error" role="alert"><p>{requestError}</p><button type="button" onClick={() => formRef.current?.requestSubmit()}>Retry request</button></div>}
                <button className="button button--primary admission-submit" type="submit" disabled={loading}>
                  {loading ? <><LoaderCircle className="hm-spinner" size={16} /> Sending request...</> : <>{config.submitLabel} <ArrowUpRight size={16} /></>}
                </button>
                <p className="admission-privacy-note"><Check size={13} /> Your details are only used to follow up about this course.</p>
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
