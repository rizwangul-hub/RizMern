import DemoSection from '../sections/DemoSection'
import FAQSection from '../sections/FAQSection'
import FinalCTASection from '../sections/FinalCTASection'
import HeroSection from '../sections/HeroSection'
import InstructorSection from '../sections/InstructorSection'
import JourneySection from '../sections/JourneySection'
import LearnSection from '../sections/LearnSection'
import ProjectsSection from '../sections/ProjectsSection'
import PortfolioSection from '../sections/PortfolioSection'
import StatsSection from '../sections/StatsSection'
import ScrollLaptopSection from '../components/three/ScrollLaptopSection'
import GlobeSection from '../components/three/GlobeSection'
import TeachingSection from '../sections/TeachingSection'
import SEO from '../components/SEO'
import HomeSeoText from '../components/HomeSeoText'
import { homePageData, siteData } from '../data/siteData'

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Full Stack Web Development Course in Pakistan with AI',
  description: 'Learn MERN stack, React Native, and AI-assisted development in Pakistan in a practical 3-month online course with Rizwan Ullah.',
  provider: {
    '@type': 'EducationalOrganization',
    name: siteData.brand,
    url: `${siteData.siteUrl}/`,
  },
  educationalCredentialAwarded: 'Course Completion Certificate & Portfolio',
  timeRequired: 'P3M',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'P3M',
    duration: 'P3M',
    location: { '@type': 'VirtualLocation', url: `${siteData.siteUrl}/demo` },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homePageData.faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function Home() {
  return (
    <>
      <SEO
        title="Full Stack Web Development Course in Pakistan | RizMern"
        description="Master full stack web development in Pakistan with our 3-month online course. Learn MERN Stack, React Native, and AI-assisted development through practical live projects."
        path="/"
        structuredData={[courseSchema, faqSchema]}
      />
      <HeroSection />
      <StatsSection />
      <GlobeSection />
      <ScrollLaptopSection />
      <LearnSection />
      <TeachingSection />
      <ProjectsSection />
      <PortfolioSection />
      <JourneySection />
      <InstructorSection />
      <DemoSection />
      <FAQSection />
      <HomeSeoText />
      <FinalCTASection />
    </>
  )
}
