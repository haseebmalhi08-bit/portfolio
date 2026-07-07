import React, { useState } from 'react';
import { Mail, Phone, Globe, Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Send, CheckCircle } from 'lucide-react';

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

function Contact({ config }) {
  const { contact, social, personal } = config;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const activeSocials = Object.entries(social).filter(([, href]) => href);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Let's work together</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card card-3d">
              <div className="card-glow"></div>
              <Mail className="info-icon" size={32} />
              <h3>Email</h3>
              <a href={`mailto:${contact.email}`} className="info-link">
                {contact.email}
              </a>
            </div>

            {contact.phone && (
              <div className="info-card card-3d">
                <div className="card-glow"></div>
                <Phone className="info-icon" size={32} />
                <h3>Phone</h3>
                <a href={`tel:${contact.phone}`} className="info-link">
                  {contact.phone}
                </a>
              </div>
            )}

            {contact.website && (
              <div className="info-card card-3d">
                <div className="card-glow"></div>
                <Globe className="info-icon" size={32} />
                <h3>Website</h3>
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="info-link">
                  {contact.website.replace('https://', '')}
                </a>
              </div>
            )}

            {/* Social Links in contact */}
            <div className="contact-socials card-3d">
              <div className="card-glow"></div>
              <h3>Follow Me</h3>
              <div className="contact-social-links">
                {activeSocials.map(([platform, href]) => {
                  const Icon = SOCIAL_ICONS[platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={platform}
                      id={`contact-social-${platform}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-icon"
                      title={platform}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form card-3d">
            <div className="card-glow"></div>
            {submitted ? (
              <div className="form-success">
                <CheckCircle size={48} />
                <h3>Message Sent!</h3>
                <p>Your email client has been opened. Thank you for reaching out!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="input-3d"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="input-3d"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="input-3d"
                    rows="6"
                    placeholder="Your message..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button id="contact-submit" type="submit" className="btn-3d btn-primary btn-full">
                  <span className="btn-content">
                    <Send size={20} />
                    Send Message
                  </span>
                  <span className="btn-shine"></span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
