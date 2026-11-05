import React from 'react';
import { MapPin, Clock } from 'lucide-react';

function Experience({ config }) {
  const { experience } = config;
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My journey</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="timeline">
          {experience.map((job, index) => (
            <div key={index} id={`experience-${index}`} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-role">{job.role}</span>
                  {job.type && <span className="timeline-type">{job.type}</span>}
                </div>
                {job.company && <div className="timeline-company">{job.company}</div>}
                <div className="timeline-meta">
                  {job.duration && <span><Clock size={12} style={{display:'inline',marginRight:'4px'}} />{job.duration}</span>}
                  {job.location && <span style={{marginLeft:'1rem'}}><MapPin size={12} style={{display:'inline',marginRight:'4px'}} />{job.location}</span>}
                </div>
                {job.description && <p className="timeline-desc">{job.description}</p>}
                {job.tech && job.tech.length > 0 && (
                  <div className="timeline-tech">
                    {job.tech.map((t, i) => <span key={i} className="tech-badge">{t}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
