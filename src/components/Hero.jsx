import React from 'react';
import { Briefcase, Mail, Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Rocket, Download, MapPin } from 'lucide-react';

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

function Hero({ config, onNavigate }) {
  const { personal, social } = config;
  const activeSocials = Object.entries(social).filter(([, href]) => href);

  return (
    <section id="home" className="hero-section">
      <div className="hero-background"></div>

      <div className="hero-content">

        {/* Profile Photo */}
        {personal.profilePhoto && (
          <div className="hero-photo-wrapper">
            <img
              src={personal.profilePhoto}
              alt={personal.name}
              className="hero-photo"
            />
          </div>
        )}

        {/* Availability Badge */}
        {personal.availability && (
          <div className="hero-badge">
            <Rocket size={13} />
            <span>{personal.availability}</span>
          </div>
        )}

        {/* Name & Role */}
        <h1 className="hero-title">
          <span className="title-line">{personal.firstName}</span>
          <span className="title-line gradient-text">{personal.lastName}</span>
          <span className="title-line">{personal.tagline}</span>
        </h1>

        {/* Subtitle */}
        {personal.subtitle && (
          <p className="hero-subtitle">{personal.subtitle}</p>
        )}

        {/* Location */}
        {personal.location && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
            <MapPin size={14} /> {personal.location}
          </p>
        )}

        {/* Buttons */}
        <div className="hero-buttons">
          <button
            id="hero-view-projects"
            className="btn-primary"
            onClick={() => onNavigate('projects')}
          >
            <span className="btn-content">
              <Briefcase size={18} />
              View Projects
            </span>
          </button>

          {personal.resumeLink && personal.resumeLink !== '#' && (
            <a
              id="hero-download-resume"
              href={personal.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span className="btn-content">
                <Download size={18} />
                Download CV
              </span>
            </a>
          )}

          <button
            id="hero-contact"
            className="btn-secondary"
            onClick={() => onNavigate('contact')}
          >
            <span className="btn-content">
              <Mail size={18} />
              Contact Me
            </span>
          </button>
        </div>

        {/* Social Icons */}
        {activeSocials.length > 0 && (
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
                  style={{ animationDelay: `${index * 0.08}s` }}
                  title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                >
                  <div className="icon-wrapper">
                    <Icon size={18} />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse"><div className="wheel"></div></div>
        <span>Scroll down</span>
      </div>
    </section>
  );
}

export default Hero;
