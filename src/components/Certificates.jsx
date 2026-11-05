import React from 'react';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

function Certificates({ config }) {
  const certificates = config?.certificates || [];

  if (!certificates.length) return null;

  return (
    <section id="certificates" className="certificates-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">My achievements</span>
          <h2 className="section-title">Certificates & Awards</h2>
        </div>

        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <div
              key={index}
              id={`certificate-${index}`}
              className="cert-card card-3d"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-glow"></div>

              {/* Certificate image or icon */}
              <div className="cert-image">
                {cert.imageUrl ? (
                  <img src={cert.imageUrl} alt={cert.title} className="cert-img" />
                ) : (
                  <div className="cert-icon-placeholder">
                    <Award size={48} />
                  </div>
                )}
              </div>

              {/* Certificate info */}
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>

                <div className="cert-meta">
                  {cert.issuer && (
                    <span className="cert-issuer">
                      <Building size={14} />
                      {cert.issuer}
                    </span>
                  )}
                  {cert.date && (
                    <span className="cert-date">
                      <Calendar size={14} />
                      {cert.date}
                    </span>
                  )}
                </div>

                {cert.fileUrl && (
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                    id={`cert-${index}-link`}
                  >
                    <ExternalLink size={14} />
                    View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
