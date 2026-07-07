import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

function Projects({ config }) {
  const { projects } = config;
  const [filter, setFilter] = useState('all');

  const allTech = [...new Set(projects.flatMap((p) => p.tech))];

  const filtered =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.tech.includes(filter));

  return (
    <section id="projects" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter Tabs */}
        <div className="project-filters">
          <button
            id="filter-all"
            className={`filter-btn ${filter === 'all' ? 'filter-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          {allTech.map((tech) => (
            <button
              key={tech}
              id={`filter-${tech.toLowerCase().replace(/\./g, '')}`}
              className={`filter-btn ${filter === tech ? 'filter-active' : ''}`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <div
              key={index}
              id={`project-${index}`}
              className="project-card card-3d"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-glow"></div>

              {/* Project Image / Emoji */}
              <div
                className="project-image"
                style={{ background: project.gradient }}
              >
                {project.image ? (
                  <img src={project.image} alt={project.title} className="project-img" />
                ) : (
                  <div className="project-emoji">{project.emoji}</div>
                )}
                {project.featured && (
                  <span className="featured-badge">⭐ Featured</span>
                )}
              </div>

              {/* Project Info */}
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* Links */}
                <div className="project-links">
                  {project.githubLink && (
                    <a
                      id={`project-${index}-github`}
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-secondary"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                  {project.liveLink && (
                    <a
                      id={`project-${index}-live`}
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-primary"
                    >
                      <ExternalLink size={16} />
                      Live Demo
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
