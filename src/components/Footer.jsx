import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Heart } from 'lucide-react';

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram, youtube: Youtube, facebook: Facebook };

function Footer({ config }) {
  const { personal, social } = config;
  const year = new Date().getFullYear();
  const activeSocials = Object.entries(social).filter(([, href]) => href);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-name gradient-text">{personal.logoText || personal.name}</p>
        <p className="footer-tagline">{personal.tagline}</p>

        <div className="footer-social">
          {activeSocials.map(([platform, href]) => {
            const Icon = SOCIAL_ICONS[platform];
            if (!Icon) return null;
            return (
              <a key={platform} id={`footer-${platform}`} href={href} target="_blank" rel="noopener noreferrer" title={platform}
                style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'8px', color:'var(--text-secondary)', transition:'var(--transition)' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--primary)'; e.currentTarget.style.color='white'; e.currentTarget.style.borderColor='var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='var(--bg-card)'; e.currentTarget.style.color='var(--text-secondary)'; e.currentTarget.style.borderColor='var(--border)'; }}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        <p className="footer-copy">
          © {year} {personal.name} · Built with <Heart size={12} style={{display:'inline', color:'#ef4444', marginBottom:'-2px'}} /> using React & MongoDB
        </p>
      </div>
    </footer>
  );
}

export default Footer;
