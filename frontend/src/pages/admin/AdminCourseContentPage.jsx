import SEO from '../../components/SEO'
import CourseContentManagement from '../../components/admin/CourseContentManagement'

export default function AdminCourseContentPage() {
  return (
    <>
      <SEO title="Course Content | RizMern Admin" description="Manage course syllabus modules and lesson content." path="/admin/content" noindex />
      <CourseContentManagement />
    </>
  )
}
