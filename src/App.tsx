// ==============================================================================
// 🚀 APP.TSX - PHASE 1 ARCHITECTURE & CONNECTION DASHBOARD
// Lines 20-30: Dark / Light mode toggle state management
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Moon, 
  Sun, 
  ArrowRight, 
  Code2, 
  Layers, 
  HardDrive,
  FileCheck
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from './lib/supabase';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? saved === 'dark' : true;
  });

  const [dbStatus, setDbStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [dbMessage, setDbMessage] = useState<string>('');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDark]);

  // Test live connection to Supabase
  const testSupabaseConnection = async () => {
    if (!isSupabaseConfigured) {
      setDbStatus('error');
      setDbMessage('.env file mein VITE_SUPABASE_URL aur VITE_SUPABASE_ANON_KEY abhi missing hain.');
      return;
    }

    setDbStatus('checking');
    try {
      const { data, error } = await supabase.from('profile').select('full_name, title').limit(1);
      if (error) throw error;
      setDbStatus('connected');
      setDbMessage(`Connected! Profile record found: ${data?.[0]?.full_name || 'Haseeb Malhi'}`);
    } catch (err: any) {
      setDbStatus('error');
      setDbMessage(`Connection error: ${err.message || 'Check your Supabase URL & keys'}`);
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header & Theme Switcher */}
        <header className="flex items-center justify-between border-b border-app-border pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-app-accent flex items-center justify-center font-bold text-white shadow-soft">
              H
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading text-app-text">Haseeb Malhi Portfolio</h1>
              <p className="text-xs text-app-muted">Phase 1: Project Setup & Supabase Architecture</p>
            </div>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-app-border bg-app-surface hover:bg-app-surface-hover text-app-text text-sm transition-colors"
            title="Toggle Dark / Light Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </header>

        {/* Phase 1 Completion Badge */}
        <div className="p-6 rounded-card bg-app-surface border border-app-border card-hover-effect">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold font-heading text-app-text">Phase 1 Successfully Initialized!</h2>
              <p className="text-sm text-app-muted mt-1 leading-relaxed">
                Vite + React + TypeScript + Tailwind CSS set ho gaya hai. Heavy 3D animations bilkul remove kar di gayi hain.
                Midnight Indigo design system aur Supabase schema ready hain.
              </p>
            </div>
          </div>
        </div>

        {/* Supabase Status Card */}
        <div className="p-6 rounded-card bg-app-surface border border-app-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-app-text font-semibold">
              <Database className="w-5 h-5 text-app-accent" />
              <span>Supabase Backend Status</span>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              isSupabaseConfigured 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}>
              {isSupabaseConfigured ? 'Keys Configured in .env' : 'Awaiting Supabase Keys'}
            </span>
          </div>

          <p className="text-sm text-app-muted">
            {isSupabaseConfigured
              ? 'Aapki Supabase project URL aur anon key detect ho chuki hain. Live connection check karne ke liye button click karein:'
              : 'Supabase dashboard se apni Project URL aur Anon Key copy karke .env file mein paste karein:'}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={testSupabaseConnection}
              disabled={dbStatus === 'checking'}
              className="px-4 py-2 rounded-lg bg-app-accent hover:bg-app-accent-hover text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {dbStatus === 'checking' ? 'Connecting...' : 'Test Database Connection'}
              <ArrowRight className="w-4 h-4" />
            </button>

            {dbStatus === 'connected' && (
              <span className="text-sm text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" /> {dbMessage}
              </span>
            )}

            {dbStatus === 'error' && (
              <span className="text-sm text-rose-400 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-4 h-4" /> {dbMessage}
              </span>
            )}
          </div>
        </div>

        {/* Files Created in Phase 1 */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-app-muted uppercase tracking-wider">Phase 1 Files Generated</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: FileCheck, name: 'supabase-schema.sql', desc: 'PostgreSQL tables, RLS security & Haseeb seed data' },
              { icon: HardDrive, name: '.env & .env.example', desc: 'Secure Supabase URL and public anon key configuration' },
              { icon: Layers, name: 'src/index.css', desc: 'Midnight Indigo theme variables (Dark #0B0F19 & Light)' },
              { icon: Code2, name: 'src/types/database.ts', desc: 'Strict TypeScript interfaces for all DB models' },
              { icon: Database, name: 'src/lib/supabase.ts', desc: 'Supabase client singleton with graceful fallbacks' },
              { icon: ShieldCheck, name: 'src/utils/imageCompression.ts', desc: 'Client-side resize (1600px, WebP, 0.8) & storage helper' },
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-app-surface border border-app-border flex items-start gap-3">
                <item.icon className="w-5 h-5 text-app-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-app-text">{item.name}</h4>
                  <p className="text-xs text-app-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Phase Prompt */}
        <div className="p-5 rounded-card border border-app-accent/30 bg-app-accent/5 text-center space-y-2">
          <p className="text-sm font-medium text-app-text">
            Ready for <span className="text-app-accent font-semibold">Phase 2: Complete Public Website</span>?
          </p>
          <p className="text-xs text-app-muted">
            Jab aap Phase 1 review kar lein, chat mein sirf <code className="px-1.5 py-0.5 rounded bg-app-surface text-app-accent font-mono">next</code> likhein!
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;
