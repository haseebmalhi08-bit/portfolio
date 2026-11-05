import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { usePortfolioData } from './hooks/usePortfolioData.js';
import Navbar         from './components/Navbar.jsx';
import About          from './components/About.jsx';
import Skills         from './components/Skills.jsx';
import Services       from './components/Services.jsx';
import Experience     from './components/Experience.jsx';
import Education      from './components/Education.jsx';
import Projects       from './components/Projects.jsx';
import Certificates   from './components/Certificates.jsx';
import Contact        from './components/Contact.jsx';
import Footer         from './components/Footer.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Home           from './pages/Home.jsx';
import './styles.css';

function App() {
  const { config, loading, error, saveSection, adminLogin, adminLogout, isLoggedIn, sendContactForm } = usePortfolioData();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrollY,       setScrollY       ] = useState(0);
  const [adminOpen,     setAdminOpen]     = useState(false);
  const [pwdPrompt,     setPwdPrompt]     = useState(false);
  const [pwdInput,      setPwdInput]      = useState('');
  const [pwdError,      setPwdError]      = useState('');
  const [pwdLoading,    setPwdLoading]    = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('portfolio-theme') !== 'light');

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDark);
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const activeSection = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Apply SEO when config loads
  useEffect(() => {
    if (!config) return;
    const pageTitle = activeSection === 'home'
      ? config.seo?.siteTitle
      : `${activeSection.charAt(0).toUpperCase()}${activeSection.slice(1)} | ${config.personal.name}`;
    document.title = pageTitle || 'Portfolio';
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta('description', config.seo?.description || '');
    setMeta('keywords',    config.seo?.keywords    || '');

    // Open Graph
    const setOgMeta = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
      el.content = content;
    };
    setOgMeta('og:title',       config.seo?.siteTitle   || '');
    setOgMeta('og:description', config.seo?.description || '');
    if (config.seo?.ogImage) setOgMeta('og:image', config.seo.ogImage);

    // Apply theme colors
    const root = document.documentElement;
    root.style.setProperty('--primary',   config.theme?.primaryColor   || '#6366f1');
    root.style.setProperty('--secondary', config.theme?.secondaryColor || '#ec4899');
    root.style.setProperty('--accent',    config.theme?.accentColor    || '#8b5cf6');
    root.style.setProperty('--bg-dark',   config.theme?.darkBg         || '#0d0d14');
    root.style.setProperty('--bg-darker', config.theme?.darkerBg       || '#080810');
  }, [activeSection, config]);

  // Track scroll position for the fixed navigation.
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Keyboard shortcut: Ctrl+Shift+E → admin
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        if (adminOpen) {
          setAdminOpen(false);
        } else if (isLoggedIn()) {
          setAdminOpen(true);
        } else {
          setPwdInput('');
          setPwdError('');
          setPwdPrompt(true);
        }
      }
      if (e.key === 'Escape') { setAdminOpen(false); setPwdPrompt(false); }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKey);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('keydown', handleKey); };
  }, [adminOpen, isLoggedIn]);

  const navigateToPage = (page) => navigate(page === 'home' ? '/' : `/${page}`);

  const handleLogin = async (e) => {
    e.preventDefault();
    setPwdLoading(true);
    setPwdError('');
    try {
      await adminLogin(pwdInput);
      setPwdPrompt(false);
      setPwdInput('');
      setAdminOpen(true);
    } catch (err) {
      setPwdError(err.message || 'Wrong password!');
    } finally {
      setPwdLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loader-ring"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  // Error state — should not happen with static fallback
  if (error || !config) {
    return (
      <div className="app-loading">
        <div className="loader-ring"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar
        config={config}
        scrollY={scrollY}
        activeSection={activeSection}
        onNavigate={navigateToPage}
        isDark={isDark}
        onThemeToggle={() => setIsDark(dark => !dark)}
        onAdminClick={() => {
          if (isLoggedIn()) {
            setAdminOpen(true);
          } else {
            setPwdInput('');
            setPwdError('');
            setPwdPrompt(true);
          }
        }}
      />

      <main className="route-page">
        <Routes>
          <Route path="/" element={<Home config={config} onNavigate={navigateToPage} />} />
          <Route path="/about" element={<About config={config} />} />
          <Route path="/skills" element={<Skills config={config} />} />
          <Route path="/services" element={<Services config={config} />} />
          <Route path="/experience" element={<Experience config={config} />} />
          <Route path="/education" element={<Education config={config} />} />
          <Route path="/projects" element={<Projects config={config} />} />
          <Route path="/certificates" element={<Certificates config={config} />} />
          <Route path="/contact" element={<Contact config={config} sendContactForm={sendContactForm} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer       config={config} />

      {/* Password Prompt */}
      {pwdPrompt && (
        <div className="overlay" onClick={() => setPwdPrompt(false)}>
          <div className="pwd-modal" onClick={e => e.stopPropagation()}>
            <div className="pwd-modal-icon">🔐</div>
            <h3>Admin Access</h3>
            <p>Enter password to edit portfolio</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                className={`pwd-input ${pwdError ? 'input-error' : ''}`}
                placeholder="Enter password..."
                value={pwdInput}
                onChange={e => { setPwdInput(e.target.value); setPwdError(''); }}
                autoFocus
              />
              {pwdError && <p className="error-msg">{pwdError}</p>}
              <button type="submit" className="btn-primary" disabled={pwdLoading}>
                {pwdLoading ? 'Verifying...' : 'Unlock →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {adminOpen && (
        <AdminDashboard
          config={config}
          saveSection={saveSection}
          onClose={() => setAdminOpen(false)}
          onLogout={() => { adminLogout(); setAdminOpen(false); }}
        />
      )}
    </div>
  );
}

export default App;
