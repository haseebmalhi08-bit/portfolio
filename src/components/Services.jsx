import React from 'react';

function Services({ config }) {
  const { services } = config;

  return (
    <section id="services" className="services-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">What I offer</span>
          <h2 className="section-title">My Services</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              id={`service-${index}`}
              className="service-card card-3d"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-glow"></div>
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
