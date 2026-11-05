import React from 'react';

function Services({ config }) {
  const { services } = config;
  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="services-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">What I offer</span>
          <h2 className="section-title">My Services</h2>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} id={`service-${index}`} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
