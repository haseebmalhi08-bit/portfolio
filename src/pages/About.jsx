import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Award, Code, Zap } from 'lucide-react';
import '../styles.css';

function About() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-container">
      <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <div className="logo-cube">
              <div className="cube-face front">H</div>
              <div className="cube-face back">U</div>
              <div className="cube-face right">R</div>
              <div className="cube-face left">E</div>
              <div className="cube-face top">H</div>
              <div className="cube-face bottom">A</div>
            </div>
            <span className="logo-text">Haseeb</span>
          </Link>

          <div className="navbar-menu">
            <Link to="/" className="nav-item">
              <span className="nav-item-text">Home</span>
            </Link>
            <Link to="/about" className="nav-item nav-active">
              <span className="nav-item-text">About</span>
            </Link>
            <Link to="/skills" className="nav-item">
              <span className="nav-item-text">Skills</span>
            </Link>
            <Link to="/projects" className="nav-item">
              <span className="nav-item-text">Projects</span>
            </Link>
            <Link to="/contact" className="nav-item">
              <span className="nav-item-text">Contact</span>
            </Link>
          </div>
        </div>
      </nav>

      <section className="page-hero about-hero">
        <div className="section-container">
          <h1 className="page-title-3d">
            <span className="title-word" style={{ animationDelay: '0s' }}>About</span>
            <span className="title-word gradient-text" style={{ animationDelay: '0.2s' }}>Me</span>
          </h1>

          <div className="about-content">
            <div className="about-card card-3d">
              <div className="card-glow"></div>
              <User className="about-icon" size={48} />
              <h3>Creative Problem Solver</h3>
              <p>
                I'm Haseeb Ur Rehman, a passionate developer with 5+ years of experience
                building innovative web applications. I specialize in creating immersive
                3D experiences and modern, performant interfaces that users love.
              </p>
              <p>
                My approach combines technical excellence with creative design thinking,
                ensuring every project is not just functional, but memorable and engaging.
              </p>
            </div>

            <div className="stats-grid">
              {[
                { number: '50+', label: 'Projects Completed' },
                { number: '5+', label: 'Years Experience' },
                { number: '30+', label: 'Happy Clients' },
                { number: '15+', label: 'Awards Won' }
              ].map((stat, index) => (
                <div key={index} className="stat-card card-3d" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="card-glow"></div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Haseeb Ur Rehman. Crafted with 💜 and cutting-edge tech.</p>
        </div>
      </footer>
    </div>
  );
}

export default About;
