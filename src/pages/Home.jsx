import React from 'react';
import {
  ArrowUpRight, Award, BriefcaseBusiness, Code2, GraduationCap, Layers3, Mail, UserRound,
} from 'lucide-react';
import Hero from '../components/Hero.jsx';

const PORTFOLIO_PAGES = [
  { id: 'about', label: 'About', description: 'A little about my background and approach.', icon: UserRound },
  { id: 'skills', label: 'Skills', description: 'The tools and technologies I work with.', icon: Code2 },
  { id: 'projects', label: 'Projects', description: 'Selected work and things I have built.', icon: Layers3 },
  { id: 'experience', label: 'Experience', description: 'My professional work and experience.', icon: BriefcaseBusiness },
  { id: 'education', label: 'Education', description: 'My academic background and learning.', icon: GraduationCap },
  { id: 'certificates', label: 'Certificates', description: 'Professional certifications and achievements.', icon: Award },
];

function Home({ config, onNavigate }) {
  return (
    <>
      <Hero config={config} onNavigate={onNavigate} />
      <section className="home-explore" aria-labelledby="home-explore-title">
        <div className="section-container">
          <div className="home-explore-heading">
            <div>
              <span className="section-label">Explore my portfolio</span>
              <h2 className="section-title" id="home-explore-title">A little more about my work</h2>
            </div>
            <button type="button" className="home-contact-link" onClick={() => onNavigate('contact')}>
              Get in touch <Mail size={16} />
            </button>
          </div>
          <div className="home-explore-grid">
            {PORTFOLIO_PAGES.map(({ id, label, description, icon: Icon }) => (
              <button
                type="button"
                key={id}
                className="home-explore-card"
                onClick={() => onNavigate(id)}
              >
                <span className="home-explore-icon"><Icon size={20} /></span>
                <span className="home-explore-copy">
                  <span className="home-explore-title">{label}</span>
                  <span className="home-explore-description">{description}</span>
                </span>
                <ArrowUpRight className="home-explore-arrow" size={18} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
