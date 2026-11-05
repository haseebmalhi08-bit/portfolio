import React, { useState, useEffect } from 'react';
import {
  User, Mail, Wrench, FolderOpen, Award, Briefcase, GraduationCap,
  Star, Palette, Search, LogOut, Save, Plus, Trash2, ChevronDown,
  ChevronUp, Check, AlertCircle, Loader, X, Edit3, Home, Menu, Upload
} from 'lucide-react';

/* ─────────────────────────── helpers ─────────────────────────── */

async function prepareProfilePhoto(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Choose a JPG, PNG, or WebP image.');
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error('Choose an image smaller than 8 MB.');
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = objectUrl;
    await image.decode();

    const scale = Math.min(1, 1400 / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not process this image. Please try another file.');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const compressed = await new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Could not process this image. Please try another file.')),
        'image/jpeg',
        0.82
      );
    });
    if (compressed.size > 6 * 1024 * 1024) {
      throw new Error('This image is still too large after compression. Choose a smaller image.');
    }

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read this image. Please try again.'));
      reader.readAsDataURL(compressed);
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

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

const SaveBar = ({ onSave, loading, label = 'Save Changes' }) => (
  <div className="ap-save-bar">
    <button className="ap-save-btn" onClick={onSave} disabled={loading}>
      {loading ? <Loader size={16} className="spin-icon" /> : <Save size={16} />}
      {loading ? 'Saving…' : label}
    </button>
  </div>
);

/* ─────────────────────────── SIDEBAR TABS ─────────────────────────── */
const TABS = [
  { id: 'hero',         label: 'Hero',         icon: Home },
  { id: 'about',        label: 'About',        icon: User },
  { id: 'contact',      label: 'Contact',      icon: Mail },
  { id: 'skills',       label: 'Skills',       icon: Wrench },
  { id: 'projects',     label: 'Projects',     icon: FolderOpen },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'experience',   label: 'Experience',   icon: Briefcase },
  { id: 'education',    label: 'Education',    icon: GraduationCap },
  { id: 'services',     label: 'Services',     icon: Star },
  { id: 'seo',          label: 'SEO & Theme',  icon: Palette },
];

/* ═══════════════════════ HERO TAB ═══════════════════════ */
function HeroTab({ config, onSave, saving }) {
  const [personal, setPersonal] = useState({ ...config.personal });
  const [social,   setSocial]   = useState({ ...config.social });
  const [photoError, setPhotoError] = useState('');

  const setP = (k, v) => setPersonal(p => ({ ...p, [k]: v }));
  const setS = (k, v) => setSocial(s => ({ ...s, [k]: v }));
  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoError('');
    try {
      setP('profilePhoto', await prepareProfilePhoto(file));
    } catch (error) {
      setPhotoError(error.message);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="ap-tab-content">
      <div className="ap-section-title">Personal Info</div>
      <Input label="Full Name"    value={personal.name}        onChange={v => setP('name', v)} />
      <div className="ap-row">
        <Input label="First Name" value={personal.firstName}   onChange={v => setP('firstName', v)} />
        <Input label="Last Name"  value={personal.lastName}    onChange={v => setP('lastName', v)} />
      </div>
      <Input label="Tagline / Role"  value={personal.tagline}     onChange={v => setP('tagline', v)} placeholder="Full Stack Developer" />
      <Textarea label="Subtitle"     value={personal.subtitle}    onChange={v => setP('subtitle', v)} rows={2} />
      <Input label="Availability Badge" value={personal.availability} onChange={v => setP('availability', v)} placeholder="Open to Work" />
      <Input label="Location"       value={personal.location}    onChange={v => setP('location', v)} />
      <div className="ap-field">
        <label className="ap-label">Profile Photo</label>
        <div className="ap-photo-editor">
          {personal.profilePhoto
            ? <img src={personal.profilePhoto} alt="Profile preview" className="ap-photo-preview" />
            : <div className="ap-photo-preview ap-photo-empty">No photo</div>}
          <div className="ap-photo-controls">
            <label className="ap-upload-btn">
              <Upload size={15} /> Upload photo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                aria-label="Upload profile photo"
              />
            </label>
            {personal.profilePhoto && (
              <button type="button" className="ap-remove-photo" onClick={() => setP('profilePhoto', '')}>
                Remove photo
              </button>
            )}
            <span className="ap-photo-hint">JPG, PNG, or WebP; up to 8 MB. Saved with your portfolio.</span>
          </div>
        </div>
        {photoError && <p className="ap-inline-error" role="alert">{photoError}</p>}
      </div>
      <Input label="Profile Photo URL" value={personal.profilePhoto} onChange={v => setP('profilePhoto', v)} placeholder="https://example.com/photo.jpg" />
      <Input label="Resume / CV Link"  value={personal.resumeLink}  onChange={v => setP('resumeLink', v)} placeholder="https://example.com/resume.pdf" />

      <div className="ap-section-title" style={{marginTop:'1.5rem'}}>Social Links</div>
      {['github','linkedin','twitter','instagram','youtube','facebook'].map(platform => (
        <Input
          key={platform}
          label={platform.charAt(0).toUpperCase() + platform.slice(1)}
          value={social[platform] ?? ''}
          onChange={v => setS(platform, v)}
          placeholder={`https://${platform}.com/yourname`}
        />
      ))}

      <SaveBar onSave={async () => { await onSave('personal', personal); await onSave('social', social); }} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ ABOUT TAB ═══════════════════════ */
function AboutTab({ config, onSave, saving }) {
  const [data, setData] = useState({
    heading: config.about?.heading || '',
    bio: [...(config.about?.bio || ['', ''])],
    stats: [...(config.about?.stats || [
      {number:'',label:''},{number:'',label:''},{number:'',label:''},{number:'',label:''}
    ])],
  });

  const setBio = (i, v) => setData(d => { const bio = [...d.bio]; bio[i] = v; return { ...d, bio }; });
  const setStat = (i, k, v) => setData(d => {
    const stats = d.stats.map((s, idx) => idx === i ? { ...s, [k]: v } : s);
    return { ...d, stats };
  });

  return (
    <div className="ap-tab-content">
      <div className="ap-section-title">About Me</div>
      <Input label="Section Heading" value={data.heading} onChange={v => setData(d => ({ ...d, heading: v }))} placeholder="Creative Problem Solver" />
      <Textarea label="Bio Paragraph 1" value={data.bio[0] ?? ''} onChange={v => setBio(0, v)} rows={4} />
      <Textarea label="Bio Paragraph 2" value={data.bio[1] ?? ''} onChange={v => setBio(1, v)} rows={4} />

      <div className="ap-section-title" style={{marginTop:'1.5rem'}}>Stats</div>
      {[0,1,2,3].map(i => (
        <div key={i} className="ap-row">
          <Input label={`Stat ${i+1} Value`} value={data.stats[i]?.number ?? ''} onChange={v => setStat(i,'number',v)} placeholder="50+" />
          <Input label={`Stat ${i+1} Label`} value={data.stats[i]?.label ?? ''}  onChange={v => setStat(i,'label', v)} placeholder="Projects" />
        </div>
      ))}

      <SaveBar onSave={() => onSave('about', data)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ CONTACT TAB ═══════════════════════ */
function ContactTab({ config, onSave, saving }) {
  const [data, setData] = useState({ ...config.contact });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  return (
    <div className="ap-tab-content">
      <div className="ap-section-title">Contact Information</div>
      <Input label="Email"   value={data.email}   onChange={v => set('email', v)}   type="email" placeholder="you@example.com" />
      <Input label="Phone"   value={data.phone}   onChange={v => set('phone', v)}   placeholder="+92-300-1234567" />
      <Input label="Address" value={data.address} onChange={v => set('address', v)} placeholder="Lahore, Punjab, Pakistan" />
      <Input label="Website" value={data.website} onChange={v => set('website', v)} placeholder="https://yoursite.com" />
      <SaveBar onSave={() => onSave('contact', data)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ SKILLS TAB ═══════════════════════ */
const SKILL_COLORS = ['#6366f1','#ec4899','#8b5cf6','#61DAFB','#F7DF1E','#339933','#3178C6','#FF6B6B','#47A248','#3776AB','#06b6d4','#f97316','#E34F26','#F05032','#ffffff'];

function SkillItem({ skill, index, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (k, v) => onUpdate(index, { ...skill, [k]: v });

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <div className="ap-skill-dot" style={{ background: skill.color || '#6366f1' }}></div>
          <span className="ap-list-title">{skill.name || 'Untitled Skill'}</span>
          <span className="ap-list-meta">{skill.level ?? 80}%</span>
          <span className="ap-list-meta" style={{opacity:0.6}}>{skill.category}</span>
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={e => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="ap-list-body">
          <div className="ap-row">
            <Input label="Skill Name" value={skill.name}     onChange={v => set('name', v)} />
            <Input label="Category"   value={skill.category} onChange={v => set('category', v)} placeholder="Frontend" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Level: {skill.level ?? 80}%</label>
            <input type="range" min="0" max="100" value={skill.level ?? 80}
              onChange={e => set('level', Number(e.target.value))} className="ap-range" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Color</label>
            <div className="ap-colors">
              {SKILL_COLORS.map(c => (
                <button key={c} className={`ap-color-swatch ${skill.color === c ? 'active' : ''}`}
                  style={{ background: c, border: c === '#ffffff' ? '1px solid rgba(255,255,255,0.3)' : 'none' }}
                  onClick={() => set('color', c)} />
              ))}
              <input type="color" value={skill.color || '#6366f1'}
                onChange={e => set('color', e.target.value)} className="ap-color-picker" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsTab({ config, onSave, saving }) {
  const [list, setList] = useState([...(config.skills || [])]);
  const update = (i, v) => setList(p => p.map((s, idx) => idx === i ? v : s));
  const remove = (i) => setList(p => p.filter((_, idx) => idx !== i));
  const add = () => setList(p => [...p, { name: 'New Skill', level: 75, color: '#6366f1', category: 'Frontend' }]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} skills</span>
        <button className="ap-add-btn" onClick={add}><Plus size={14} /> Add Skill</button>
      </div>
      <div className="ap-list">
        {list.map((skill, i) => (
          <SkillItem key={i} skill={skill} index={i} onUpdate={update} onDelete={remove} />
        ))}
      </div>
      <SaveBar onSave={() => onSave('skills', list)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ PROJECTS TAB ═══════════════════════ */
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
  const set = (k, v) => onUpdate(index, { ...project, [k]: v });
  const techStr = (project.tech || []).join(', ');

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <span className="ap-project-emoji">{project.emoji || '🚀'}</span>
          <span className="ap-list-title">{project.title || 'Untitled Project'}</span>
          {project.featured && <span className="ap-featured-tag">⭐ Featured</span>}
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={e => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="ap-list-body">
          <div className="ap-row">
            <Input label="Project Title" value={project.title} onChange={v => set('title', v)} />
            <Input label="Emoji"         value={project.emoji} onChange={v => set('emoji', v)} placeholder="🚀" />
          </div>
          <Textarea label="Description" value={project.description} onChange={v => set('description', v)} rows={2} />
          <Input label="Tech Stack (comma separated)" value={techStr}
            onChange={v => set('tech', v.split(',').map(t => t.trim()).filter(Boolean))}
            placeholder="React, Node.js, MongoDB" />
          <Input label="Image URL" value={project.image} onChange={v => set('image', v)} placeholder="https://example.com/screenshot.jpg" />
          <div className="ap-row">
            <Input label="GitHub Link" value={project.githubLink} onChange={v => set('githubLink', v)} placeholder="https://github.com/..." />
            <Input label="Live Link"   value={project.liveLink}   onChange={v => set('liveLink', v)}   placeholder="https://demo.com" />
          </div>
          <div className="ap-field">
            <label className="ap-label">Gradient</label>
            <div className="ap-colors">
              {PROJECT_GRADIENTS.map((g, gi) => (
                <button key={gi}
                  className={`ap-gradient-swatch ${project.gradient === g ? 'active' : ''}`}
                  style={{ background: g }}
                  onClick={() => set('gradient', g)} />
              ))}
            </div>
          </div>
          <div className="ap-field">
            <label className="ap-label ap-checkbox-label">
              <input type="checkbox" checked={!!project.featured}
                onChange={e => set('featured', e.target.checked)} className="ap-checkbox" />
              Mark as Featured ⭐
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectsTab({ config, onSave, saving }) {
  const [list, setList] = useState([...(config.projects || [])]);
  const update = (i, v) => setList(p => p.map((s, idx) => idx === i ? v : s));
  const remove = (i) => setList(p => p.filter((_, idx) => idx !== i));
  const add = () => setList(p => [...p, { title: 'New Project', description: '', tech: [], emoji: '🚀', image: '', githubLink: '', liveLink: '', gradient: PROJECT_GRADIENTS[0], featured: false }]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} projects</span>
        <button className="ap-add-btn" onClick={add}><Plus size={14} /> Add Project</button>
      </div>
      <div className="ap-list">
        {list.map((p, i) => <ProjectItem key={i} project={p} index={i} onUpdate={update} onDelete={remove} />)}
      </div>
      <SaveBar onSave={() => onSave('projects', list)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ CERTIFICATES TAB ═══════════════════════ */
function CertItem({ cert, index, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (k, v) => onUpdate(index, { ...cert, [k]: v });

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <span className="ap-project-emoji">🏆</span>
          <span className="ap-list-title">{cert.title || 'Untitled Certificate'}</span>
          {cert.issuer && <span className="ap-list-meta">{cert.issuer}</span>}
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={e => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="ap-list-body">
          <Input label="Certificate Title"   value={cert.title}    onChange={v => set('title', v)} />
          <div className="ap-row">
            <Input label="Issuing Organization" value={cert.issuer} onChange={v => set('issuer', v)} placeholder="Udemy" />
            <Input label="Date"                 value={cert.date}   onChange={v => set('date', v)}  placeholder="Jan 2024" />
          </div>
          <Input label="Certificate Image URL" value={cert.imageUrl} onChange={v => set('imageUrl', v)} placeholder="https://example.com/cert.jpg" />
          <Input label="Certificate File/Link URL" value={cert.fileUrl} onChange={v => set('fileUrl', v)} placeholder="https://udemy.com/certificate/..." />
        </div>
      )}
    </div>
  );
}

function CertificatesTab({ config, onSave, saving }) {
  const [list, setList] = useState([...(config.certificates || [])]);
  const update = (i, v) => setList(p => p.map((s, idx) => idx === i ? v : s));
  const remove = (i) => setList(p => p.filter((_, idx) => idx !== i));
  const add = () => setList(p => [...p, { title: 'New Certificate', issuer: '', date: '', imageUrl: '', fileUrl: '' }]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} certificates</span>
        <button className="ap-add-btn" onClick={add}><Plus size={14} /> Add Certificate</button>
      </div>
      <div className="ap-list">
        {list.map((c, i) => <CertItem key={i} cert={c} index={i} onUpdate={update} onDelete={remove} />)}
      </div>
      <SaveBar onSave={() => onSave('certificates', list)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ EXPERIENCE TAB ═══════════════════════ */
function ExpItem({ exp, index, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (k, v) => onUpdate(index, { ...exp, [k]: v });
  const techStr = (exp.tech || []).join(', ');

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <span className="ap-project-emoji">💼</span>
          <span className="ap-list-title">{exp.role || 'Untitled Role'}</span>
          {exp.company && <span className="ap-list-meta">@ {exp.company}</span>}
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={e => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="ap-list-body">
          <div className="ap-row">
            <Input label="Company / Organization" value={exp.company}  onChange={v => set('company', v)} />
            <Input label="Job Title / Role"        value={exp.role}     onChange={v => set('role', v)} />
          </div>
          <div className="ap-row">
            <Input label="Duration" value={exp.duration} onChange={v => set('duration', v)} placeholder="Jan 2023 – Present" />
            <Input label="Location" value={exp.location} onChange={v => set('location', v)} placeholder="Remote" />
          </div>
          <Input label="Type" value={exp.type} onChange={v => set('type', v)} placeholder="Full-time / Freelance / Internship" />
          <Textarea label="Description" value={exp.description} onChange={v => set('description', v)} rows={3} />
          <Input label="Tech Used (comma separated)" value={techStr}
            onChange={v => set('tech', v.split(',').map(t => t.trim()).filter(Boolean))}
            placeholder="React, Node.js, MongoDB" />
        </div>
      )}
    </div>
  );
}

function ExperienceTab({ config, onSave, saving }) {
  const [list, setList] = useState([...(config.experience || [])]);
  const update = (i, v) => setList(p => p.map((s, idx) => idx === i ? v : s));
  const remove = (i) => setList(p => p.filter((_, idx) => idx !== i));
  const add = () => setList(p => [...p, { company: '', role: 'New Role', duration: '', location: '', description: '', tech: [], type: 'Full-time' }]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} entries</span>
        <button className="ap-add-btn" onClick={add}><Plus size={14} /> Add Experience</button>
      </div>
      <div className="ap-list">
        {list.map((e, i) => <ExpItem key={i} exp={e} index={i} onUpdate={update} onDelete={remove} />)}
      </div>
      <SaveBar onSave={() => onSave('experience', list)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ EDUCATION TAB ═══════════════════════ */
function EduItem({ edu, index, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (k, v) => onUpdate(index, { ...edu, [k]: v });

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <span className="ap-project-emoji">{edu.icon || '🎓'}</span>
          <span className="ap-list-title">{edu.degree || 'Untitled Degree'}</span>
          {edu.institution && <span className="ap-list-meta">@ {edu.institution}</span>}
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={e => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="ap-list-body">
          <div className="ap-row">
            <Input label="Institution" value={edu.institution} onChange={v => set('institution', v)} />
            <Input label="Degree"      value={edu.degree}      onChange={v => set('degree', v)} />
          </div>
          <div className="ap-row">
            <Input label="Year / Period" value={edu.year}  onChange={v => set('year', v)}  placeholder="2020 – 2024" />
            <Input label="Grade / GPA"   value={edu.grade} onChange={v => set('grade', v)} placeholder="3.8 GPA" />
          </div>
          <Input label="Icon (emoji)" value={edu.icon} onChange={v => set('icon', v)} placeholder="🎓" />
          <Textarea label="Description" value={edu.description} onChange={v => set('description', v)} rows={3} />
        </div>
      )}
    </div>
  );
}

function EducationTab({ config, onSave, saving }) {
  const [list, setList] = useState([...(config.education || [])]);
  const update = (i, v) => setList(p => p.map((s, idx) => idx === i ? v : s));
  const remove = (i) => setList(p => p.filter((_, idx) => idx !== i));
  const add = () => setList(p => [...p, { institution: '', degree: 'New Degree', year: '', grade: '', description: '', icon: '🎓' }]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} entries</span>
        <button className="ap-add-btn" onClick={add}><Plus size={14} /> Add Education</button>
      </div>
      <div className="ap-list">
        {list.map((e, i) => <EduItem key={i} edu={e} index={i} onUpdate={update} onDelete={remove} />)}
      </div>
      <SaveBar onSave={() => onSave('education', list)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ SERVICES TAB ═══════════════════════ */
function ServiceItem({ svc, index, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const set = (k, v) => onUpdate(index, { ...svc, [k]: v });

  return (
    <div className="ap-list-item">
      <div className="ap-list-header" onClick={() => setOpen(!open)}>
        <div className="ap-list-left">
          <span className="ap-project-emoji">{svc.icon || '⚡'}</span>
          <span className="ap-list-title">{svc.title || 'Untitled Service'}</span>
        </div>
        <div className="ap-list-actions">
          <button className="ap-icon-btn ap-delete" onClick={e => { e.stopPropagation(); onDelete(index); }}>
            <Trash2 size={14} />
          </button>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {open && (
        <div className="ap-list-body">
          <div className="ap-row">
            <Input label="Icon (emoji)" value={svc.icon}  onChange={v => set('icon', v)}  placeholder="🌐" />
            <Input label="Title"        value={svc.title} onChange={v => set('title', v)} />
          </div>
          <Textarea label="Description" value={svc.description} onChange={v => set('description', v)} rows={3} />
        </div>
      )}
    </div>
  );
}

function ServicesTab({ config, onSave, saving }) {
  const [list, setList] = useState([...(config.services || [])]);
  const update = (i, v) => setList(p => p.map((s, idx) => idx === i ? v : s));
  const remove = (i) => setList(p => p.filter((_, idx) => idx !== i));
  const add = () => setList(p => [...p, { icon: '⚡', title: 'New Service', description: '' }]);

  return (
    <div className="ap-tab-content">
      <div className="ap-list-toolbar">
        <span className="ap-count">{list.length} services</span>
        <button className="ap-add-btn" onClick={add}><Plus size={14} /> Add Service</button>
      </div>
      <div className="ap-list">
        {list.map((s, i) => <ServiceItem key={i} svc={s} index={i} onUpdate={update} onDelete={remove} />)}
      </div>
      <SaveBar onSave={() => onSave('services', list)} loading={saving} />
    </div>
  );
}

/* ═══════════════════════ SEO & THEME TAB ═══════════════════════ */
function SeoThemeTab({ config, onSave, saving }) {
  const [seo,   setSeo]   = useState({ ...config.seo });
  const [theme, setTheme] = useState({ ...config.theme });
  const setS = (k, v) => setSeo(s   => ({ ...s, [k]: v }));
  const setT = (k, v) => setTheme(t => ({ ...t, [k]: v }));

  return (
    <div className="ap-tab-content">
      <div className="ap-section-title">SEO Settings</div>
      <Input label="Site Title"        value={seo.siteTitle}   onChange={v => setS('siteTitle', v)} placeholder="Your Name | Developer" />
      <Textarea label="Meta Description" value={seo.description} onChange={v => setS('description', v)} rows={3} />
      <Textarea label="Keywords (comma separated)" value={seo.keywords} onChange={v => setS('keywords', v)} rows={2} />
      <Input label="OG Image URL (social preview)" value={seo.ogImage} onChange={v => setS('ogImage', v)} placeholder="https://example.com/og.jpg" />

      <div className="ap-section-title" style={{marginTop:'2rem'}}>Theme Colors</div>
      <div className="ap-color-row">
        {[
          { key:'primaryColor',   label:'Primary' },
          { key:'secondaryColor', label:'Secondary' },
          { key:'accentColor',    label:'Accent' },
          { key:'darkBg',         label:'Background' },
          { key:'darkerBg',       label:'Dark BG' },
        ].map(({ key, label }) => (
          <div key={key} className="ap-color-item">
            <label className="ap-label">{label}</label>
            <div className="ap-color-preview-wrap">
              <div className="ap-color-preview" style={{ background: theme[key] }}></div>
              <input type="color" value={theme[key] || '#000000'}
                onChange={e => setT(key, e.target.value)} className="ap-color-picker-lg" />
            </div>
            <input type="text" className="ap-input ap-color-text" value={theme[key] || ''}
              onChange={e => setT(key, e.target.value)} placeholder="#6366f1" />
          </div>
        ))}
      </div>

      <SaveBar
        onSave={async () => { await onSave('seo', seo); await onSave('theme', theme); }}
        loading={saving}
        label="Save SEO & Theme"
      />
    </div>
  );
}

/* ═══════════════════════ MAIN ADMIN DASHBOARD ═══════════════════════ */
function AdminDashboard({ config, saveSection, onClose, onLogout }) {
  const [activeTab, setActiveTab]   = useState('hero');
  const [saving, setSaving]         = useState(false);
  const [toast, setToast]           = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async (section, data) => {
    setSaving(true);
    try {
      await saveSection(section, data);
      showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} saved! ✅`);
    } catch (err) {
      showToast(err.message || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label || '';

  const tabProps = { config, onSave: handleSave, saving };

  return (
    <div className="admin-page-overlay" onClick={onClose}>
      <div className="admin-dashboard" onClick={e => e.stopPropagation()}>

        {/* ─── Top bar ─── */}
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <button className="admin-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={20} />
            </button>
            <div className="admin-logo">
              <Edit3 size={20} />
              <span>Admin Panel</span>
            </div>
            <span className="admin-breadcrumb">/ {activeTabLabel}</span>
          </div>
          <div className="admin-topbar-right">
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-view-site-btn">
              View Site
            </a>
            <button className="admin-logout-btn" onClick={onLogout}>
              <LogOut size={16} /> Logout
            </button>
            <button className="admin-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="admin-body-layout">
          {/* ─── Sidebar ─── */}
          <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <nav className="admin-nav">
              {TABS.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    id={`admin-tab-${tab.id}`}
                    className={`admin-nav-item ${activeTab === tab.id ? 'nav-active' : ''}`}
                    onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ─── Main content ─── */}
          <main className="admin-main">
            <div className="admin-panel-content">
              {activeTab === 'hero'         && <HeroTab         {...tabProps} />}
              {activeTab === 'about'        && <AboutTab        {...tabProps} />}
              {activeTab === 'contact'      && <ContactTab      {...tabProps} />}
              {activeTab === 'skills'       && <SkillsTab       {...tabProps} />}
              {activeTab === 'projects'     && <ProjectsTab     {...tabProps} />}
              {activeTab === 'certificates' && <CertificatesTab {...tabProps} />}
              {activeTab === 'experience'   && <ExperienceTab   {...tabProps} />}
              {activeTab === 'education'    && <EducationTab    {...tabProps} />}
              {activeTab === 'services'     && <ServicesTab     {...tabProps} />}
              {activeTab === 'seo'          && <SeoThemeTab     {...tabProps} />}
            </div>
          </main>
        </div>

        {/* ─── Toast ─── */}
        {toast && (
          <div className={`ap-toast ap-toast-${toast.type}`}>
            {toast.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </div>
        )}

        {/* ─── Mobile sidebar overlay ─── */}
        {sidebarOpen && (
          <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
