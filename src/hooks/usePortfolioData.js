import { useState, useEffect } from 'react';
import staticConfig from '../portfolio.config.js';

const API_BASE = import.meta.env.VITE_API_URL || '';

export function usePortfolioData() {
  const [config, setConfig]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    // If no backend URL configured, use static config directly
    if (!API_BASE) {
      setConfig(staticConfig);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${API_BASE}/api/portfolio`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error('Failed to fetch portfolio data');
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      // Backend unavailable — fall back to static config
      console.warn('Backend unavailable, using static config:', err.message);
      setConfig(staticConfig);
    } finally {
      setLoading(false);
    }
  }

  // Admin: login and get JWT token
  async function adminLogin(password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    localStorage.setItem('admin_token', data.token);
    // Store timestamp for expiry awareness
    localStorage.setItem('admin_token_at', Date.now().toString());
    return data.token;
  }

  // Admin: save a section to MongoDB
  async function saveSection(section, sectionData) {
    const token = localStorage.getItem('admin_token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE}/api/portfolio/${section}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(sectionData),
    });

    const data = await res.json();
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_token_at');
      throw new Error('Session expired. Please log in again.');
    }
    if (!res.ok) throw new Error(data.message || 'Save failed');

    // Refresh config after save
    await fetchPortfolio();
    return data;
  }

  // Send contact form email
  async function sendContactForm(formData) {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send message');
    return data;
  }

  // Admin: logout
  function adminLogout() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_token_at');
  }

  // Check if admin token is still in storage (12h JWT lifetime)
  function isLoggedIn() {
    const token = localStorage.getItem('admin_token');
    const tokenAt = localStorage.getItem('admin_token_at');
    if (!token || !tokenAt) return false;
    // Auto-clear after 12 hours
    const elapsed = Date.now() - parseInt(tokenAt, 10);
    if (elapsed > 12 * 60 * 60 * 1000) {
      adminLogout();
      return false;
    }
    return true;
  }

  return { config, loading, error, saveSection, adminLogin, adminLogout, isLoggedIn, sendContactForm, refetch: fetchPortfolio };
}
