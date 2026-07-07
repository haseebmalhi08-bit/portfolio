import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Briefcase, ArrowRight } from 'lucide-react';
import '../styles.css';

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="page-container">
      <nav className="navbar navbar-home">
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
            <Link to="/" className="nav-item nav-active">
              <span className="nav-item-text">Home</span>
            </Link>
            <Link to="/about" className="nav-item">
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

      <section className="page-hero">
        <div className="hero-background">
          <div className="floating-cube cube-1"></div>
          <div className="floating-cube cube-2"></div>
          <div className="floating-cube cube-3"></div>
          <div className="grid-overlay"></div>
        </div>

        <div className="hero-content" style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}>
          <div className="hero-badge">
            <Rocket size={16} />
            <span>Available for Projects</span>
          </div>

          <h1 className="hero-title-3d">
            <span className="title-word" style={{ animationDelay: '0s' }}>Haseeb</span>
            <span className="title-word" style={{ animationDelay: '0.2s' }}>Ur</span>
            <span className="title-word gradient-text" style={{ animationDelay: '0.4s' }}>Rehman</span>
          </h1>

          <p className="hero-subtitle-3d">
            Crafting immersive 3D experiences and cutting-edge web applications
          </p>

          <div className="hero-buttons">
            <Link to="/projects" className="btn-3d btn-primary">
              <span className="btn-content">
                <Briefcase size={20} />
                View Projects
              </span>
              <span className="btn-shine"></span>
            </Link>

            <Link to="/contact" className="btn-3d btn-secondary">
              <span className="btn-content">
                <Mail size={20} />
                Get in Touch
              </span>
              <span className="btn-shine"></span>
            </Link>
          </div>

          <div className="scroll-indicator">
            <p>Click navigation or explore pages</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
