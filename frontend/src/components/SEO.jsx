import { Helmet } from 'react-helmet-async'
import { siteData, socialLinks } from '../data/siteData'

const absoluteUrl = (path = '/') => new URL(path, `${siteData.siteUrl}/`).toString()

function breadcrumbSchema(path, lastLabel) {
  const parts = path.split('/').filter(Boolean)
  if (!parts.length) return null
  const items = [{ name: 'Home', item: absoluteUrl('/') }]
  let currentPath = ''
  for (const [index, part] of parts.entries()) {
    currentPath += `/${part}`
    const name = index === parts.length - 1 && lastLabel
      ? lastLabel
      : part.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
    items.push({ name, item: absoluteUrl(currentPath) })
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['SoftwareCompany', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${siteData.siteUrl}/#business`,
    name: 'RizMern Software Company',
    alternateName: siteData.brand,
    legalName: 'RizMern Software Company',
    description: 'Premier software company based in Bahria Town, Lahore. We design and develop custom business software (Property Dealer CRM, Restaurant POS, Expense Tracker, Pizza Shop system), MERN stack web development, React Native mobile apps, and graphic designing.',
    telephone: '+923179500901',
    email: siteData.email,
    image: absoluteUrl('/og-image.png'),
    url: absoluteUrl('/'),
    logo: absoluteUrl('/rizmern-icon.svg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahria Town',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      postalCode: '53720',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.3685,
      longitude: 74.1804,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Bahria+Town+Lahore+Pakistan',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    priceRange: 'PKR',
    currenciesAccepted: 'PKR, USD',
    paymentAccepted: 'Cash, Bank Transfer, EasyPaisa, JazzCash',
    areaServed: [
      { '@type': 'Place', name: 'Bahria Town Lahore' },
      { '@type': 'City', name: 'Lahore' },
      { '@type': 'AdministrativeArea', name: 'Punjab' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
    sameAs: socialLinks.filter(({ icon }) => ['linkedin', 'github', 'youtube', 'tiktok'].includes(icon)).map(({ href }) => href),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'RizMern Software & Digital Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Web Development (MERN Stack)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development (React Native iOS & Android)' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Designing & Branding' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Property Dealer & Real Estate Management Software' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pizza Shop Management & POS Software' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restaurant Management & Table Billing POS Software' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Expense Tracker & Accounting Software' } },
      ],
    },
  }
}

export default function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  type = 'website',
  noindex = false,
  noIndex = false,
  structuredData = [],
  breadcrumbLabel,
}) {
  const isNoIndex = Boolean(noindex || noIndex)
  const canonical = absoluteUrl(path)
  const customSchemas = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : []
  const schemas = [
    organizationSchema(),
    ...(path !== '/' && path !== '/thank-you' ? [breadcrumbSchema(path, breadcrumbLabel)] : []),
    ...customSchemas,
  ].filter(Boolean)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={isNoIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta httpEquiv="content-language" content="en" />
      <meta name="theme-color" content="#080912" />
      <meta
        name="google-site-verification"
        content={import.meta.env.VITE_GSC_VERIFICATION || '1RZvgLnDEDmfBtWrCceW1MNjFMvcBQooANK2xfddcr4'}
      />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteUrl(image)} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteData.brand} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteUrl(image)} />
      {isNoIndex && <meta name="googlebot" content="noindex, nofollow" />}
      {schemas.map((schema, index) => (
        <script key={`${schema['@type']}-${index}`} type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  )
}
