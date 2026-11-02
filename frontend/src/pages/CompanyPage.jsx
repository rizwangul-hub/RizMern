import CompanyShowcase from '../components/CompanyShowcase'
import PortfolioSection from '../sections/PortfolioSection'
import { ArrowRight, ArrowUpRight, Check, Code2, Database, Layers, MapPin, Monitor, Phone, ShieldCheck, Smartphone, Sparkles, UtensilsCrossed, Building2, Pizza, Receipt, Wallet, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Button from '../components/Button'
import { siteData } from '../data/siteData'
import { services, solutions, companyHighlights, companyProcess, companyFaqs } from '../data/companyData'
import '../company.css'

const solutionIcons = {
  'property-dealer': Building2,
  'pizza-shop': Pizza,
  'restaurant': UtensilsCrossed,
  'expense-tracker': Wallet,
}

const serviceIcons = {
  'web-development': Monitor,
  'app-development': Smartphone,
  'graphic-design': Sparkles,
  'business-software': Database,
}

const pages = {
  home: [
    'Software Company in Bahria Town Lahore | Web, Apps & Business Software | RizMern',
    'RizMern is a premier software company in Bahria Town, Lahore. We build custom business software (Property Dealer CRM, Restaurant POS, Expense Tracker, Pizza Shop), websites, mobile apps & graphic designs.',
    '/',
  ],
  services: [
    'Web, App & Graphic Design Services in Lahore | RizMern',
    'Explore custom web development, React Native mobile apps, graphic designing, and custom business software from RizMern in Bahria Town, Lahore.',
    '/services',
  ],
  solutions: [
    'Business Software in Lahore | Property, Restaurant, Pizza & Expense Software | RizMern',
    'Custom software for property dealers, pizza shops, restaurants, and business expense tracking from RizMern in Bahria Town, Lahore.',
    '/solutions',
  ],
  about: [
    'About RizMern | Software Company in Bahria Town Lahore',
    'Learn about RizMern, a leading software house based in Bahria Town, Lahore creating custom business software, web applications, and mobile apps.',
    '/about',
  ],
  contact: [
    'Contact RizMern | Software Company in Bahria Town Lahore',
    'Contact RizMern in Bahria Town, Lahore for a free project quote on business software, web development, mobile apps, or graphic design.',
    '/contact',
  ],
}

export default function CompanyPage({ page = 'home', serviceSlug }) {
  const service = services.find((item) => item.slug === serviceSlug)
  const [title, description, path] = service
    ? [
        `${service.name} in Bahria Town Lahore | RizMern`,
        `${service.description} Contact RizMern software company in Bahria Town, Lahore.`,
        `/services/${service.slug}`,
      ]
    : pages[page] || pages.home

  const isHome = page === 'home' && !service
  const chatMessage = service
    ? `Hello RizMern, I would like to discuss a ${service.name} project for my business.`
    : siteData.whatsappPrefilledMessage
  const chat = `${siteData.whatsappLink}?text=${encodeURIComponent(chatMessage)}`

  const serviceSchema = service
    ? {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `${siteData.siteUrl}${path}`,
        provider: { '@id': `${siteData.siteUrl}/#business` },
        areaServed: [
          { '@type': 'Place', name: 'Bahria Town Lahore' },
          { '@type': 'City', name: 'Lahore' },
          { '@type': 'Country', name: 'Pakistan' },
        ],
      }
    : []

  return (
    <div className="company-page">
      <SEO title={title} description={description} path={path} structuredData={serviceSchema} />

      {/* HERO SECTION */}
      <section className="company-hero page-container">
        <div>
          <span className="company-hero-badge">
            <MapPin size={14} /> Bahria Town, Lahore • Punjab, Pakistan
          </span>
          <h1>
            {isHome ? (
              <>
                Software Company in <br />
                <span className="gradient-text">Bahria Town, Lahore</span>
              </>
            ) : service ? (
              <>
                {service.name} <br />
                <span className="gradient-text">in Bahria Town, Lahore</span>
              </>
            ) : (
              <span className="gradient-text">
                {{
                  services: 'Custom Web, Apps & Design Services',
                  solutions: 'Purpose-Built Business Software',
                  about: 'About RizMern Software House',
                  contact: 'Contact RizMern in Bahria Town',
                }[page]}
              </span>
            )}
          </h1>
          <p className="company-intro">
            {isHome
              ? 'RizMern is a premier software company based in Bahria Town, Lahore. We design and build custom business software—including property dealer CRMs, restaurant POS, pizza shop delivery systems, and expense trackers—along with full-stack web applications, mobile apps, and creative graphic design.'
              : service
              ? service.description
              : description}
          </p>

          <div className="company-actions">
            <Button href={chat}>
              Discuss your project <ArrowUpRight size={17} />
            </Button>
            {isHome && (
              <Button href="#work" variant="outline">
                Explore Our Work <ArrowRight size={16} />
              </Button>
            )}
            {!isHome && (
              <Button to="/contact" variant="outline">
                Get a Free Quote
              </Button>
            )}
          </div>

          <div className="company-trust-pills" aria-label="Core Solutions">
            <span className="company-trust-pill">
              <Building2 size={13} /> Property Dealer CRM
            </span>
            <span className="company-trust-pill">
              <Pizza size={13} /> Pizza Shop POS
            </span>
            <span className="company-trust-pill">
              <UtensilsCrossed size={13} /> Restaurant POS & KOT
            </span>
            <span className="company-trust-pill">
              <Wallet size={13} /> Business Expense Tracker
            </span>
            <span className="company-trust-pill">
              <Sparkles size={13} /> Graphic Design
            </span>
          </div>
        </div>

        {/* Workspace Visual Card */}
        {isHome ? (
          <CompanyShowcase />
        ) : (
          <aside className="company-side">
            <span className="eyebrow">YOUR LOCAL DEVELOPMENT PARTNER</span>
            <h2>
              From initial idea <br />
              <span className="gradient-text">to daily operation.</span>
            </h2>
            <p>
              Tell us what your business needs. We will sit down with you, map out screens and user flows, and build a system that saves hours of daily busywork.
            </p>
            <Link to="/contact">
              Talk to our team in Bahria Town <ArrowUpRight size={16} />
            </Link>
          </aside>
        )}
      </section>

      {isHome && <PortfolioSection />}

      {/* STATS STRIP */}
      {isHome && (
        <div className="page-container">
          <div className="company-stats-strip">
            <div className="company-stat-item">
              <span className="company-stat-num">50+</span>
              <span className="company-stat-label">Projects Delivered</span>
              <span className="company-stat-sub">Web, mobile & business software</span>
            </div>
            <div className="company-stat-item">
              <span className="company-stat-num">100%</span>
              <span className="company-stat-label">Custom Architecture</span>
              <span className="company-stat-sub">MERN stack & React Native</span>
            </div>
            <div className="company-stat-item">
              <span className="company-stat-num">4+</span>
              <span className="company-stat-label">Industry Solutions</span>
              <span className="company-stat-sub">Property, Food, POS, Finance</span>
            </div>
            <div className="company-stat-item">
              <span className="company-stat-num">Bahria Town</span>
              <span className="company-stat-label">Lahore, Pakistan</span>
              <span className="company-stat-sub">Local face-to-face meetings</span>
            </div>
          </div>
        </div>
      )}

      {/* CORE SERVICES SECTION */}
      {(isHome || page === 'services' || service) && (
        <section className="company-section page-container" id="services">
          <div className="company-section-heading">
            <span className="eyebrow">WHAT WE BUILD</span>
            <h2>
              {service
                ? `${service.name} Services in Lahore`
                : 'Full-Stack Web, Mobile Apps & Graphic Designing'}
            </h2>
            <p>
              We engineer scalable software and eye-catching branding that elevate your company profile and streamline daily operations.
            </p>
          </div>

          <div className="company-service-grid">
            {(service ? [service] : services).map((item, i) => {
              const Icon = serviceIcons[item.slug] || Monitor
              return (
                <article className="company-card" key={item.slug}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="company-card-badge">{item.badge}</span>
                    <Icon size={20} color="#a855f7" />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <Check size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="company-card-tech">
                    {item.techStack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  {!service && (
                    <Link to={`/services/${item.slug}`}>
                      Explore {item.name} <ArrowUpRight size={16} />
                    </Link>
                  )}
                  {service && (
                    <Button href={chat} style={{ marginTop: '12px' }}>
                      Request a Quote for {item.name} <ArrowUpRight size={16} />
                    </Button>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* PURPOSE-BUILT BUSINESS SOFTWARE SECTION */}
      {(isHome || page === 'solutions') && (
        <section className="company-section company-solutions" id="solutions">
          <div className="page-container">
            <div className="company-section-heading">
              <span className="eyebrow">PURPOSE-BUILT BUSINESS SOFTWARE</span>
              <h2>
                Software Crafted for Real Workflows in <span className="gradient-text">Lahore</span>
              </h2>
              <p>
                Say goodbye to scattered notebooks, lost WhatsApp messages, and error-prone billing. Our custom software systems are built specifically for businesses in Pakistan.
              </p>
            </div>

            <div className="company-solution-grid">
              {solutions.map((item) => {
                const Icon = solutionIcons[item.id] || Database
                const solutionChat = `${siteData.whatsappLink}?text=${encodeURIComponent(`Hello RizMern, I am interested in the ${item.name} for my business.`)}`
                return (
                  <article className="company-solution-card" key={item.id}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="company-card-badge">{item.badge}</span>
                      <Icon size={22} color="#06b6d4" />
                    </div>
                    <h3>{item.name}</h3>
                    <div className="solution-tagline">{item.tagline}</div>
                    <p>{item.description}</p>
                    <ul className="company-card" style={{ padding: '0', background: 'transparent', border: 'none', margin: '0 0 16px' }}>
                      {item.features.map((feature) => (
                        <li key={feature} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#cbd5e1', marginBottom: '8px' }}>
                          <Check size={14} color="#4ade80" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <span className="company-tags">{item.tags}</span>
                    <div style={{ marginTop: '20px' }}>
                      <Button href={solutionChat} variant="primary" style={{ width: '100%' }}>
                        Get a Demo for {item.name} <ArrowUpRight size={16} />
                      </Button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE RIZMERN IN BAHRIA TOWN LAHORE */}
      {(isHome || page === 'about') && (
        <section className="company-section page-container" id="why-us">
          <div className="company-section-heading">
            <span className="eyebrow">LOCAL ADVANTAGE</span>
            <h2>
              Why Businesses in Bahria Town &amp; Lahore <span className="gradient-text">Trust RizMern</span>
            </h2>
            <p>
              Partnering with a local software company means direct communication, zero misaligned expectations, and dedicated ongoing support right where you operate.
            </p>
          </div>

          <div className="company-why-grid">
            {companyHighlights.map((highlight) => (
              <div className="company-why-card" key={highlight.title}>
                <div style={{ color: '#c084fc', marginBottom: '4px' }}>
                  <ShieldCheck size={22} />
                </div>
                <h4>{highlight.title}</h4>
                <p>{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4-STEP PROCESS */}
      {(isHome || page === 'services' || service) && (
        <section className="company-section page-container" id="process">
          <div className="company-section-heading">
            <span className="eyebrow">HOW WE WORK</span>
            <h2>Our 4-Step Agile Development Process</h2>
            <p>From the first phone call to post-launch staff training, we keep you informed every step of the way.</p>
          </div>

          <div className="company-process">
            {companyProcess.map((proc) => (
              <article key={proc.step}>
                <span>{proc.step} / PHASE</span>
                <h3>{proc.name}</h3>
                <p>{proc.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* RIZMERN ACADEMY BANNER */}
      {isHome && (
        <div className="page-container">
          <div className="company-academy-banner">
            <div className="company-academy-copy">
              <span className="eyebrow" style={{ color: '#d8b4fe' }}>RIZMERN ACADEMY</span>
              <h3>Looking to learn modern full-stack web and app engineering?</h3>
              <p>
                Learn directly from the software engineering team at RizMern. Our 3-month course covers MERN stack, React Native mobile apps, and practical AI workflows with live projects.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button to="/course" variant="outline">
                Explore Course Syllabus
              </Button>
              <Button to="/demo">
                Join Free Demo Class <ArrowUpRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT COMPANY DETAILED */}
      {(isHome || page === 'about') && (
        <section className="company-section page-container company-about" id="about">
          <div>
            <span className="eyebrow">LOCAL ROOTS. MODERN TECHNOLOGY.</span>
            <h2>
              A Software Company Based in <br />
              <span className="gradient-text">Bahria Town, Lahore.</span>
            </h2>
          </div>
          <div className="company-about-copy">
            <p>
              RizMern was founded to solve a real challenge faced by businesses in Lahore and across Pakistan: off-the-shelf software is either too complicated, too generic, or plagued by unpredictable foreign currency subscriptions.
            </p>
            <p>
              We bridge the gap by combining full-stack MERN software engineering with high-end graphic design and branding. Whether you are a property dealer managing multi-crore plots in Bahria Town and DHA, a restaurant or pizza shop looking for a dependable POS with KOT printing, or a company seeking custom expense accounting, RizMern builds the exact tools your team needs to thrive.
            </p>
            <Link to="/contact">
              Schedule a meeting in Bahria Town <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      {(isHome || page === 'about') && (
        <section className="company-section page-container" id="faq">
          <div className="company-section-heading">
            <span className="eyebrow">QUESTIONS &amp; ANSWERS</span>
            <h2>Frequently Asked Questions About RizMern</h2>
            <p>Everything you need to know about our software services, local presence, and pricing.</p>
          </div>

          <div className="company-faq">
            {companyFaqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT & LOCATION SECTION */}
      <section className="company-section page-container" id="contact">
        <div className="company-contact">
          <div>
            <span className="eyebrow">START A CONVERSATION</span>
            <h2>
              Ready to Upgrade Your <br />
              <span className="gradient-text">Business Operations?</span>
            </h2>
            <p>
              Send us a message with your business requirements, timeline, and questions. We will respond promptly with a tailored plan and clear quote.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button href={chat}>
                Chat on WhatsApp (+92 317 9500901) <ArrowUpRight size={17} />
              </Button>
              <Button to="/projects" variant="outline">
                View Our Work
              </Button>
            </div>
          </div>

          <address>
            <strong>RizMern Software Company</strong>
            <span>
              <MapPin size={16} color="#c084fc" /> Bahria Town, Lahore, Punjab, Pakistan
            </span>
            <a href="tel:+923179500901">
              <Phone size={15} /> +92 317 9500901
            </a>
            <a href={`mailto:${siteData.email}`}>
              <MailIcon /> {siteData.email}
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Bahria+Town+Lahore+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps <ArrowUpRight size={14} />
            </a>
            <small>Office hours: Monday – Saturday (9:00 AM – 7:00 PM PKT)</small>
          </address>
        </div>
      </section>
    </div>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
