import SEO from '../components/SEO'
import InstructorBioSection from '../sections/InstructorBioSection'
import InstructorCTASection from '../sections/InstructorCTASection'
import InstructorHeroSection from '../sections/InstructorHeroSection'
import InstructorJourneySection from '../sections/InstructorJourneySection'
import InstructorSkillsSection from '../sections/InstructorSkillsSection'
import SkillsMatrix from '../components/SkillsMatrix'
import InstructorTeachingSection from '../sections/InstructorTeachingSection'
import { siteData, socialLinks } from '../data/siteData'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteData.instructor,
  jobTitle: siteData.instructorTitle,
  url: `${siteData.siteUrl}/instructor`,
  worksFor: {
    '@type': 'EducationalOrganization',
    name: siteData.brand,
    url: `${siteData.siteUrl}/`,
  },
  sameAs: socialLinks.filter(({ icon }) => ['linkedin', 'github', 'tiktok'].includes(icon)).map(({ href }) => href),
}

export default function InstructorPage() {
  return (
    <>
      <SEO
        title="Rizwan Ullah - MERN Stack & React Native Instructor | RizMern"
        description="Meet Rizwan Ullah, full stack web developer and instructor teaching MERN Stack, React Native, and AI-assisted workflows through practical live projects."
        path="/instructor"
        structuredData={[personSchema]}
      />
      <InstructorHeroSection />
      <InstructorBioSection />
      <InstructorSkillsSection />
      <SkillsMatrix />
      <InstructorTeachingSection />
      <InstructorJourneySection />
      <InstructorCTASection />
    </>
  )
}
