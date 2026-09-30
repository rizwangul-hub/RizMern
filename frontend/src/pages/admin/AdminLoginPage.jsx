import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, LogIn } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../../components/Button'
import SEO from '../../components/SEO'
import useAuth from '../../context/useAuth'
import logo from '../../assets/logo.png'

export default function AdminLoginPage() {
  const { admin, loading, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (loading) return <div className="admin-loading" role="status">Verifying admin session…</div>
  if (admin) return <Navigate to="/admin" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login({ email, password })
      toast.success('Welcome back.')
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="admin-login-page">
      <SEO title="Admin Login | RizMern" description="Private sign-in for RizMern administrators." path="/admin/login" noindex />
      <section className="admin-login-card" aria-labelledby="admin-login-heading">
        <a className="admin-brand admin-login-brand" href="/"><img src={logo} alt="RizMern" className="brand-logo" /></a>
        <div className="admin-login-icon"><LockKeyhole size={23} /></div>
        <p className="eyebrow">Secure workspace</p>
        <h1 id="admin-login-heading">Admin login</h1>
        <p className="admin-login-intro">Sign in to manage demo registrations and course admissions.</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label htmlFor="admin-email">Email address</label>
          <input id="admin-email" type="email" autoComplete="username" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="admin-password">Password</label>
          <div className="admin-password-wrap">
            <input id="admin-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <Button type="submit" disabled={submitting} className="admin-login-submit">
            {submitting ? <><span className="admin-spinner" aria-hidden="true" />Signing in…</> : <>Sign in <LogIn size={16} /></>}
          </Button>
        </form>
        <a className="admin-back-home" href="/">← Back to RizMern website</a>
      </section>
    </main>
  )
}
