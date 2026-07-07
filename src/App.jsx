import React, { useState, useEffect } from 'react';
import { usePortfolioData } from './hooks/usePortfolioData.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Services from './components/Services.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import './styles.css';

// Apply theme CSS custom properties from config
function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--primary',   theme.primaryColor);
  root.style.setProperty('--secondary', theme.secondaryColor);
  root.style.setProperty('--accent',    theme.accentColor);
  root.style.setProperty('--bg-dark',   theme.darkBg);
  root.style.setProperty('--bg-darker', theme.darkerBg);
  const hex = theme.primaryColor.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  root.style.setProperty('--glow', `rgba(${r},${g},${b},0.5)`);
}

function applySEO(seo) {
  document.title = seo.siteTitle;
  const setMeta = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
    el.content = content;
  };
  setMeta('description', seo.description);
  setMeta('keywords',    seo.keywords);
}

function App() {
  const { config, saveSection, resetAll } = usePortfolioData();

  const [isDark,       setIsDark]       = useState(config.theme.defaultMode === 'dark');
  const [activeSection,setActiveSection] = useState('home');
  const [mousePosition,setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY,      setScrollY]       = useState(0);
  const [adminOpen,    setAdminOpen]     = useState(false);
  const [pwdPrompt,    setPwdPrompt]     = useState(false);
  const [pwdInput,     setPwdInput]      = useState('');
  const [pwdError,     setPwdError]      = useState(false);


  // Apply theme + SEO
  useEffect(() => {
    applyTheme(config.theme);
    applySEO(config.seo);
  }, [config]);

  // Dark / light mode
  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !isDark);
  }, [isDark]);

  // Scroll + mouse tracking
  useEffect(() => {
    const sections = ['home','about','skills','services','experience','education','projects','contact'];
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const current = sections.find((s) => {
        const el = document.getElementById(s);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 120 && r.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth  - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    // Secret keyboard shortcut: Ctrl+Shift+E → password prompt
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        if (adminOpen) {
          setAdminOpen(false);
        } else {
          setPwdInput('');
          setPwdError(false);
          setPwdPrompt(true);
        }
      }
      if (e.key === 'Escape') {
        setAdminOpen(false);
        setPwdPrompt(false);
      }
    };
    window.addEventListener('scroll',    handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown',   handleKey);
    return () => {
      window.removeEventListener('scroll',    handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown',   handleKey);
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <Navbar
        config={config}
        scrollY={scrollY}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onThemeToggle={() => setIsDark((p) => !p)}
        isDark={isDark}
      />

      <Hero       config={config} mousePosition={mousePosition} onNavigate={scrollToSection} />
      <About      config={config} />
      <Skills     config={config} />
      <Services   config={config} />
      <Experience config={config} />
      <Education  config={config} />
      <Projects   config={config} />
      <Contact    config={config} />
      <Footer     config={config} />

      {/* ── Password Prompt Modal ── */}
      {pwdPrompt && (
        <div className="pwd-overlay" onClick={() => setPwdPrompt(false)}>
          <div className="pwd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pwd-icon">🔐</div>
            <h3 className="pwd-title">Admin Access</h3>
            <p className="pwd-subtitle">Enter your password to edit portfolio</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (pwdInput === config.adminPassword) {
                setPwdPrompt(false);
                setPwdInput('');
                setPwdError(false);
                setAdminOpen(true);
              } else {
                setPwdError(true);
                setPwdInput('');
              }
            }}>
              <input
                id="admin-password-input"
                type="password"
                className={`pwd-input ${pwdError ? 'pwd-input-error' : ''}`}
                placeholder="Enter password..."
                value={pwdInput}
                onChange={(e) => { setPwdInput(e.target.value); setPwdError(false); }}
                autoFocus
              />
              {pwdError && (
                <p className="pwd-error">❌ Wrong password! Try again.</p>
              )}
              <button type="submit" className="pwd-btn">Unlock ✓</button>
            </form>
          </div>
        </div>
      )}

      {/* ── Admin Panel (only shown after correct password) ── */}
      {adminOpen && (
        <AdminPanel
          config={config}
          saveSection={saveSection}
          resetAll={resetAll}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
