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
import TeachingSection from '../sections/TeachingSection'
import SEO from '../components/SEO'
import HomeSeoText from '../components/HomeSeoText'
import { homePageData } from '../data/siteData'

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
        title="MERN Stack & React Native Course with AI | RizMern"
        description="Learn MERN stack, React Native, and AI-assisted web development in a practical 3-month online course with Rizwan Ullah."
        path="/"
        structuredData={[faqSchema]}
      />
      <HeroSection />
      <StatsSection />
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
