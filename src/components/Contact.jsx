import React, { useState } from 'react';
import { Mail, Phone, Globe, MapPin, Github, Linkedin, Twitter, Instagram, Youtube, Facebook, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, twitter: Twitter, instagram: Instagram, youtube: Youtube, facebook: Facebook };

function Contact({ config, sendContactForm }) {
  const { contact, social } = config;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus]       = useState('idle');
  const [errorMsg, setErrorMsg]   = useState('');
  const activeSocials = Object.entries(social).filter(([, href]) => href);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      if (typeof sendContactForm === 'function') {
        await sendContactForm(formState);
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`);
        const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
        window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Let's work together</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <div className="contact-content">
          {/* Info Cards */}
          <div className="contact-info">
            <div className="info-card">
              <Mail className="info-icon" size={22} />
              <h3>Email</h3>
              <a href={`mailto:${contact.email}`} className="info-link">{contact.email}</a>
            </div>

            {contact.phone && (
              <div className="info-card">
                <Phone className="info-icon" size={22} />
                <h3>Phone</h3>
                <a href={`tel:${contact.phone}`} className="info-link">{contact.phone}</a>
              </div>
            )}

            {contact.address && (
              <div className="info-card">
                <MapPin className="info-icon" size={22} />
                <h3>Location</h3>
                <p className="info-link">{contact.address}</p>
              </div>
            )}

            {contact.website && (
              <div className="info-card">
                <Globe className="info-icon" size={22} />
                <h3>Website</h3>
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="info-link">
                  {contact.website.replace('https://', '')}
                </a>
              </div>
            )}

            {activeSocials.length > 0 && (
              <div className="contact-socials">
                <h3>Social Media</h3>
                <div className="contact-social-links">
                  {activeSocials.map(([platform, href]) => {
                    const Icon = SOCIAL_ICONS[platform];
                    if (!Icon) return null;
                    return (
                      <a key={platform} id={`contact-social-${platform}`} href={href}
                        target="_blank" rel="noopener noreferrer"
                        className="contact-social-icon" title={platform}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="contact-form">
            {status === 'success' ? (
              <div className="form-success">
                <div className="form-success-icon"><CheckCircle size={48} /></div>
                <h3>Message Sent! 🎉</h3>
                <p>Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="form-heading">Send a Message</h3>

                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input id="contact-name" type="text" className="input-3d" placeholder="John Doe"
                    value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required disabled={status === 'sending'} />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input id="contact-email" type="email" className="input-3d" placeholder="your@email.com"
                    value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required disabled={status === 'sending'} />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" className="input-3d" rows="6" placeholder="Tell me about your project..."
                    value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required disabled={status === 'sending'} />
                </div>

                {status === 'error' && (
                  <div className="form-error-msg">
                    <AlertCircle size={15} /> {errorMsg}
                  </div>
                )}

                <button id="contact-submit" type="submit" className="btn-3d btn-primary btn-full" disabled={status === 'sending'}>
                  <span className="btn-content">
                    {status === 'sending'
                      ? <><Loader size={18} className="spin-icon" /> Sending...</>
                      : <><Send size={18} /> Send Message</>
                    }
                  </span>
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
