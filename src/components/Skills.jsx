import React from 'react';

function Skills({ config }) {
  const { skills } = config;
  if (!skills || skills.length === 0) return null;

  const categories = [...new Set(skills.map((s) => s.category).filter(Boolean))];
  const uncategorized = skills.filter((s) => !s.category);

  const renderSkills = (list) => (
    <div className="skills-grid">
      {list.map((skill, index) => (
        <div key={index} className="skill-card" style={{ animationDelay: `${index * 0.07}s` }}>
          <div className="skill-dot" style={{ background: skill.color || 'var(--primary)' }}></div>
          <div className="skill-name">{skill.name}</div>
          <div className="skill-bar">
            <div
              className="skill-progress"
              style={{
                width: `${skill.level || 80}%`,
                background: `linear-gradient(90deg, ${skill.color || 'var(--primary)'}99, ${skill.color || 'var(--primary)'})`,
              }}
            />
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.3rem', textAlign: 'right' }}>
            {skill.level || 80}%
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">What I know</span>
          <h2 className="section-title">Skills & Expertise</h2>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="skills-category">
            <h3 className="category-label">{cat}</h3>
            {renderSkills(skills.filter((s) => s.category === cat))}
          </div>
        ))}

        {uncategorized.length > 0 && (
          <div className="skills-category">
            {categories.length > 0 && <h3 className="category-label">Other</h3>}
            {renderSkills(uncategorized)}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;
