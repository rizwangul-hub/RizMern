import { ArrowRight, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GlassCard from '../components/GlassCard'
import ScrollReveal from '../components/ScrollReveal'
import blogPosts from '../data/blogPosts'

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Web Development and AI Blog | RizMern"
        description="Practical guides to MERN Stack, React Native, AI-assisted web development, domains, and deployment for beginners."
        path="/blog"
      />
      <section className="blog-page page-container" aria-labelledby="blog-title">
        <ScrollReveal className="blog-heading">
          <span className="eyebrow">RIZMERN LEARNING JOURNAL</span>
          <h1 id="blog-title">Practical guides for building with the web</h1>
          <p>Clear, beginner-friendly articles on full stack development, AI tools, mobile apps, and putting your work online.</p>
        </ScrollReveal>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.04}>
              <GlassCard className="blog-card">
                <div className="blog-tags">{post.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
                <p className="blog-card-meta"><time dateTime={post.date}>{new Date(`${post.date}T00:00:00`).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })}</time><span><Clock3 size={13} />{post.readTime}</span></p>
                <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.description}</p>
                <Link className="blog-read-link" to={`/blog/${post.slug}`}>Read the guide <ArrowRight size={15} /></Link>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  )
}
