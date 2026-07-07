import React from 'react';
import { Calendar, Award } from 'lucide-react';

function Education({ config }) {
  const { education } = config;

  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Academic background</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="education-grid">
          {education.map((edu, index) => (
            <div
              key={index}
              id={`education-${index}`}
              className="edu-card card-3d"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-glow"></div>

              <div className="edu-icon">{edu.icon}</div>

              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">{edu.institution}</p>

              <div className="edu-meta">
                <span className="edu-meta-item">
                  <Calendar size={14} />
                  {edu.year}
                </span>
                <span className="edu-meta-item">
                  <Award size={14} />
                  {edu.grade}
                </span>
              </div>

              <p className="edu-description">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
