import React from 'react';

function Skills({ config }) {
  const { skills } = config;

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">What I do best</span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="skills-category">
            <h3 className="category-label">{cat}</h3>
            <div className="skills-grid">
              {skills
                .filter((s) => s.category === cat)
                .map((skill, index) => (
                  <div
                    key={index}
                    className="skill-card card-3d"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className="card-glow"
                      style={{ background: skill.color }}
                    ></div>

                    {/* Color dot */}
                    <div
                      className="skill-dot"
                      style={{ background: skill.color }}
                    ></div>

                    <h3 className="skill-name">{skill.name}</h3>

                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                        }}
                      >
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
