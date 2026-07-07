import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

function Experience({ config }) {
  const { experience } = config;

  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My journey</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="timeline">
          {experience.map((job, index) => (
            <div
              key={index}
              id={`experience-${index}`}
              className="timeline-item"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Timeline line & dot */}
              <div className="timeline-connector">
                <div className="timeline-dot">
                  <Briefcase size={16} />
                </div>
                {index < experience.length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>

              {/* Card */}
              <div className="timeline-card card-3d">
                <div className="card-glow"></div>

                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{job.role}</h3>
                    <p className="exp-company">{job.company}</p>
                  </div>
                  <span className="exp-type-badge">{job.type}</span>
                </div>

                <div className="exp-meta">
                  <span className="exp-meta-item">
                    <Clock size={14} />
                    {job.duration}
                  </span>
                  <span className="exp-meta-item">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                </div>

                <p className="exp-description">{job.description}</p>

                <div className="exp-tech">
                  {job.tech.map((t, i) => (
                    <span key={i} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
