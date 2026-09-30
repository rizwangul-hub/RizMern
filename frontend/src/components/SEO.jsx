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
    '@type': 'EducationalOrganization',
    name: siteData.brand,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/rizmern-icon.svg'),
    sameAs: socialLinks.filter(({ icon }) => ['linkedin', 'github', 'youtube'].includes(icon)).map(({ href }) => href),
  }
}

export default function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  type = 'website',
  noindex = false,
  structuredData = [],
  breadcrumbLabel,
}) {
  const canonical = absoluteUrl(path)
  const schemas = [
    organizationSchema(),
    ...(path !== '/' && path !== '/thank-you' ? [breadcrumbSchema(path, breadcrumbLabel)] : []),
    ...structuredData,
  ].filter(Boolean)

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <meta httpEquiv="content-language" content="en" />
      <meta name="theme-color" content="#080912" />
      {import.meta.env.VITE_GSC_VERIFICATION && <meta name="google-site-verification" content={import.meta.env.VITE_GSC_VERIFICATION} />}
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
      {noindex && <meta name="googlebot" content="noindex, nofollow" />}
      {schemas.map((schema, index) => (
        <script key={`${schema['@type']}-${index}`} type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, '\\u003c')}
        </script>
      ))}
    </Helmet>
  )
}
