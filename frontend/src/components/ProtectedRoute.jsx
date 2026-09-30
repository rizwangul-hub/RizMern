import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../context/useAuth'

export default function ProtectedRoute() {
  const { admin, loading } = useAuth()
  if (loading) return <div className="admin-loading" role="status">Verifying admin session…</div>
  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />
}
