import SEO from '../components/SEO'
import InstructorBioSection from '../sections/InstructorBioSection'
import InstructorCTASection from '../sections/InstructorCTASection'
import InstructorHeroSection from '../sections/InstructorHeroSection'
import InstructorJourneySection from '../sections/InstructorJourneySection'
import InstructorSkillsSection from '../sections/InstructorSkillsSection'
import InstructorTeachingSection from '../sections/InstructorTeachingSection'
import { siteData, socialLinks } from '../data/siteData'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteData.instructor,
  jobTitle: siteData.instructorTitle,
  url: `${siteData.siteUrl}/instructor`,
  sameAs: socialLinks.filter(({ icon }) => ['linkedin', 'github'].includes(icon)).map(({ href }) => href),
}

export default function InstructorPage() {
  return (
    <>
      <SEO
        title="Rizwan Ullah | MERN and React Native Instructor"
        description="Meet Rizwan Ullah, a MERN Stack and React Native developer teaching practical full stack development with AI."
        path="/instructor"
        structuredData={[personSchema]}
      />
      <InstructorHeroSection />
      <InstructorBioSection />
      <InstructorSkillsSection />
      <InstructorTeachingSection />
      <InstructorJourneySection />
      <InstructorCTASection />
    </>
  )
}
