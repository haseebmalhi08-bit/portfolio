import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';

function Navbar({ config, scrollY, activeSection, onNavigate, onThemeToggle, isDark, onAdminClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { personal } = config;

  const navSections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certificates', 'services', 'contact'];

  const handleNav = (section) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-mark">
            <div className="cube-face front">{personal.logo}</div>
            <div className="cube-face back">{personal.logo}</div>
            <div className="cube-face right">{personal.logo}</div>
            <div className="cube-face left">{personal.logo}</div>
            <div className="cube-face top">{personal.logo}</div>
            <div className="cube-face bottom">{personal.logo}</div>
          </div>
          <span className="logo-text">{personal.logoText}</span>
        </Link>

        {/* Desktop Nav */}
        <div className={`navbar-menu ${isMenuOpen ? 'menu-open' : ''}`}>
          {navSections.map((section, index) => (
            <button
              key={section}
              id={`nav-${section}`}
              className={`nav-item ${activeSection === section ? 'nav-active' : ''}`}
              aria-current={activeSection === section ? 'page' : undefined}
              onClick={() => handleNav(section)}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <span className="nav-item-bg"></span>
              <span className="nav-item-text">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            className="theme-toggle"
            onClick={onThemeToggle}
            title="Toggle dark/light mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Admin Button */}
          {onAdminClick && (
            <button
              id="admin-access-btn"
              className="admin-access-btn"
              onClick={onAdminClick}
              title="Admin Panel (Ctrl+Shift+E)"
            >
              <Settings size={18} />
            </button>
          )}

          {/* Hamburger */}
          <button
            id="menu-toggle"
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navSections.map((section) => (
            <button
              key={section}
              className={`mobile-nav-item ${activeSection === section ? 'nav-active' : ''}`}
              aria-current={activeSection === section ? 'page' : undefined}
              onClick={() => handleNav(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          {onAdminClick && (
            <button className="mobile-nav-item mobile-admin-btn" onClick={() => { onAdminClick(); setIsMenuOpen(false); }}>
              ⚙️ Admin Panel
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
