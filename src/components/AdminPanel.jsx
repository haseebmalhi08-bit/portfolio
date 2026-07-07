import React, { useState } from 'react';
import {
  X, Save, Plus, Trash2, Edit3, ChevronDown, ChevronUp,
  User, Mail, Wrench, FolderOpen, RotateCcw, Check, AlertCircle
} from 'lucide-react';

/* ─── tiny helpers ─── */
const Input = ({ label, value, onChange, type = 'text', placeholder = '' }) => (
  <div className="ap-field">
    <label className="ap-label">{label}</label>
    <input
      type={type}
      className="ap-input"
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Textarea = ({ label, value, onChange, rows = 3, placeholder = '' }) => (
  <div className="ap-field">
    <label className="ap-label">{label}</label>
    <textarea
      className="ap-input ap-textarea"
      rows={rows}
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

/* ─── TABS ─── */
const TABS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'contact',  label: 'Contact',  icon: Mail },
  { id: 'skills',   label: 'Skills',   icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
];

/* ============================================================
   PERSONAL TAB
   ============================================================ */
function PersonalTab({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  return (
    <div className="ap-tab-content">
      <Input label="Full Name"     value={data.name}        onChange={(v) => set('name', v)} />
      <div className="ap-row">
        <Input label="First Name"  value={data.firstName}   onChange={(v) => set('firstName', v)} />
        <Input label="Last Name"   value={data.lastName}    onChange={(v) => set('lastName', v)} />
      </div>
      <Input label="Tagline"       value={data.tagline}     onChange={(v) => set('tagline', v)} placeholder="Developer & Designer" />
      <Textarea label="Subtitle"   value={data.subtitle}    onChange={(v) => set('subtitle', v)} rows={2} />
      <Input label="Availability Badge" value={data.availability} onChange={(v) => set('availability', v)} placeholder="Available for Projects" />
      <Input label="Logo Letter"   value={data.logo}        onChange={(v) => set('logo', v)} placeholder="H" />
      <Input label="Logo Text"     value={data.logoText}    onChange={(v) => set('logoText', v)} placeholder="Haseeb" />
      <Input label="Location"      value={data.location}    onChange={(v) => set('location', v)} />
      <Input label="Resume Link"   value={data.resumeLink}  onChange={(v) => set('resumeLink', v)} placeholder="https://.../resume.pdf" />

      <div className="ap-divider">Social Links</div>
      {['github','linkedin','twitter','instagram','youtube','facebook'].map((platform) => (
        <Input
          key={platform}
          label={platform.charAt(0).toUpperCase() + platform.slice(1)}
          value={data[`social_${platform}`] ?? data?.social?.[platform] ?? ''}
          onChange={(v) => set(`social_${platform}`, v)}
          placeholder={`https://${platform}.com/yourname`}
        />
      ))}
    </div>
  );
}

/* ============================================================
   CONTACT TAB
   ============================================================ */
function ContactTab({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  return (
    <div className="ap-tab-content">
      <Input label="Email"   value={data.email}   onChange={(v) => set('email', v)}   type="email" placeholder="you@example.com" />
      <Input label="Phone"   value={data.phone}   onChange={(v) => set('phone', v)}   placeholder="+92-300-1234567" />
      <Input label="Website" value={data.website} onChange={(v) => set('website', v)} placeholder="https://yoursite.com" />

      <div className="ap-divider">About Me</div>
      <Input label="Heading" value={data.aboutHeading} onChange={(v) => set('aboutHeading', v)} placeholder="Creative Problem Solver" />
      <Textarea label="Bio Paragraph 1" value={data.bio0} onChange={(v) => set('bio0', v)} rows={3} />
      <Textarea label="Bio Paragraph 2" value={data.bio1} onChange={(v) => set('bio1', v)} rows={3} />

      <div className="ap-divider">Stats</div>
      {[0,1,2,3].map((i) => (
        <div key={i} className="ap-row">
          <Input label={`Stat ${i+1} Number`} value={data[`stat${i}num`]}   onChange={(v) => set(`stat${i}num`, v)} placeholder="50+" />
          <Input label={`Stat ${i+1} Label`}  value={data[`stat${i}label`]} onChange={(v) => set(`stat${i}label`, v)} placeholder="Projects" />
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   SKILLS TAB
   ============================================================ */
const SKILL_COLORS = ['#6366f1','#ec4899','#8b5cf6','#61DAFB','#F7DF1E','#339933','#3178C6','#FF6B6B','#47A248','#3776AB','#06b6d4','#f97316'];

function SkillItem({ skill, index, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (key, val) => onUpdate(index, { ...skill, [key]: val });

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <div className="ap-skill-dot" style={{ background: skill.color || '#6366f1' }}></div>
          <span className="ap-list-title">{skill.name || 'Untitled Skill'}</span>
          <span className="ap-list-meta">{skill.level ?? 80}%</span>
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={(e) => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="ap-list-body">
          <div className="ap-row">
            <Input label="Skill Name" value={skill.name} onChange={(v) => set('name', v)} />
            <Input label="Category"   value={skill.category} onChange={(v) => set('category', v)} placeholder="Frontend" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Level: {skill.level ?? 80}%</label>
            <input type="range" min="0" max="100" value={skill.level ?? 80}
              onChange={(e) => set('level', Number(e.target.value))} className="ap-range" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Color</label>
            <div className="ap-colors">
              {SKILL_COLORS.map((c) => (
                <button key={c} className={`ap-color-swatch ${skill.color === c ? 'active' : ''}`}
                  style={{ background: c }} onClick={() => set('color', c)} />
              ))}
              <input type="color" value={skill.color || '#6366f1'}
                onChange={(e) => set('color', e.target.value)} className="ap-color-picker" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsTab({ skills, onSave }) {
  const [list, setList] = useState([...skills]);

  const update = (i, val) => setList((prev) => prev.map((s, idx) => idx === i ? val : s));
  const remove = (i) => setList((prev) => prev.filter((_, idx) => idx !== i));
  const add = () => setList((prev) => [
    ...prev,
    { name: 'New Skill', level: 75, color: '#6366f1', category: 'Frontend' }
  ]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} skills</span>
        <button className="ap-add-btn" onClick={add}>
          <Plus size={14} /> Add Skill
        </button>
      </div>

      <div className="ap-list">
        {list.map((skill, i) => (
          <SkillItem key={i} skill={skill} index={i} onUpdate={update} onDelete={remove} />
        ))}
      </div>

      <button className="ap-save-section" onClick={() => onSave('skills', list)}>
        <Save size={16} /> Save Skills
      </button>
    </div>
  );
}

/* ============================================================
   PROJECTS TAB
   ============================================================ */
const PROJECT_GRADIENTS = [
  'linear-gradient(135deg, #6366f1, #ec4899)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #10b981, #14b8a6)',
  'linear-gradient(135deg, #f97316, #ef4444)',
  'linear-gradient(135deg, #8b5cf6, #6366f1)',
  'linear-gradient(135deg, #f59e0b, #f97316)',
];

function ProjectItem({ project, index, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (key, val) => onUpdate(index, { ...project, [key]: val });
  const techStr = (project.tech || []).join(', ');

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <span className="ap-project-emoji">{project.emoji || '🚀'}</span>
          <span className="ap-list-title">{project.title || 'Untitled Project'}</span>
          {project.featured && <span className="ap-featured-tag">⭐</span>}
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={(e) => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {open && (
        <div className="ap-list-body">
          <div className="ap-row">
            <Input label="Project Title" value={project.title} onChange={(v) => set('title', v)} />
            <Input label="Emoji"         value={project.emoji} onChange={(v) => set('emoji', v)} placeholder="🚀" />
          </div>
          <Textarea label="Description" value={project.description} onChange={(v) => set('description', v)} rows={2} />
          <Input label="Tech Stack (comma separated)" value={techStr}
            onChange={(v) => set('tech', v.split(',').map((t) => t.trim()).filter(Boolean))}
            placeholder="React, Node.js, MongoDB" />
          <div className="ap-row">
            <Input label="GitHub Link" value={project.githubLink} onChange={(v) => set('githubLink', v)} placeholder="https://github.com/..." />
            <Input label="Live Link"   value={project.liveLink}   onChange={(v) => set('liveLink', v)}   placeholder="https://demo.com" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Gradient</label>
            <div className="ap-colors">
              {PROJECT_GRADIENTS.map((g, gi) => (
                <button key={gi} className={`ap-gradient-swatch ${project.gradient === g ? 'active' : ''}`}
                  style={{ background: g }} onClick={() => set('gradient', g)} />
              ))}
            </div>
          </div>
          <div className="ap-field">
            <label className="ap-label ap-checkbox-label">
              <input type="checkbox" checked={!!project.featured}
                onChange={(e) => set('featured', e.target.checked)} className="ap-checkbox" />
              Mark as Featured ⭐
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectsTab({ projects, onSave }) {
  const [list, setList] = useState([...projects]);

  const update = (i, val) => setList((prev) => prev.map((p, idx) => idx === i ? val : p));
  const remove = (i) => setList((prev) => prev.filter((_, idx) => idx !== i));
  const add = () => setList((prev) => [
    ...prev,
    { title: 'New Project', description: '', tech: [], emoji: '🚀',
      githubLink: '', liveLink: '', gradient: PROJECT_GRADIENTS[0], featured: false }
  ]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} projects</span>
        <button className="ap-add-btn" onClick={add}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      <div className="ap-list">
        {list.map((project, i) => (
          <ProjectItem key={i} project={project} index={i} onUpdate={update} onDelete={remove} />
        ))}
      </div>

      <button className="ap-save-section" onClick={() => onSave('projects', list)}>
        <Save size={16} /> Save Projects
      </button>
    </div>
  );
}

/* ============================================================
   MAIN ADMIN PANEL
   ============================================================ */
function AdminPanel({ config, saveSection, resetAll, onClose }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [toast, setToast] = useState(null);

  // Flatten personal + social for PersonalTab
  const personalFlat = {
    ...config.personal,
    ...Object.fromEntries(
      Object.entries(config.social).map(([k, v]) => [`social_${k}`, v])
    ),
  };

  const contactFlat = {
    ...config.contact,
    aboutHeading: config.about.heading,
    bio0: config.about.bio[0] ?? '',
    bio1: config.about.bio[1] ?? '',
    stat0num: config.about.stats[0]?.number ?? '',
    stat0label: config.about.stats[0]?.label ?? '',
    stat1num: config.about.stats[1]?.number ?? '',
    stat1label: config.about.stats[1]?.label ?? '',
    stat2num: config.about.stats[2]?.number ?? '',
    stat2label: config.about.stats[2]?.label ?? '',
    stat3num: config.about.stats[3]?.number ?? '',
    stat3label: config.about.stats[3]?.label ?? '',
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handlePersonalSave = (flat) => {
    // Separate personal and social
    const personal = {};
    const social = {};
    for (const [k, v] of Object.entries(flat)) {
      if (k.startsWith('social_')) social[k.replace('social_', '')] = v;
      else personal[k] = v;
    }
    saveSection('personal', { ...config.personal, ...personal });
    saveSection('social', { ...config.social, ...social });
    showToast('Personal info saved!');
  };

  const handleContactSave = (flat) => {
    const contact = { email: flat.email, phone: flat.phone, website: flat.website };
    const about = {
      heading: flat.aboutHeading,
      bio: [flat.bio0, flat.bio1].filter(Boolean),
      stats: [
        { number: flat.stat0num, label: flat.stat0label },
        { number: flat.stat1num, label: flat.stat1label },
        { number: flat.stat2num, label: flat.stat2label },
        { number: flat.stat3num, label: flat.stat3label },
      ].filter((s) => s.number),
    };
    saveSection('contact', contact);
    saveSection('about', about);
    showToast('Contact & About saved!');
  };

  const handleSaveSection = (section, data) => {
    saveSection(section, data);
    showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} saved!`);
  };

  const handleReset = () => {
    if (window.confirm('⚠️ Reset all changes to defaults?')) {
      resetAll();
      showToast('Reset to defaults!', 'info');
    }
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <Edit3 size={20} />
            <h2>Edit Portfolio</h2>
          </div>
          <div className="admin-header-right">
            <button className="ap-reset-btn" onClick={handleReset} title="Reset to defaults">
              <RotateCcw size={15} /> Reset
            </button>
            <button className="admin-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
              className={`admin-tab ${activeTab === tab.id ? 'admin-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="admin-body">
          {activeTab === 'personal' && (
            <PersonalTabWrapper data={personalFlat} onSave={handlePersonalSave} />
          )}
          {activeTab === 'contact' && (
            <ContactTabWrapper data={contactFlat} onSave={handleContactSave} />
          )}
          {activeTab === 'skills' && (
            <SkillsTab skills={config.skills} onSave={handleSaveSection} />
          )}
          {activeTab === 'projects' && (
            <ProjectsTab projects={config.projects} onSave={handleSaveSection} />
          )}
        </div>

        {/* Toast */}
        {toast && (
          <div className={`ap-toast ap-toast-${toast.type}`}>
            {toast.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </div>
        )}
      </div>
    </div>
  );
}

/* Stateful wrappers for Personal & Contact tabs */
function PersonalTabWrapper({ data, onSave }) {
  const [local, setLocal] = useState({ ...data });
  return (
    <div>
      <PersonalTab data={local} onChange={setLocal} />
      <button className="ap-save-section" onClick={() => onSave(local)}>
        <Save size={16} /> Save Personal Info
      </button>
    </div>
  );
}

function ContactTabWrapper({ data, onSave }) {
  const [local, setLocal] = useState({ ...data });
  return (
    <div>
      <ContactTab data={local} onChange={setLocal} />
      <button className="ap-save-section" onClick={() => onSave(local)}>
        <Save size={16} /> Save Contact & About
      </button>
    </div>
  );
}

export default AdminPanel;
