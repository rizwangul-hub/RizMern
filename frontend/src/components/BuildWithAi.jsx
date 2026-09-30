import React from 'react';
import Card from './common/Card';
import Badge from './common/Badge';
import './BuildWithAi.css';

export function BuildWithAi() {
  const workflows = [
    {
      icon: '📐',
      title: 'Planning & Project Structure',
      description:
        'Use AI to design system flowcharts, database relationships, and modular file architectures before writing code.',
    },
    {
      icon: '⚡',
      title: 'Component & Boilerplate Generation',
      description:
        'Accelerate routine setup of React components, Express routes, and Mongoose models without repetitive typing.',
    },
    {
      icon: '🔗',
      title: 'API Integration & Data Handling',
      description:
        'Quickly draft asynchronous fetch handlers, state pipelines, and payload validators with guided AI prompting.',
    },
    {
      icon: '🔍',
      title: 'Intelligent Debugging & Testing',
      description:
        'Pinpoint cryptic runtime errors, analyze network failures, and generate unit and integration test assertions.',
    },
    {
      icon: '🚀',
      title: 'Deployment & Configuration',
      description:
        'Write clean build scripts, environment templates, and CI/CD configurations for Vercel and Hostinger hosting.',
    },
  ];

  return (
    <section className="ai-section" id="ai-workflow" aria-labelledby="ai-title">
      <div className="ai-glow" aria-hidden="true" />

      <div className="app-container ai-content">
        <div className="ai-header">
          <Badge variant="purple" style={{ marginBottom: 'var(--space-2)' }}>
            Modern Developer Philosophy
          </Badge>
          <h2 id="ai-title" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', marginBottom: 'var(--space-3)' }}>
            AI Is Your Tool. <span className="gradient-text">Understanding Is Your Superpower.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
            We teach you to command modern AI coding tools to accelerate development speed, but we
            never treat AI as an excuse to avoid learning engineering principles. You will learn to
            inspect, verify, and understand every line you ship.
          </p>
        </div>

        <div className="ai-grid">
          {/* Left Column: Practical AI Workflows */}
          <Card className="ai-card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
              How You Will Leverage AI in This Course
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Integrated across every week of the three-month curriculum:
            </p>

            <div className="ai-workflow-list">
              {workflows.map((wf) => (
                <div key={wf.title} className="ai-workflow-item">
                  <span className="ai-item-icon" aria-hidden="true">
                    {wf.icon}
                  </span>
                  <div>
                    <h4 className="ai-item-title">{wf.title}</h4>
                    <p className="ai-item-desc">{wf.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Column: Core Engineering Principles */}
          <div className="ai-rules-card">
            <div>
              <Badge variant="blue" style={{ marginBottom: 'var(--space-2)' }}>
                Professional Discipline
              </Badge>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                The Three Golden Rules of AI Engineering
              </h3>
            </div>

            <div className="rule-box">
              <span className="rule-title">1. Review Over Blind Copying</span>
              <p className="rule-desc">
                Never accept AI code without reading and understanding its logic, complexity,
                and dependencies. If you cannot explain the code, you cannot debug it when it breaks in production.
              </p>
            </div>

            <div className="rule-box security">
              <span className="rule-title">2. Absolute Secret &amp; Credential Protection</span>
              <p className="rule-desc">
                Never prompt AI tools with database connection strings, JWT private keys, or API tokens.
                Learn strict environment variable hygiene (`.env`, `.env.example`, `.gitignore`).
              </p>
            </div>

            <div className="rule-box">
              <span className="rule-title">3. Architecture &amp; Mental Models First</span>
              <p className="rule-desc">
                AI can output syntax in seconds, but you must know what to build, how data flows,
                and how the client communicates with the server. That architectural vision is your true value as a developer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuildWithAi;
