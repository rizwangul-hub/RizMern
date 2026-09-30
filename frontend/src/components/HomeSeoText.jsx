import { Link } from 'react-router-dom'

export default function HomeSeoText({ course = false }) {
  return (
    <section className="seo-copy-section page-container" aria-labelledby={course ? 'course-seo-copy' : 'home-seo-copy'}>
      <div className="seo-copy">
        <h2 id={course ? 'course-seo-copy' : 'home-seo-copy'}>
          {course ? 'Learn full stack development with AI' : 'Build websites and apps with a practical learning path'}
        </h2>
        <p>
          RizMern is an online MERN stack course in Pakistan for learners who want to understand how modern websites work, connect an application to a database, and explore React Native app development. Learn the frontend, backend, and deployment workflow while using AI tools thoughtfully to plan, build, debug, and improve projects. The three-month course is designed for beginners and focuses on practical structure rather than memorizing isolated syntax.
        </p>
        <p>
          Explore the <Link to="/course">MERN Stack and React Native course curriculum</Link>, or <Link to="/demo">join a free online demo class</Link> to learn how the course works.
        </p>
      </div>
    </section>
  )
}
