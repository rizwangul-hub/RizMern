import React from 'react';
import Badge from '../common/Badge';
import './PortfolioPresenceSection.css';

const PRESENCE_PILLARS = [
  {
    icon: '💻',
    title: 'Verified Project Blueprints',
    desc: 'Showcase real applications with problem statements, architecture diagrams, and working features rather than generic tutorials.',
  },
  {
    icon: '📂',
    title: 'Active GitHub Repositories',
    desc: 'Maintain clean commit histories, descriptive README documentation, and proper git hygiene that demonstrates technical professionalism.',
  },
  {
    icon: '🚀',
    title: 'Live Demos & Custom Domains',
    desc: 'Deploy frontend and backend applications to production so prospective clients and teams can interact with your software directly.',
  },
  {
    icon: '🎯',
    title: 'Categorized Skills Matrix',
    desc: 'Present your competencies accurately across Frontend, Backend, Databases, Mobile, and AI engineering without exaggerated claims.',
  },
  {
    icon: '💼',
    title: 'Polished LinkedIn Presence',
    desc: 'Craft clear project summaries on LinkedIn, link your repositories, and articulate how you solve technical problems collaboratively.',
  },
  {
    icon: '📬',
    title: 'Accessible Contact Channels',
    desc: 'Provide verified contact paths (Email, GitHub, WhatsApp) so collaborators and employers can reach you with zero friction.',
  },
];

export function PortfolioPresenceSection() {
  return (
    <section className="portfolio-presence-section" id="portfolio-presence" aria-labelledby="portfolio-presence-heading">
      <div className="app-container">
        <div className="portfolio-presence-header">
          <Badge variant="purple" style={{ marginBottom: 'var(--space-2)' }}>
            Professional Presentation
          </Badge>
          <h2 id="portfolio-presence-heading" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', marginBottom: 'var(--space-3)' }}>
            Build Your Developer Portfolio &amp; Online Presence
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Writing code is half the battle; communicating what you built is the other half.
            We guide you in building an evidence-based portfolio that stands out on GitHub and LinkedIn.
          </p>
        </div>

        <div className="portfolio-presence-grid">
          {PRESENCE_PILLARS.map((item) => (
            <div key={item.title} className="portfolio-presence-card">
              <span className="presence-card-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="presence-card-title">{item.title}</h3>
              <p className="presence-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="portfolio-presence-note">
          <p>
            <strong>Realistic Career Perspective:</strong> We do not offer artificial job guarantees or inflated placement statistics.
            We focus on mentoring you to build demonstrable technical competence, write clean code, and present verified work that speaks for itself.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PortfolioPresenceSection;
