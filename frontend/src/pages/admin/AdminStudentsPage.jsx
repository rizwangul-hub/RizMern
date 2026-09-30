import SEO from '../../components/SEO'
import StudentsManagement from '../../components/admin/StudentsManagement'

export default function AdminStudentsPage() {
  return (
    <>
      <SEO title="Students Management | RizMern Admin" description="Manage enrolled students and learning accounts." path="/admin/students" noindex />
      <StudentsManagement />
    </>
  )
}
