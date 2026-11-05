import React from 'react';
import { User, Award, Code2, Clock } from 'lucide-react';

function About({ config }) {
  const { personal, about } = config;

  const defaultStats = [
    { number: '10+', label: 'Projects Built' },
    { number: '2+', label: 'Years Learning' },
    { number: '5+', label: 'Technologies' },
    { number: '100%', label: 'Dedication' },
  ];
  const stats = (about.stats && about.stats.length > 0) ? about.stats : defaultStats;

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="about-grid">

          {/* Photo */}
          <div className="about-photo-section">
            <div className="about-photo-container">
              {personal.profilePhoto ? (
                <img src={personal.profilePhoto} alt={personal.name} className="about-photo" />
              ) : (
                <div className="about-photo-placeholder">
                  <User size={64} opacity={0.3} />
                  <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>No photo set</p>
                </div>
              )}
              <div className="about-badge">
                <span>💼 Available for Work</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="about-text">
            <div className="section-header" style={{ textAlign: 'left' }}>
              <span className="section-label">Who I am</span>
              <h2 className="section-title">{about.heading || 'About Me'}</h2>
            </div>

            <div className="about-bio">
              {(about.bio || []).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="about-stats">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
