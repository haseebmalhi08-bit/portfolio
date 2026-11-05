import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

function Projects({ config }) {
  const { projects } = config;
  const [filter, setFilter] = useState('all');

  if (!projects || projects.length === 0) return null;

  const allTech = [...new Set(projects.flatMap((p) => p.tech || []))].slice(0, 8);
  const filtered = filter === 'all' ? projects : projects.filter((p) => (p.tech || []).includes(filter));

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter */}
        <div className="project-filters">
          <button id="filter-all" className={`filter-btn ${filter === 'all' ? 'filter-active' : ''}`} onClick={() => setFilter('all')}>
            All
          </button>
          {allTech.map((tech) => (
            <button
              key={tech}
              id={`filter-${tech.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
              className={`filter-btn ${filter === tech ? 'filter-active' : ''}`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project, index) => (
            <div key={index} id={`project-${index}`} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>

              {/* Image / Emoji Banner */}
              <div className="project-image" style={{ background: project.gradient || 'linear-gradient(135deg,var(--primary),var(--accent))' }}>
                {project.image
                  ? <img src={project.image} alt={project.title} className="project-img" />
                  : <div className="project-emoji">{project.emoji || '🚀'}</div>
                }
                {project.featured && <span className="featured-badge">⭐ Featured</span>}
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                {project.description && <p className="project-description">{project.description}</p>}

                {project.tech && project.tech.length > 0 && (
                  <div className="project-tech">
                    {project.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                  </div>
                )}

                <div className="project-links">
                  {project.githubLink && (
                    <a id={`project-${index}-github`} href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link project-link-secondary">
                      <Github size={15} /> Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a id={`project-${index}-live`} href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link project-link-primary">
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
