import SEO from '../components/SEO'
import AdmissionStepsSection from '../sections/AdmissionStepsSection'
import InstallmentSection from '../sections/InstallmentSection'
import MainPricingSection from '../sections/MainPricingSection'
import PaymentMethodsSection from '../sections/PaymentMethodsSection'
import PricingFAQSection from '../sections/PricingFAQSection'
import PricingHeroSection from '../sections/PricingHeroSection'
import PricingPolicySection from '../sections/PricingPolicySection'
import { pricingPageData } from '../data/siteData'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pricingPageData.faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function PricingPage() {
  return (
    <>
      <SEO
        title="MERN Stack Course Fees & Admission Plans | RizMern"
        description="Review MERN Stack course fees, flexible payment plans, and admission details for the 3-month online full-stack web and mobile development course at RizMern."
        path="/pricing"
        structuredData={[faqSchema]}
      />
      <PricingHeroSection />
      <MainPricingSection />
      <InstallmentSection />
      <PaymentMethodsSection />
      <AdmissionStepsSection />
      <PricingPolicySection />
      <PricingFAQSection />
    </>
  )
}
