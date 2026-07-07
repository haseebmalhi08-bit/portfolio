import { useState, useEffect, useCallback } from 'react';
import defaultConfig from '../portfolio.config.js';

const STORAGE_KEY = 'portfolio_data';

// Deep merge: localStorage overrides win over defaults
function mergeConfig(defaults, overrides) {
  if (!overrides) return defaults;
  const result = { ...defaults };
  for (const key of Object.keys(overrides)) {
    if (
      typeof overrides[key] === 'object' &&
      !Array.isArray(overrides[key]) &&
      overrides[key] !== null
    ) {
      result[key] = { ...defaults[key], ...overrides[key] };
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

export function usePortfolioData() {
  const loadFromStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const [overrides, setOverrides] = useState(loadFromStorage);
  const config = mergeConfig(defaultConfig, overrides);

  const saveSection = useCallback((section, data) => {
    setOverrides((prev) => {
      const next = { ...(prev || {}), [section]: data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOverrides(null);
  }, []);

  return { config, saveSection, resetAll };
}
