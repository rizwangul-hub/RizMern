import CourseAISection from '../sections/CourseAISection'
import BuildWithAi from '../components/BuildWithAi'
import CourseFinalCTASection from '../sections/CourseFinalCTASection'
import CourseHeroSection from '../sections/CourseHeroSection'
import CourseInclusionsSection from '../sections/CourseInclusionsSection'
import CourseOverviewSection from '../sections/CourseOverviewSection'
import CourseProjectsSection from '../sections/CourseProjectsSection'
import CourseRoadmapSection from '../sections/CourseRoadmapSection'
import CourseScheduleSection from '../sections/CourseScheduleSection'
import CourseTechnologiesSection from '../sections/CourseTechnologiesSection'
import SEO from '../components/SEO'
import HomeSeoText from '../components/HomeSeoText'
import { coursePageData, siteData } from '../data/siteData'

const price = Number(siteData.price.replace(/[^\d.]/g, ''))
const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: siteData.courseName,
  description: coursePageData.heroDescription,
  provider: {
    '@type': 'EducationalOrganization',
    name: siteData.brand,
    url: `${siteData.siteUrl}/`,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'P3M',
    duration: 'P3M',
    location: { '@type': 'VirtualLocation', url: `${siteData.siteUrl}/demo` },
  },
  ...(Number.isFinite(price) && price > 0 ? {
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'PKR',
      url: `${siteData.siteUrl}/admission`,
    },
  } : {}),
}

export default function CoursePage() {
  return (
    <>
      <SEO
        title="3 Month Online Web Development Course | RizMern"
        description="Join our comprehensive 3-month online MERN stack and React Native course with AI in Pakistan. Build full-stack web and mobile apps with live instructor guidance."
        path="/course"
        structuredData={[courseSchema]}
      />
      <CourseHeroSection />
      <CourseOverviewSection />
      <CourseRoadmapSection />
      <CourseTechnologiesSection />
      <CourseAISection />
      <BuildWithAi />
      <CourseProjectsSection />
      <CourseInclusionsSection />
      <CourseScheduleSection />
      <HomeSeoText course />
      <CourseFinalCTASection />
    </>
  )
}
