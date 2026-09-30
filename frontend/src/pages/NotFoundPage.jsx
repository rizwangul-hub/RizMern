import SEO from '../components/SEO'
import Button from '../components/Button'

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | RizMern"
        description="This RizMern page could not be found. Explore the course, blog, or free demo class."
        path={window.location.pathname}
        noindex
      />
      <section className="not-found-page page-container" aria-labelledby="not-found-title">
        <span className="eyebrow">404 · PAGE NOT FOUND</span>
        <h1 id="not-found-title">This page isn&apos;t here.</h1>
        <p>The page may have moved. Continue to the course, read the blog, or join a free demo class.</p>
        <div className="not-found-actions">
          <Button to="/course">Explore the course</Button>
          <Button to="/blog" variant="outline">Read the development blog</Button>
          <Button to="/demo" variant="outline">Join a free demo</Button>
        </div>
      </section>
    </>
  )
}
