import SEO from '../../components/SEO'
import CourseSettingsForm from '../../components/admin/CourseSettingsForm'

export default function AdminCourseSettingsPage() {
  return (
    <>
      <SEO title="Course Settings | RizMern Admin" description="Configure live course parameters, fee, and demo class schedule." path="/admin/settings" noindex />
      <CourseSettingsForm />
    </>
  )
}
