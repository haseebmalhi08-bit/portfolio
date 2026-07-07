import React from 'react';
import { User } from 'lucide-react';

function About({ config }) {
  const { personal, about } = config;

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Get to know me</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-content">
          {/* Bio Card */}
          <div className="about-card card-3d">
            <div className="card-glow"></div>
            {personal.profilePhoto ? (
              <img
                src={personal.profilePhoto}
                alt={personal.name}
                className="about-photo"
              />
            ) : (
              <User className="about-icon" size={48} />
            )}
            <h3>{about.heading}</h3>
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {about.stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card card-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-glow"></div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
