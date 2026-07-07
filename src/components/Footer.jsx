import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Heart } from 'lucide-react';

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

function Footer({ config }) {
  const { personal, social } = config;
  const year = new Date().getFullYear();
  const activeSocials = Object.entries(social).filter(([, href]) => href);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copy">
          &copy; {year}{' '}
          <span className="gradient-text">{personal.name}</span>. Crafted with{' '}
          <Heart size={14} className="footer-heart" /> and cutting-edge tech.
        </p>

        <div className="footer-links">
          {activeSocials.map(([platform, href]) => {
            const Icon = SOCIAL_ICONS[platform];
            if (!Icon) return null;
            return (
              <a
                key={platform}
                id={`footer-${platform}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={platform}
                className="footer-social"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        <p className="footer-tagline">{personal.tagline}</p>
      </div>
    </footer>
  );
}

export default Footer;
