import React from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';

function Education({ config }) {
  const { education } = config;
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Academic background</span>
          <h2 className="section-title">Education</h2>
        </div>
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={index} id={`education-${index}`} className="edu-card" style={{ animationDelay: `${index * 0.12}s` }}>
              <span className="edu-icon">{edu.icon || '🎓'}</span>
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">{edu.institution}</p>
              <div className="edu-meta">
                {edu.year  && <span><Calendar size={12} style={{display:'inline',marginRight:'4px'}} />{edu.year}</span>}
                {edu.grade && <span style={{marginLeft:'0.75rem'}}><Award size={12} style={{display:'inline',marginRight:'4px'}} />{edu.grade}</span>}
              </div>
              {edu.description && <p className="edu-description">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
