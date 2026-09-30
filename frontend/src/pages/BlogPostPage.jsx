import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import Button from '../components/Button'
import GlassCard from '../components/GlassCard'
import blogPosts from '../data/blogPosts'
import { siteData } from '../data/siteData'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)

  if (!post) return <NotFoundArticle />

  const url = `${siteData.siteUrl}/blog/${post.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: siteData.brand, url: `${siteData.siteUrl}/` },
    publisher: { '@type': 'Organization', name: siteData.brand, url: `${siteData.siteUrl}/` },
    image: `${siteData.siteUrl}/og-image.png`,
  }

  return (
    <>
      <SEO
        title={post.metaTitle}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        structuredData={[articleSchema]}
        breadcrumbLabel={post.title}
      />
      <article className="blog-post page-container">
        <Link className="blog-back-link" to="/blog"><ArrowLeft size={15} /> All articles</Link>
        <header className="blog-post-header">
          <div className="blog-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <h1>{post.title}</h1>
          <p className="blog-post-intro">{post.intro}</p>
          <p className="blog-card-meta"><time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}</time><span><Clock3 size={13} />{post.readTime}</span></p>
        </header>
        <GlassCard className="blog-toc">
          <h2>In this guide</h2>
          <ol>{post.sections.map((section, index) => <li key={section.heading}><a href={`#blog-section-${index + 1}`}>{section.heading}</a></li>)}</ol>
        </GlassCard>
        <div className="blog-article-content">
          {post.sections.map((section, index) => (
            <section id={`blog-section-${index + 1}`} key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{renderInternalLinks(paragraph)}</p>)}
              {section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
        </div>
        <GlassCard className="blog-cta">
          <span className="eyebrow">START BUILDING WITH GUIDANCE</span>
          <h2>Turn your learning into real projects</h2>
          <p>Explore the course structure or meet Rizwan in a free online demo class.</p>
          <div className="blog-actions">
            <Button to="/demo">Join the free demo class <ArrowRight size={15} /></Button>
            <Button to="/course" variant="outline">Explore the MERN course</Button>
          </div>
        </GlassCard>
        <section className="blog-related" aria-labelledby="related-posts-title">
          <h2 id="related-posts-title">Related guides</h2>
          <div className="blog-related-grid">
            {blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3).map((related) => (
              <Link className="blog-related-link" key={related.slug} to={`/blog/${related.slug}`}>
                <span>{related.title}</span><ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  )
}

function renderInternalLinks(text) {
  const linkPattern = /\[([^\]]+)\]\((\/(?!\/)[^)]+)\)/g
  const content = []
  let previousIndex = 0
  let match

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > previousIndex) content.push(text.slice(previousIndex, match.index))
    content.push(<Link key={`${match[2]}-${match.index}`} to={match[2]}>{match[1]}</Link>)
    previousIndex = linkPattern.lastIndex
  }
  if (previousIndex < text.length) content.push(text.slice(previousIndex))
  return content
}

function NotFoundArticle() {
  return (
    <>
      <SEO title="Article Not Found | RizMern" description="This RizMern blog article could not be found. Browse the latest web development guides." path={window.location.pathname} noindex />
      <section className="not-found-page page-container">
        <h1>Article not found</h1>
        <p>Browse the latest practical web development and AI guides.</p>
        <Button to="/blog">Browse all articles</Button>
      </section>
    </>
  )
}
