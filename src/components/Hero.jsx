import React from 'react';
import { Briefcase, Mail, Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Rocket, Download } from 'lucide-react';

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

function Hero({ config, mousePosition, onNavigate }) {
  const { personal, social } = config;

  const activeSocials = Object.entries(social).filter(([, href]) => href);

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <div className="floating-cube cube-1"></div>
        <div className="floating-cube cube-2"></div>
        <div className="floating-cube cube-3"></div>
        <div className="grid-overlay"></div>
      </div>

      <div
        className="hero-content"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      >
        {/* Profile Photo */}
        {personal.profilePhoto && (
          <div className="hero-photo-wrapper">
            <div className="hero-photo-ring"></div>
            <div className="hero-photo-ring ring-2"></div>
            <img
              src={personal.profilePhoto}
              alt={personal.name}
              className="hero-photo"
            />
          </div>
        )}

        {/* Badge */}
        <div className="hero-badge">
          <Rocket size={16} />
          <span>{personal.availability}</span>
        </div>

        {/* Name */}
        <h1 className="hero-title">
          <span className="title-line">{personal.firstName}</span>
          <span className="title-line gradient-text">{personal.lastName}</span>
          <span className="title-line">{personal.tagline}</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">{personal.subtitle}</p>

        {/* Buttons */}
        <div className="hero-buttons">
          <button
            id="hero-view-projects"
            className="btn-3d btn-primary"
            onClick={() => onNavigate('projects')}
          >
            <span className="btn-content">
              <Briefcase size={20} />
              View Projects
            </span>
            <span className="btn-shine"></span>
          </button>

          {personal.resumeLink && personal.resumeLink !== '#' && (
            <a
              id="hero-download-resume"
              href={personal.resumeLink}
              download
              className="btn-3d btn-secondary"
            >
              <span className="btn-content">
                <Download size={20} />
                Download Resume
              </span>
              <span className="btn-shine"></span>
            </a>
          )}

          <button
            id="hero-contact"
            className="btn-3d btn-secondary"
            onClick={() => onNavigate('contact')}
          >
            <span className="btn-content">
              <Mail size={20} />
              Get in Touch
            </span>
            <span className="btn-shine"></span>
          </button>
        </div>

        {/* Social Icons */}
        <div className="social-links">
          {activeSocials.map(([platform, href], index) => {
            const Icon = SOCIAL_ICONS[platform];
            if (!Icon) return null;
            return (
              <a
                key={platform}
                id={`social-${platform}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                style={{ animationDelay: `${index * 0.1}s` }}
                title={platform}
              >
                <div className="icon-wrapper">
                  <Icon size={20} />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}

export default Hero;
