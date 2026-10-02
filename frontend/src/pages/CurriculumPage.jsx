import React, { useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import InteractiveCurriculum from '../components/course/InteractiveCurriculum';
import TechWallSection from '../components/course/TechWallSection';
import CourseCta from '../components/course/CourseCta';

export function CurriculumPage() {
  const outletCtx = useOutletContext();
  const onOpenDemo = outletCtx?.onOpenDemo || (() => {});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'MERN Stack Course Syllabus & Curriculum Breakdown',
    description:
      'Explore the complete MERN Stack course syllabus: HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, React Native, and AI workflows with real practical projects.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'RizMern',
      url: 'https://www.rizmern.online/',
    },
    educationalCredentialAwarded: 'Course Completion Certificate & Portfolio',
    timeRequired: 'P3M',
  };

  return (
    <div className="curriculum-page-wrap">
      <SEO
        title="MERN Stack Course Syllabus & Curriculum Breakdown | RizMern"
        description="Explore the complete MERN Stack course syllabus: HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, React Native, and AI workflows with real practical projects."
        path="/curriculum"
        structuredData={[structuredData]}
      />

      <div className="app-container" style={{ paddingTop: 'var(--space-8)' }}>
        {/* Curriculum Page Header */}
        <header className="page-hero" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto var(--space-8)' }}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <Badge variant="purple">3-Month In-Depth Syllabus</Badge>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
            MERN Stack Course Syllabus &amp; <br />
            <span className="gradient-text">Interactive Curriculum Breakdown</span>
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A structured roadmap from foundational web concepts through to advanced full-stack systems,
            mobile compilation, and AI-accelerated engineering workflows.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button variant="primary" size="md" onClick={onOpenDemo}>
              Join Free Demo Class
            </Button>
            <Link to="/admission">
              <Button variant="secondary" size="md">
                View Fee &amp; Class Schedule →
              </Button>
            </Link>
          </div>
        </header>

        {/* 1. Interactive 3-Month Tabs (Month 1, Month 2, Month 3) */}
        <main>
          <InteractiveCurriculum />

          {/* 2. Comprehensive Technology Wall */}
          <TechWallSection />

          {/* 3. Action CTA */}
          <CourseCta onOpenDemo={onOpenDemo} />
        </main>
      </div>
    </div>
  );
}

export default CurriculumPage;
